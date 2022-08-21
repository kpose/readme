import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Tts from 'react-native-tts';

interface ISpeachProviderProps {
  children: React.ReactNode;
}

export interface ISpeachContext {
  pauseSpeach: () => void;
  startSpeach: (data: string) => void;
  speachVoices?: ISpeachVoice[];
  currentVoice?: ISpeachVoice;
}

export interface ISpeachVoice {
  id: string;
  language: string;
  name: string;
  quality?: number;
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

    let currentVoice = null;
    if (availableVoices && availableVoices.length > 0) {
      // get english uk
      const englishUK = availableVoices.find(x => x.language === 'en-GB');
      currentVoice = englishUK || availableVoices[0];
      try {
        await Tts.setDefaultLanguage(
          englishUK?.language || availableVoices[0].language,
        );
      } catch (err) {
        // My Samsung S9 has always this error: "Language is not supported"
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(englishUK?.id || availableVoices[0].id);
      setTtsVoices(availableVoices);
      setSelectedVoice(currentVoice);
    } else {
      console.log('error');
    }
  }, []);

  useEffect(() => {
    const onStart = Tts.addEventListener('tts-start', () => {
      return;
    });
    const onFinish = Tts.addEventListener('tts-finish', () => {
      return;
    });
    const onCancel = Tts.addEventListener('tts-cancel', () => {
      return;
    });

    Tts.setDefaultRate(speachRate);
    Tts.setDefaultPitch(speachPitch);
    Tts.getInitStatus().then(() => initTts());

    return () => {
      onStart;
      onCancel;
      onFinish;
    };
  }, [initTts, speachPitch, speachRate]);

  const startSpeach = useCallback(async (data: string) => {
    Tts.stop();
    Tts.speak(data);
  }, []);

  const pauseSpeach = useCallback(() => {
    console.log('kkkkk');
  }, []);

  return (
    <SpeachContext.Provider
      value={{
        startSpeach,
        pauseSpeach,
        speachVoices: ttsvoices,
        currentVoice: selectedVoice,
      }}>
      {children}
    </SpeachContext.Provider>
  );
};

export const useSpeach = () => useContext(SpeachContext);
