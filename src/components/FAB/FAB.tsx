import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {appcolors} from '../../utils/colors.util';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import FABpopup from './FABpopup';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {requestFilePermission} from '../../utils/Permissions.util';
import {selectPdf} from '../../utils/FilePicker.util';
// import {usePDFViewer} from '../../providers/PDFViewerProvider';
import useCloudStorage from '../../hooks/CloudStorage.hook';
import {useUser} from '../../providers/UserProvider';
const fabBottomPosition = 20;
const fabRightPosition = 20;

const FAB = () => {
  const springAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(true);
  const {user} = useUser();
  // const {openDocument} = usePDFViewer();
  const {/* percent */ uploadFile} = useCloudStorage();
  const {logoutUser} = useUser();

  const toggleOpen = useCallback(() => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };

    ReactNativeHapticFeedback.trigger('impactLight', options);
    setIsOpen(!isOpen);
  }, [isOpen]);

  // this method is used to upload selected files
  const handleFileSelected = useCallback(
    async (selectedFile: DocumentPickerResponse) => {
      if (!selectedFile || !user) {
        return;
      }
      await uploadFile(selectedFile, user.email);
    },
    [uploadFile, user],
  );

  const onPopUpItemPress = useCallback(
    async (index: number) => {
      setIsOpen(!isOpen);
      if (index === 0) {
        try {
          const filesPermission = await requestFilePermission();
          if (filesPermission === 'granted') {
            const pdfFile = await selectPdf();
            return handleFileSelected(pdfFile);
          }
          if (filesPermission === 'unavailable') {
            throw new Error(
              'Sorry but this feature appears to be unavailable on your device.',
            );
          }
          throw new Error(
            'Please go into settings and grant Flutterwave access to read your files to use this feature.',
          );
        } catch (e: any) {
          // handle error
          if (DocumentPicker.isCancel(e)) {
            return;
          }
          Alert.alert('Error', e.message);
        }
      }
      if (index === 1) {
        if (!logoutUser) {
          return;
        }
        await logoutUser();
      }
    },
    [handleFileSelected, isOpen, logoutUser],
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
    // height: 90,
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
