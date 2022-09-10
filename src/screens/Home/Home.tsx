import {View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Screen from '../../components/Screen/Screen';
import Text from '../../components/Text/Text';
import FAB from '../../components/FAB/FAB';
import {FolderIcon} from '../../components/Icon/Icon';
import useCloudStorage from '../../hooks/CloudStorage.hook';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import {DocumentView, RNPdftron} from 'react-native-pdftron';

const Home = () => {
  const {getAllDocs} = useCloudStorage();
  const [userDocs, setUserDocs] = useState([]);
  const [jjj, setFileLocation] = useState('');

  const getAll = useCallback(async () => {
    const data = await getAllDocs('testFolder');
    setUserDocs(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // last step it will download open it with fileviewer.
    RNFS.downloadFile(options)
      .promise.then(() => setFileLocation(localFile))
      .then(() => {
        // success
        // Here you can perform any of your completion tasks
      })
      .catch(error => {
        console.log(error);
        // error
      });
  }, []);

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const ItemView = ({item}) => {
    return (
      <View style={{padding: 10}}>
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
      <FAB />

      {/* {jjj && <DocumentView document={jjj} showLeadingNavButton={true} />} */}
    </Screen>
  );
};

export default Home;
