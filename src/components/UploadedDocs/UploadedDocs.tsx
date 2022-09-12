import {View, FlatList, StyleSheet, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Text from '../Text/Text';
import {RNPdftron} from 'react-native-pdftron';
import {useUser} from '../../providers/UserProvider';
import useCloudStorage from '../../hooks/CloudStorage.hook';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

const UploadedDocs = () => {
  const [userDocs, setUserDocs] = useState<
    FirebaseStorageTypes.Reference[] | null
  >();
  const {user} = useUser();
  const {getAllDocs} = useCloudStorage();
  const [, /* jjj */ setFileLocation] = useState('');

  useEffect(() => {
    RNPdftron.initialize('');
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAll = useCallback(async () => {
    const email = user?.email;
    if (!email) {
      return;
    }
    const data = await getAllDocs(email);
    setUserDocs(data);
  }, [getAllDocs, user?.email]);

  const ItemSeparatorView = () => {
    return <View style={styles.inputContainer} />;
  };

  const getAndWritePdf = useCallback(async (fullPath: any, name: string) => {
    const url = await storage()
      .ref(fullPath)
      .getDownloadURL()
      .catch(e => {
        console.error(e);
      });
    if (!url) {
      return Alert.alert('Error', 'something went wrong');
    }
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

  if (!userDocs) {
    return (
      <View>
        <Text>Loading books</Text>
      </View>
    );
  }

  return (
    <View>
      {userDocs.length ? (
        <FlatList
          data={userDocs}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : null}
    </View>
  );
};

export default UploadedDocs;

const styles = StyleSheet.create({
  inputContainer: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  itemView: {
    // padding: 10,
  },
});
