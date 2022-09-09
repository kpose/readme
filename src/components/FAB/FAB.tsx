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
  // DirectoryPickerResponse,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {requestFilePermission} from '../../utils/Permissions.util';
import {selectPdf} from '../../utils/FilePicker.util';
// import {usePDFViewer} from '../../providers/PDFViewerProvider';
import useCloudStorage from '../../hooks/CloudStorage.hook';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '../Text/Text';
const fabBottomPosition = 20;
const fabRightPosition = 20;

const FAB = () => {
  const springAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  // const [result, setResult] = React.useState<
  //   Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  // >();
  const [isOpen, setIsOpen] = useState(true);
  // const {openDocument} = usePDFViewer();
  const {/* percent */ uploadFile, getAllDocs} = useCloudStorage();

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
      if (!selectedFile) {
        return;
      }
      const ll = await uploadFile(selectedFile, 'testFolder');
      console.log(ll);
    },
    [uploadFile],
  );

  const getAll = useCallback(async () => {
    const hh = await getAllDocs('testFolder');
    console.log(hh);
  }, [getAllDocs]);

  const onPopUpItemPress = useCallback(async () => {
    setIsOpen(!isOpen);
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
    } catch (e) {
      // handle error
      if (DocumentPicker.isCancel(e)) {
        return;
      }
      Alert.alert('Error', e.message);
    }
  }, [handleFileSelected, isOpen]);

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

  // useEffect(() => {
  //   console.log(JSON.stringify(result, null, 2));
  // }, [result]);

  const animatedSpring = {
    transform: [{translateY: springAnim}, {translateX: springAnim}],
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getAll}>
        <Text>Press</Text>
      </TouchableOpacity>
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
