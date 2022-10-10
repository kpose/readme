import React, {useCallback} from 'react';
import Screen from '../../components/Screen/Screen';
import FAB from '../../components/FAB/FAB';
import UploadedDocs from '../../components/UploadedDocs/UploadedDocs';
import {useFileUpload} from '../../providers/FileUploadProvider';
import {Alert} from 'react-native';
import {asyncGet, getData} from '../../utils/Async.util';
import {STORE_KEYS} from '../../utils/Keys.util';

const DownloadScreen = () => {
  const {uploadPDF} = useFileUpload();

  const onImportPress = useCallback(async () => {
    const hh = await asyncGet(STORE_KEYS.AUTH_TOKEN);
    console.log(hh);
    // if (uploadPDF) {
    //   await uploadPDF()
    //     .then(x => {
    //       // console.log(x);
    //       return;
    //     })
    //     .catch(err => {
    //       Alert.alert(err);
    //     });
    // }
  }, []);

  return (
    <Screen>
      <UploadedDocs />
      <FAB onImportPress={onImportPress} />
    </Screen>
  );
};

export default DownloadScreen;
