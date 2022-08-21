import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Tts from 'react-native-tts';

interface ISpeachProviderProps {
  children: React.ReactNode;
}

export interface ISpeachContext {
  pauseSpeach: () => void;
  startSpeach: () => void;
  speachVoices?: ISpeachVoice[];
}

export interface ISpeachVoice {
  id: string;
  language: string;
  name: string;
}

const SpeachContext = createContext<ISpeachContext>({
  pauseSpeach: () => '',
  startSpeach: () => '',
});

export const SpeachProvider: FC<ISpeachProviderProps> = ({children}) => {
  const [ttsvoices, setTtsVoices] = useState<ISpeachVoice[]>();
  const [selectedVoice, setSelectedVoice] = useState<ISpeachVoice>();
  const [speachRate, setSpeachRate] = useState<number>(0.5);
  const [speachPitch, setSpeachPitch] = useState<number>(1);

  const initTts = useCallback(async () => {
    const voices = await Tts.voices();

    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
        return {id: v.id, name: v.name, language: v.language};
      });

    console.log(availableVoices);

    let currentVoice = null;
    if (voices && voices.length > 0) {
      currentVoice = voices[0];
      try {
        await Tts.setDefaultLanguage(voices[0].language);
      } catch (err) {
        // My Samsung S9 has always this error: "Language is not supported"
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(voices[0].id);
      setTtsVoices(availableVoices);
      setSelectedVoice(currentVoice);
    } else {
      console.log('else');
    }
  }, []);

  useEffect(() => {
    console.log('kkkk');
    Tts.addEventListener('tts-start', () => {
      console.log('started');
    });
    Tts.addEventListener('tts-finish', () => {
      console.log('finished');
    });
    Tts.addEventListener('tts-cancel', () => {
      console.log('canceled');
    });

    Tts.setDefaultRate(speachRate);
    Tts.setDefaultPitch(speachPitch);
    Tts.getInitStatus().then(() => initTts());

    return () => {
      Tts.removeEventListener('tts-start', () => {
        console.log('started');
      });
    };
  }, [initTts, speachPitch, speachRate]);

  const startSpeach = useCallback(() => {
    console.log('kkkkk');
  }, []);

  const pauseSpeach = useCallback(() => {
    console.log('kkkkk');
  }, []);

  console.log(selectedVoice);

  return (
    <SpeachContext.Provider
      value={{startSpeach, pauseSpeach, speachVoices: ttsvoices}}>
      {children}
    </SpeachContext.Provider>
  );
};
