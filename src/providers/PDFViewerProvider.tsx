import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {DocumentView, RNPdftron} from 'react-native-pdftron';
import {Text} from 'react-native-svg';
import RNFetchBlob from 'react-native-fetch-blob';

interface IPDFViewerContextProps {
  children: React.ReactNode;
}
export interface IPDFViewerProps {
  permissionGranted: boolean;
  openDocument?: (uri: string) => void;
}

const defaultState: IPDFViewerProps = {
  permissionGranted: false,
};

const PDFViewerContext = createContext<IPDFViewerProps>(defaultState);

export const PDFViewerProvider: FC<IPDFViewerContextProps> = ({children}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [documentPath, setDocumentPath] = useState<string>('');

  const checkForPermissions = useCallback(async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (result) {
        setHasPermission(true);
        return;
      }
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Readme would like to access your storage',
            message:
              'This lets you import documents ' + 'you will love to isten to',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      } catch (err) {
        console.warn(err);
      }
    }
    if (Platform.OS === 'ios') {
      setHasPermission(true);
    }
  }, []);

  useEffect(() => {
    // RNPdftron.initialize('');
    // RNPdftron.enableJavaScript(true);
  }, [checkForPermissions]);

  const openDocument = useCallback(
    (uri: string) => {
      checkForPermissions();
      if (!hasPermission) {
        console.log('no permission granted');
        return;
      }
      console.log(uri);
      setDocumentPath(uri);
      setIsVisible(true);
    },
    [checkForPermissions, hasPermission],
  );

  console.log(hasPermission);

  return (
    <PDFViewerContext.Provider
      value={{permissionGranted: hasPermission, openDocument}}>
      {children}
      {isVisible ? <Text>Document shown</Text> : null}
    </PDFViewerContext.Provider>
  );
};

export const usePDFViewer = () => useContext(PDFViewerContext);
