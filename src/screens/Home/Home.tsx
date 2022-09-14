import React, {useCallback, useState} from 'react';
import Screen from '../../components/Screen/Screen';
import Text from '../../components/Text/Text';
import FAB from '../../components/FAB/FAB';
import {FolderIcon} from '../../components/Icon/Icon';
import UploadedDocs from '../../components/UploadedDocs/UploadedDocs';
import {useFileUpload} from '../../providers/FileUploadProvider';
import {Alert} from 'react-native';

const Home = () => {
  const [loading, setisLoading] = useState(false);
  const {uploadPDF} = useFileUpload();

  const onImportPress = useCallback(async () => {
    if (uploadPDF) {
      setisLoading(true);
      await uploadPDF()
        .then(x => {
          setisLoading(false);
          console.log(x);
          return;
        })
        .catch(err => {
          setisLoading(false);
          Alert.alert(err);
        });
    }
  }, [uploadPDF]);

  return (
    <Screen>
      <Text>{loading ? 'loading' : 'Home'}</Text>
      <FolderIcon size={15} />

      <UploadedDocs />

      <FAB onImportPress={onImportPress} />
      {/* {jjj && <DocumentView document={jjj} showLeadingNavButton={true} />} */}
    </Screen>
  );
};

export default Home;
