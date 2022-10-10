import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {appcolors} from '../../utils/colors.util';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import FABpopup from './FABpopup';
const fabBottomPosition = 20;
const fabRightPosition = 20;

interface IFABPopupProps {
  onImportPress: () => void;
}

const FAB = ({onImportPress}: IFABPopupProps) => {
  const springAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = useCallback(() => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };

    ReactNativeHapticFeedback.trigger('impactLight', options);
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onPopUpItemPress = useCallback(
    async (index: number) => {
      setIsOpen(!isOpen);
      if (index === 0) {
        return onImportPress();
      }
      // if (index === 1) {
      //   if (!logoutUser) {
      //     return;
      //   }
      //   await logoutUser();
      // }
    },
    [isOpen, onImportPress],
  );

  useEffect(() => {
    const opacityValue = isOpen ? 0 : 1;
    const springValue = isOpen ? 60 : 0;
    const spring = Animated.spring(springAnim, {
      toValue: springValue,
      friction: 7,
      tension: 300,
      useNativeDriver: true,
    });
    const opacity = Animated.timing(opacityAnim, {
      toValue: opacityValue,
      useNativeDriver: true,
      duration: 500,
    });
    Animated.parallel([spring, opacity]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const animatedSpring = {
    transform: [{translateY: springAnim}, {translateX: springAnim}],
  };
  return (
    <View style={styles.container}>
      {/* pop up */}
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.popupContainer,
            {opacity: opacityAnim},
            animatedSpring,
          ]}>
          <FABpopup onPress={onPopUpItemPress} />
        </Animated.View>
      </TouchableWithoutFeedback>
      {/* fab */}
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={[styles.fab]}>
          <Animated.Text style={[styles.label]}>+</Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default FAB;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popupContainer: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: fabBottomPosition * 4,
    right: fabRightPosition * 4,
  },
  label: {
    position: 'absolute',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  fab: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appcolors.primary,
    borderRadius: 30,
    position: 'absolute',
    bottom: fabBottomPosition,
    right: fabRightPosition,
  },
  payText: {
    color: '#FFF',
  },
});
