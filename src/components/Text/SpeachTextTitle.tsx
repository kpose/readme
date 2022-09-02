import React, {FC, useCallback} from 'react';
import {ScreenTitle} from './Text';
import {View} from 'react-native';
import {useSpeach} from '../../providers/SpeachProvider';
import {appcolors} from '../../utils/colors.util';

interface ISpeachTextProps {
  title: string;
}

interface ICurrentWordPosition {
  currentWord: string;
  wordIndex: number;
}

const SpeachTextTitle: FC<ISpeachTextProps> = ({title}) => {
  const {speachLocation, isReading} = useSpeach();
  console.log(isReading);

  const wordPosition = useCallback(() => {
    if (!title) {
      return {currentWord: '', wordIndex: ''};
    }
    if (!speachLocation) {
      return {currentWord: '', wordIndex: ''};
    }
    const startPosition = speachLocation.location;
    const finishPosition = speachLocation.location + speachLocation.length;
    const textArray = title.split(' ');
    const currentWord = title.slice(startPosition, finishPosition);

    const wordIndex = textArray.indexOf(currentWord);

    const word: ICurrentWordPosition = {currentWord, wordIndex};
    return word;
  }, [speachLocation, title]);

  const renderAnimatedText = useCallback(() => {
    if (!title.length) {
      return;
    }
    return (
      <ScreenTitle>
        {title.split(' ').map((t, index) => {
          const position = wordPosition();
          if (
            position.currentWord === t &&
            position.wordIndex === index &&
            isReading
          ) {
            return (
              // eslint-disable-next-line react-native/no-inline-styles
              <ScreenTitle style={{color: appcolors.primary}} key={index}>
                {t}{' '}
              </ScreenTitle>
            );
          }
          return `${t} `;
        })}
      </ScreenTitle>
    );
  }, [isReading, title, wordPosition]);

  return <View>{renderAnimatedText()}</View>;
};

export default SpeachTextTitle;
