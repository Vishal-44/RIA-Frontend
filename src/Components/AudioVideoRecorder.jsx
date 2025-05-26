import React, { useRef, useState, useEffect } from 'react';

const BACKEND_UPLOAD_URL = 'http://127.0.0.1:5000/audio-processing';

const AudioVideoAutoRecorder = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const frameCaptureIntervalRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState('');
  const [audioUrl, setAudioUrl] = useState(null); 
  const [transcriptionResults, setTranscriptionResults] = useState(null); 

  // Setup media stream once on mount
  useEffect(() => {
    const setupStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream;
      } catch (err) {
        console.error('Error accessing media devices.', err);
        alert('Could not access camera and microphone. Please allow permissions.');
      }
    };
    setupStream();

    return () => {
      // Cleanup on unmount
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (frameCaptureIntervalRef.current) {
        clearInterval(frameCaptureIntervalRef.current);
      }
    };
  }, []);

  // Function to send a Blob file (audio or image) to backend
  const sendFileToBackend = async (file, fileName, fileType) => {
    const formData = new FormData();
    formData.append(fileType, file, fileName); // Append the file to FormData

    try {
      const response = await fetch(BACKEND_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });
      const responseData = await response.json(); // Parse the JSON response
      if (!response.ok) {
        throw new Error(`Failed to upload ${fileName}: ${responseData.error}`);
      }
      setStatus(`Uploaded ${fileName} successfully.`);
      setTranscriptionResults(responseData.results); // Set transcription results
    } catch (error) {
      console.error(error);
      setStatus(`Error uploading ${fileName}`);
    }
  };

  const startRecording = () => {
    if (!mediaStreamRef.current) {
      alert('Media stream not ready');
      return;
    }

    // Prepare MediaRecorder for audio only track to record audio
    const audioStream = new MediaStream(mediaStreamRef.current.getAudioTracks());
    const mediaRecorder = new MediaRecorder(audioStream);
    mediaRecorderRef.current = mediaRecorder;

    const audioChunks = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const wavBlob = await convertWebMToWav(audioBlob); // Convert to WAV format
      sendFileToBackend(wavBlob, 'recording.wav', 'audio_file'); // Send as .wav
      const audioUrl = URL.createObjectURL(wavBlob); // Create a URL for the audio Blob
      setAudioUrl(audioUrl); // Set the audio URL state
    };

    mediaRecorder.start();
    setRecording(true);
    setStatus('Recording started');

    // Start interval to capture frame every 30 seconds (30000 ms)
    frameCaptureIntervalRef.current = setInterval(() => {
      captureFrameAndSend();
    }, 30000);

    // Immediately capture one frame at start too
    captureFrameAndSend();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setStatus('Recording stopped');
    }
    if (frameCaptureIntervalRef.current) {
      clearInterval(frameCaptureIntervalRef.current);
      frameCaptureIntervalRef.current = null;
    }
  };

  const captureFrameAndSend = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas size to video size
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          // Generate a timestamped filename
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const fileName = `frame-${timestamp}.png`;
          sendFileToBackend(blob, fileName, 'video_frame');
        }
      },
      'image/png',
      0.95
    );
  };

  const convertWebMToWav = async (webmBlob) => {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const wavBlob = audioBufferToWav(audioBuffer);
        resolve(wavBlob);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(webmBlob);
    });
  };

  const audioBufferToWav = (buffer) => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = numChannels === 1 ? 1 : 2; // 1 for PCM, 2 for stereo
    const byteLength = buffer.length * numChannels * 2 + 44; // 44 bytes for WAV header
    const wavArrayBuffer = new ArrayBuffer(byteLength);
    const wavView = new DataView(wavArrayBuffer);
    const writeString = (str, offset) => {
      for (let i = 0; i < str.length; i++) {
        wavView.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    // Write WAV header
    writeString('RIFF', 0);
    wavView.setUint32(4, byteLength - 8, true);
    writeString('WAVE', 8);
    writeString('fmt ', 12);
    wavView.setUint32(16, 16, true); // Subchunk1Size
    wavView.setUint16(20, format, true);
    wavView.setUint16(22, numChannels, true);
    wavView.setUint32(24, sampleRate, true);
    wavView.setUint32(28, sampleRate * numChannels * 2, true); // ByteRate
    wavView.setUint16(32, numChannels * 2, true); // BlockAlign
    wavView.setUint16(34, 16, true); // BitsPerSample
    writeString('data', 36);
    wavView.setUint32(40, byteLength - 44, true); // Subchunk2Size

    // Write PCM samples
    const channelData = [];
    for (let i = 0; i < numChannels; i++) {
      channelData.push(buffer.getChannelData(i));
    }
    let offset = 44; // Start after the header
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, channelData[channel][i]));
        wavView.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return new Blob([wavArrayBuffer], { type: 'audio/wav' });
  };

  return (
    <div style={{ maxWidth: 700, margin: '1rem auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#222' }}>Audio Recorder + Automatic Video Frame Capture</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: '100%', borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.15)' }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20 }}>
        {!recording ? (
          <button
            onClick={startRecording}
            style={{ padding: '12px 25px', fontSize: 16, borderRadius: 6, border: 'none', backgroundColor: '#008cba', color: '#fff', cursor: 'pointer' }}
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            style={{ padding: '12px 25px', fontSize: 16, borderRadius: 6, border: 'none', backgroundColor: '#e94b3c', color: '#fff', cursor: 'pointer' }}
          >
            Stop Recording
          </button>
        )}
      </div>
      <p style={{ marginTop: 15, textAlign: 'center', color: '#555' }}>{status}</p>

      {/* Audio Player for the recorded audio */}
      {audioUrl && (
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <h3>Recorded Audio:</h3>
          <audio controls src={audioUrl} style={{ width: '100%' }} />
        </div>
      )}

      {/* Display transcription results */}
      {transcriptionResults && (
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <h3>Transcription Results:</h3>
          <pre>{JSON.stringify(transcriptionResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AudioVideoAutoRecorder;
