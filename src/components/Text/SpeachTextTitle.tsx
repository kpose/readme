import React, {FC, useCallback} from 'react';
import {Text} from './Text';
import {View} from 'react-native';
import {useSpeach} from '../../providers/SpeachProvider';
import {appcolors} from '../../utils/colors.util';

interface ISpeachTextProps {
  text: string;
}

interface ICurrentWordPosition {
  currentWord: string;
  wordIndex: number;
}

const SpeachTextTitle: FC<ISpeachTextProps> = ({text}) => {
  const {speachLocation, isReading} = useSpeach();

  const wordPosition = useCallback(() => {
    if (!text) {
      return {currentWord: '', wordIndex: ''};
    }
    if (!speachLocation) {
      return {currentWord: '', wordIndex: ''};
    }
    const startPosition = speachLocation.location;
    const finishPosition = speachLocation.location + speachLocation.length;
    const textArray = text.split(' ');
    const currentWord = text.slice(startPosition, finishPosition);

    const wordIndex = textArray.indexOf(currentWord);

    const word: ICurrentWordPosition = {currentWord, wordIndex};
    return word;
  }, [speachLocation, text]);

  const renderAnimatedText = useCallback(() => {
    if (!text.length) {
      return;
    }
    return (
      <Text>
        {text.split(' ').map((t, index) => {
          const position = wordPosition();
          if (
            position.currentWord === t &&
            position.wordIndex === index &&
            isReading
          ) {
            return (
              // eslint-disable-next-line react-native/no-inline-styles
              <Text style={{color: appcolors.primary}} key={index}>
                {t}{' '}
              </Text>
            );
          }
          return `${t} `;
        })}
      </Text>
    );
  }, [isReading, text, wordPosition]);

  return <View>{renderAnimatedText()}</View>;
};

export default SpeachTextTitle;
