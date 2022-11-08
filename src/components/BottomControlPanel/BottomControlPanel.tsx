import {StyleSheet, useWindowDimensions, View, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {useTheme} from '../../providers/ThemeProvider';
import {appcolors} from '../../utils/colors.util';
import {IBottomControlPanelProps} from './interfaces';
import Text from '../Text/Text';
import {
  RewindIcon,
  FastForwardIcon,
  PlayIcon,
  MicrophoneIcon,
  PauseIcon,
} from '../Icon/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSpeach} from '../../providers/SpeachProvider';

const ICON_SIZE = 24;

const BottomControlPanel = ({
  onBackwardPress,
  onForwardPress,
  onPlayPress,
  onPausePress,
  onSpeakerPress,
  onSpeedPress,
}: IBottomControlPanelProps) => {
  const {isDarkTheme} = useTheme();
  const {isReading} = useSpeach();
  const {width} = useWindowDimensions();
  const pauseAnim = useRef(new Animated.Value(1));
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pauseAnim.current, {
          toValue: 0.8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pauseAnim.current, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        // decrease size
      ]),
    ).start();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkTheme
            ? appcolors.darkGrey
            : appcolors.lightGrey,
        },
      ]}>
      <TouchableOpacity onPress={onSpeakerPress}>
        <MicrophoneIcon
          size={ICON_SIZE}
          color={isDarkTheme ? appcolors.lightGrey : appcolors.darkGrey}
        />
      </TouchableOpacity>

      {/* controls */}
      <View style={[styles.ctrlContainer, {width: width / 2.5}]}>
        <TouchableOpacity
          onPress={onBackwardPress}
          style={styles.playContainer}>
          <RewindIcon
            size={ICON_SIZE}
            color={isDarkTheme ? appcolors.lightGrey : appcolors.darkGrey}
          />
        </TouchableOpacity>
        {isReading ? (
          <TouchableOpacity
            onPress={onPausePress}
            style={[
              styles.playContainer,
              {
                backgroundColor: appcolors.primary,
              },
            ]}>
            <PauseIcon
              size={ICON_SIZE}
              color={isDarkTheme ? appcolors.lightGrey : appcolors.darkGrey}
            />
          </TouchableOpacity>
        ) : (
          <AnimatedTouchable
            onPress={onPlayPress}
            style={[
              styles.playContainer,
              {
                backgroundColor: appcolors.primary,
                transform: [{scale: pauseAnim.current}],
              },
            ]}>
            <Animated.View style={{transform: [{scale: pauseAnim.current}]}}>
              <PlayIcon
                size={ICON_SIZE}
                color={isDarkTheme ? appcolors.lightGrey : appcolors.darkGrey}
              />
            </Animated.View>
          </AnimatedTouchable>
        )}
        <TouchableOpacity onPress={onForwardPress} style={styles.playContainer}>
          <FastForwardIcon
            size={ICON_SIZE}
            color={isDarkTheme ? appcolors.lightGrey : appcolors.darkGrey}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onSpeedPress}>
        <Text weight="bold">1.1X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomControlPanel;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctrlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playContainer: {
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
