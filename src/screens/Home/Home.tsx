import {View, FlatList, StyleSheet, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Screen from '../../components/Screen/Screen';
import Text from '../../components/Text/Text';
import FAB from '../../components/FAB/FAB';
import {FolderIcon} from '../../components/Icon/Icon';
import useCloudStorage from '../../hooks/CloudStorage.hook';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import {RNPdftron} from 'react-native-pdftron';
import {requestFilePermission} from '../../utils/Permissions.util';
import {selectPdf} from '../../utils/FilePicker.util';
import {useUser} from '../../providers/UserProvider';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

const Home = () => {
  const {getAllDocs} = useCloudStorage();
  const [userDocs, setUserDocs] = useState([]);
  const [jjj, setFileLocation] = useState('');
  const {/* percent */ uploadFile} = useCloudStorage();
  const {user} = useUser();

  const getAll = useCallback(async () => {
    const email = user?.email;
    if (!email) {
      return;
    }
    const data = await getAllDocs(email);
    setUserDocs(data);
  }, [getAllDocs, user?.email]);

  useEffect(() => {
    RNPdftron.initialize('');
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAndWritePdf = useCallback(async (fullPath: any, name: string) => {
    const url = await storage()
      .ref(fullPath)
      .getDownloadURL()
      .catch(e => {
        console.error(e);
      });
    // create a local file path from url
    const localFile = `${RNFS.DocumentDirectoryPath}/${name}`;
    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    // download with fileviewer.
    RNFS.downloadFile(options)
      .promise.then(() => setFileLocation(localFile))
      .then(() => {
        // success
      })
      .catch(error => {
        console.log(error);
        // error
      });
  }, []);

  const ItemSeparatorView = () => {
    return <View style={styles.inputContainer} />;
  };

  const ItemView = ({item}) => {
    return (
      <View style={styles.itemView}>
        <Text onPress={() => getAndWritePdf(item.fullPath, item.name)}>
          File Name: {item.name}
          {'\n'}
          File Full Path: {item.fullPath}
          {'\n'}
          Bucket: {item.bucket}
        </Text>
      </View>
    );
  };

  const handleFileSelected = useCallback(
    async (selectedFile: DocumentPickerResponse) => {
      if (!selectedFile || !user?.email) {
        return;
      }
      await uploadFile(selectedFile, user.email);
    },
    [uploadFile, user],
  );

  const onImportPress = useCallback(async () => {
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
  }, [handleFileSelected]);

  return (
    <Screen>
      <Text>Home</Text>
      <FolderIcon size={15} />
      {userDocs.length ? (
        <FlatList
          data={userDocs}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : null}
      <FAB onImportPress={onImportPress} />

      {/* {jjj && <DocumentView document={jjj} showLeadingNavButton={true} />} */}
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  inputContainer: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  itemView: {
    padding: 10,
  },
});
