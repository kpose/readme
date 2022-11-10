import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Tts from 'react-native-tts';
import {useAppSelector} from '../hooks/ReduxState.hook';
import {RootState} from '../redux/store';

interface ISpeachProviderProps {
  children: React.ReactNode;
}

export interface ISpeachContext {
  pauseSpeach: () => void;
  startSpeach: (data: string) => void;
  speachVoices?: ISpeachVoice[];
  currentVoice?: ISpeachVoice;
  speachLocation?: ISpeachCurrentWordProps;
  isReading?: boolean;
  isFinishedReading?: boolean;
  isPaused?: boolean;
  selectVoice: (voiceId: string) => void;
}

export interface ISpeachVoice {
  id: string;
  language: string;
  name: string;
  quality?: number;
}

export interface ISpeachCurrentWordProps {
  location: number;
  length: number;
  utteranceId: number;
}

const SpeachContext = createContext<ISpeachContext>({
  pauseSpeach: () => '',
  startSpeach: () => '',
  selectVoice: () => {},
});

export const SpeachProvider: FC<ISpeachProviderProps> = ({children}) => {
  const [ttsvoices, setTtsVoices] = useState<ISpeachVoice[]>();
  const [selectedVoice, setSelectedVoice] = useState<ISpeachVoice>();
  const [isReading, setIsReading] = useState(false);
  const [isFinishedReading, setIsFinishedReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speachRate, setSpeachRate] = useState<number>(0.5);
  const [speachPitch, setSpeachPitch] = useState<number>(1);
  const [currentWord, setcurrentWord] = useState<ISpeachCurrentWordProps>();
  const speakerInfo = useAppSelector((state: RootState) => state.speakerInfo);

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
      currentVoice = speakerInfo.voice || englishUK || availableVoices[0];
      try {
        await Tts.setDefaultLanguage(
          englishUK?.language || availableVoices[0].language,
        );
      } catch (err) {
        // My Samsung S9 has always this error: "Language is not supported"
        // console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(
        speakerInfo.voice?.id || englishUK?.id || availableVoices[0].id,
      );
      setTtsVoices(availableVoices);
      setSelectedVoice(currentVoice);
    } else {
      console.log('error');
    }
  }, [speakerInfo]);

  useEffect(() => {
    const onStart = Tts.addEventListener('tts-start', () => {
      setIsReading(true);
      setIsFinishedReading(false);
    });
    const onFinish = Tts.addEventListener('tts-finish', () => {
      setIsReading(false);
      setIsFinishedReading(true);
    });
    const onCancel = Tts.addEventListener('tts-cancel', () => {
      setIsReading(false);
      setIsFinishedReading(true);
    });

    const onProgress = Tts.addEventListener('tts-progress', value => {
      setcurrentWord(value);
      setIsFinishedReading(false);
    });

    Tts.setDefaultRate(speachRate);
    Tts.setDefaultPitch(speachPitch);
    Tts.getInitStatus().then(() => initTts());

    return () => {
      onStart;
      onCancel;
      onFinish;
      onProgress;
    };
  }, [initTts, speachPitch, speachRate]);

  const startSpeach = useCallback(
    async (data: string) => {
      if (isReading) {
        Tts.stop();
        setIsPaused(true);
      }
      Tts.setDucking(true).then(() => {
        Tts.speak(data);
      });
    },
    [isReading],
  );

  const pauseSpeach = useCallback(async () => {
    if (isReading) {
      Tts.stop();
      setIsReading(false);
      setIsPaused(true);
    }
    Tts.stop();
  }, [isReading]);

  const selectVoice = useCallback(
    (voiceId: string) => {
      if (isReading) {
        Tts.stop();
        setIsReading(false);
        setIsPaused(true);
      }
      Tts.setDefaultVoice(voiceId);
    },
    [isReading],
  );

  return (
    <SpeachContext.Provider
      value={{
        startSpeach,
        pauseSpeach,
        selectVoice,
        speachVoices: ttsvoices,
        currentVoice: selectedVoice,
        speachLocation: currentWord,
        isReading: isReading,
        isFinishedReading: isFinishedReading,
        isPaused: isPaused,
      }}>
      {children}
    </SpeachContext.Provider>
  );
};

export const useSpeach = () => useContext(SpeachContext);
