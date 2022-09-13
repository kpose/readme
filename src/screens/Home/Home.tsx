import React, {useCallback} from 'react';
import Screen from '../../components/Screen/Screen';
import Text from '../../components/Text/Text';
import FAB from '../../components/FAB/FAB';
import {FolderIcon} from '../../components/Icon/Icon';
import UploadedDocs from '../../components/UploadedDocs/UploadedDocs';
import {useFileUpload} from '../../providers/FileUploadProvider';

const Home = () => {
  const {uploadPDF, isUploadingFile, getAllUploadedPDFs, savePdfToStorage} =
    useFileUpload();

  const onImportPress = useCallback(async () => {
    if (uploadPDF && getAllUploadedPDFs && savePdfToStorage) {
      await uploadPDF()
        .then(async () => {
          await getAllUploadedPDFs().then(async files => {
            await savePdfToStorage(files).then(x => console.log(x));
          });
        })
        .catch(x => {
          console.log(x);
        });
    }
  }, [getAllUploadedPDFs, savePdfToStorage, uploadPDF]);

  return (
    <Screen>
      <Text>{isUploadingFile ? 'loading' : 'Home'}</Text>
      <FolderIcon size={15} />

      <UploadedDocs />

      <FAB onImportPress={onImportPress} />
      {/* {jjj && <DocumentView document={jjj} showLeadingNavButton={true} />} */}
    </Screen>
  );
};

export default Home;
