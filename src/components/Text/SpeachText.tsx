import React, {FC, useCallback, useEffect} from 'react';
import Text from './Text';
import {StyleSheet, TextProps, View} from 'react-native';
import {useSpeach} from '../../providers/SpeachProvider';
import {appcolors} from '../../utils/colors.util';

interface ISpeachTextProps extends TextProps {
  text: string;
  active: boolean;
}

interface ICurrentWordPosition {
  currentWord: string;
  wordIndex: number;
}

const SpeachText: FC<ISpeachTextProps> = ({text, active, ...props}) => {
  const {speachLocation, isReading} = useSpeach();

  const wordPosition = useCallback(() => {
    if (!text || !speachLocation) {
      return {currentWord: '', wordIndex: ''};
    }
    let startPosition = speachLocation.location;
    let finishPosition = speachLocation.location + speachLocation.length;
    let textArray = text.split(' ');
    let currentWord = text.slice(startPosition, finishPosition);
    let wordIndex = textArray.indexOf(currentWord);

    let word: ICurrentWordPosition = {currentWord, wordIndex};
    return word;
  }, [speachLocation, text]);

  useEffect(() => {
    if (!speachLocation) {
      return;
    }
    wordPosition();
  }, [speachLocation, wordPosition]);

  const renderAnimatedText = useCallback(() => {
    if (!text.length || !active) {
      return;
    }
    return (
      <Text {...props}>
        {text.split(' ').map((t, index) => {
          const position = wordPosition();
          // console.log(position);
          if (
            position.currentWord === t &&
            position.wordIndex === index &&
            isReading
          ) {
            return (
              <Text
                {...props}
                style={[styles.textContent, {color: appcolors.primary}]}
                key={index}>
                {t}{' '}
              </Text>
            );
          }
          return (
            <Text {...props} style={styles.textContent} key={index}>
              {`${t} `}
            </Text>
          );
          // return `${t} `;
        })}
      </Text>
    );
  }, [text, active, props, wordPosition, isReading]);

  return <View>{renderAnimatedText()}</View>;
};

export default SpeachText;

const styles = StyleSheet.create({
  textContent: {
    flex: 1,
    lineHeight: 30,
  },
});
