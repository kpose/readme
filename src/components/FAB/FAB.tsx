import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {appcolors} from '../../utils/colors.util';
const fabBottomPosition = 20;
const fabRightPosition = 20;

const FAB = () => {
  const springAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(true);
  const {width} = useWindowDimensions();

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const opacityValue = isOpen ? 0 : 0.7;
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
      duration: 1000,
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
          // eslint-disable-next-line react-native/no-inline-styles
          style={[
            styles.popupContainer,
            {width: width / 2, opacity: opacityAnim},
            animatedSpring,
          ]}>
          <Animated.Text style={[styles.label]}>Order</Animated.Text>
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
    height: 90,
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
    // shadowColor: '#333',
    // shadowOpacity: 0.1,
    // shadowOffset: {x: 2, y: 0},
    // shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: fabBottomPosition,
    right: fabRightPosition,
  },
  payText: {
    color: '#FFF',
  },
});
