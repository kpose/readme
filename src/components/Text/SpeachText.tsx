import React, {FC, useCallback} from 'react';
import Text from './Text';
import {StyleSheet, TextProps, TextStyle, View} from 'react-native';
import {useSpeach} from '../../providers/SpeachProvider';
import {appcolors} from '../../utils/colors.util';

interface ISpeachTextProps {
  text: string;
  // style: TextStyle;
}

interface ICurrentWordPosition {
  currentWord: string;
  wordIndex: number;
}

const SpeachText: FC<ISpeachTextProps> = ({text}) => {
  const {speachLocation} = useSpeach();

  const wordPosition = useCallback(() => {
    if (!text || !speachLocation) {
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
          // console.log(position);
          if (position.currentWord === t && position.wordIndex === index) {
            return (
              // eslint-disable-next-line react-native/no-inline-styles
              <Text
                style={[styles.textContent, {color: appcolors.primary}]}
                key={index}>
                {t}{' '}
              </Text>
            );
          }
          return (
            // eslint-disable-next-line react-native/no-inline-styles
            <Text style={styles.textContent} key={index}>
              {`${t} `}
            </Text>
          );
          // return `${t} `;
        })}
      </Text>
    );
  }, [wordPosition, text]);

  return <View>{renderAnimatedText()}</View>;
};

export default SpeachText;

const styles = StyleSheet.create({
  textContent: {
    flex: 1,
    lineHeight: 30,
  },
});
