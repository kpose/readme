import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {appcolors} from '../../utils/colors.util';
import {useTheme} from '../../providers/ThemeProvider';

interface IBottomSheetProps {
  isVisible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({isVisible, onDismiss, children}: IBottomSheetProps) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const {isDarkTheme} = useTheme();

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const handleDismiss = () => closeAnim.start(onDismiss);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, {dy: panY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 0 && gs.vy > 2) {
          return handleDismiss();
        }
        return resetPositionAnim.start();
      },
    }),
  ).current;

  useEffect(() => {
    resetPositionAnim.start();
  }, [resetPositionAnim]);

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleDismiss}
      transparent>
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={styles.overlay}>
          <Animated.View
            style={{
              ...styles.container,
              backgroundColor: isDarkTheme
                ? appcolors.darkBackground
                : appcolors.lightBackground,
              transform: [{translateY: translateY}],
            }}
            {...panResponders.panHandlers}>
            <View style={styles.sliderIndicatorRow}>
              <View style={styles.sliderIndicator} />
            </View>
            {children}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    minHeight: 300,
  },
  sliderIndicatorRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderIndicator: {
    backgroundColor: '#CECECE',
    height: 4,
    width: 45,
  },
});
