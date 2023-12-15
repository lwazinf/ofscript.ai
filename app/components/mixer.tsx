import { useState, useEffect } from 'react';
interface AudioMixerProps {
  src: any
}

const AudioMixer = ({src}:AudioMixerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
        // @ts-ignore
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // @ts-ignore
    let source;

    // Function to load an MP3 file
        // @ts-ignore
    async function loadMP3(file) {
      const response = await fetch(file);
      const arrayBuffer = await response.arrayBuffer();
      return audioContext.decodeAudioData(arrayBuffer);
    }

    // Function to mix two audio buffers with a specified volume for the second audio
        // @ts-ignore
    function mixBuffersWithVolume(buffer1, buffer2, volume) {
      const length = Math.max(buffer1.length, buffer2.length);
      const mixedBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
      const data1 = buffer1.getChannelData(0);
      const data2 = buffer2.getChannelData(0);
      const mixedData = mixedBuffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        mixedData[i] = (data1[i] || 0) + (data2[i] || 0) * volume;
      }

      return mixedBuffer;
    }

    // Function to play a mixed audio buffer
        // @ts-ignore
    function playMixedAudio(buffer) {
      source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
      source.onended = () => setIsPlaying(false);
    }

    // Load the first MP3 file
    loadMP3(src).then(buffer1 => {
      // Load the second MP3 file
      loadMP3('/audio/bg.mp3').then(buffer2 => {
        // Adjust the volume of audio2.mp3 (e.g., 0.5 for half volume)
        const adjustedVolume = 0.1;

        // Mix the two audio buffers with the adjusted volume
        const mixedBuffer = mixBuffersWithVolume(buffer1, buffer2, adjustedVolume);

        // Handle play button click
        const playButton = document.getElementById('playButton');
        // @ts-ignore
        playButton.addEventListener('click', () => {
          if (!isPlaying) {
            playMixedAudio(mixedBuffer);
            setIsPlaying(true);
          } else {
            // Stop the playback if the button is clicked again
        // @ts-ignore
            source.stop();
            setIsPlaying(false);
          }
        });
      });
    });

    // Clean up the audio context on component unmount
    return () => {
      if (audioContext.state === 'running') {
        audioContext.suspend();
      }
    };
  }, [isPlaying]);

  return (
    <div>
      <h1>Audio Mixer Component</h1>
      <button id="playButton">{isPlaying ? 'Stop' : 'Play'}</button>
    </div>
  );
};

export default AudioMixer;
