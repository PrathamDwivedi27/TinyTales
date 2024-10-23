import React, { useEffect, useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

const StoryPages = ({ storyChapter, onSpeechEnd }: any) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Set default voice to a soothing option
      const defaultVoice = availableVoices.find((voice) =>
        ["Google US English", "Microsoft Zira", "Samantha"].includes(voice.name)
      );

      if (defaultVoice) {
        setSelectedVoice(defaultVoice);
      }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const playSpeech = (title: string, text: string) => {
    const synth = window.speechSynthesis;

    if (isSpeaking) {
      // Stop speech if it's currently speaking
      synth.cancel();
      setIsSpeaking(false);
    } else {
      // Start speaking
      const textToSpeech = new SpeechSynthesisUtterance(`${title}. ${text}`);
      if (selectedVoice) {
        textToSpeech.voice = selectedVoice;
      }
      textToSpeech.onend = () => {
        setIsSpeaking(false);
      };
      synth.speak(textToSpeech);
      setIsSpeaking(true);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary flex justify-between">
        {storyChapter?.chapter_title}
        <span
          className="text-3xl cursor-pointer"
          onClick={() => playSpeech(storyChapter?.chapter_title, storyChapter?.description)}
        >
          {isSpeaking ? <FaPauseCircle /> : <FaPlayCircle />}
        </span>
      </h2>
      <p className="text-xl p-10 mt-3 rounded-lg bg-slate-100">
        {storyChapter?.description}
      </p>
    </div>
  );
};

export default StoryPages;
