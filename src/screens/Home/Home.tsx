import React, {useCallback, useState} from 'react';
import Screen from '../../components/Screen/Screen';
import Text from '../../components/Text/Text';
import FAB from '../../components/FAB/FAB';
import {FolderIcon} from '../../components/Icon/Icon';
import UploadedDocs from '../../components/UploadedDocs/UploadedDocs';
import {useFileUpload} from '../../providers/FileUploadProvider';

const Home = () => {
  const [loading, setisLoading] = useState(false);
  const {uploadPDF, isUploadingFile, getAllUploadedPDFs, savePdfToStorage} =
    useFileUpload();

  const onImportPress = useCallback(async () => {
    if (uploadPDF && getAllUploadedPDFs && savePdfToStorage) {
      setisLoading(true);
      await uploadPDF()
        .then(async () => {
          await getAllUploadedPDFs().then(async files => {
            await savePdfToStorage(files).then(() => setisLoading(false));
          });
        })
        .catch(x => {
          setisLoading(false);
          console.log(x);
        });
    }
  }, [getAllUploadedPDFs, savePdfToStorage, uploadPDF]);

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
