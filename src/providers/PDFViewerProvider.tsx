import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {View} from 'react-native';
import {DocumentView, RNPdftron} from 'react-native-pdftron';
import Text from '../components/Text/Text';
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

  useEffect(() => {
    RNPdftron.initialize('');
  }, []);

  const openDocument = useCallback(async (uri: string) => {
    setDocumentPath(uri);
    setIsVisible(true);
  }, []);

  return (
    <PDFViewerContext.Provider
      value={{permissionGranted: hasPermission, openDocument}}>
      {children}
      {isVisible && documentPath ? (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'red',
          }}>
          <DocumentView document={documentPath} showLeadingNavButton={true} />
        </View>
      ) : null}
    </PDFViewerContext.Provider>
  );
};

export const usePDFViewer = () => useContext(PDFViewerContext);
