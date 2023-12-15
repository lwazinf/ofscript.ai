import { useRef, useState, useEffect } from "react";
import AudioMixer from "./mixer";

interface Generate_Props {
    
}
 
const Generate_ = ({}:Generate_Props) => {
    const voiceRef = useRef();
  const textRef = useRef();

  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);

  // handler functions
  const handleGenerateTTS = async () => {
    // @ts-ignore
    const selectedVoice = voiceRef.current.value;
    const text = "Once upon a lily pad in the heart of Froggington Forest, there lived a mischievous little frog named Pepe. Pepe wasn't your ordinary frog; he had a knack for clever tricks and cunning schemes. One sunny day, Pepe hatched a plan to scam three unsuspecting forest friends. His first target was Benny the Bunny, a fluffy and curious rabbit with big, floppy ears.";

    setLoading(true);
    try {
      if (!text || text.trim() === "") {
        alert("Enter some text");
        return;
      }

      const response = await fetch("/api/elevenlabs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          voice: selectedVoice,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const { file } = await response.json();

      setAudio(file);
    } catch (error) {
        // @ts-ignore
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getVoices() {
      try {
        const response = await fetch("https://api.elevenlabs.io/v1/voices");

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();

        setVoices(data.voices);
      } catch (error) {
        // @ts-ignore
        console.log(error.message);
      }
    }

    getVoices();
  }, []);
    return ( 
<main>
          <div className="flex gap-4 items-center">
            <label>Select a Voice:</label>
            {/* @ts-ignore */}
            <select ref={voiceRef} className="bg-blue-100 py-2 px-4 rounded-lg">
              {voices.map((voice) => (
        // @ts-ignore
                <option key={voice.voice_id} value={voice.voice_id}>
        {/* @ts-ignore */}
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
      <button
            disabled={loading}
            onClick={handleGenerateTTS}
            className="py-2 px-4 bg-blue-800 text-white rounded-lg hover:opacity-80"
          >
            {loading ? "Generating, please wait" : "Generate TTS"}
          </button>

          {audio && <AudioMixer src={`audio/${audio}`}/>}
      
    </main>
     );
}
 
export default Generate_;