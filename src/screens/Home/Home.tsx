import {View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Screen from '../../components/Screen/Screen';
import Text from '../../components/Text/Text';
import FAB from '../../components/FAB/FAB';
import {FolderIcon} from '../../components/Icon/Icon';
import useCloudStorage from '../../hooks/CloudStorage.hook';
import storage from '@react-native-firebase/storage';
import {DocumentView, RNPdftron} from 'react-native-pdftron';

const Home = () => {
  const {getAllDocs} = useCloudStorage();
  const [userDocs, setUserDocs] = useState([]);

  const getAll = useCallback(async () => {
    const data = await getAllDocs('testFolder');
    setUserDocs(data);
  }, [getAllDocs]);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const getItem = async (fullPath: any) => {
    const url = await storage()
      .ref(fullPath)
      .getDownloadURL()
      .catch(e => {
        console.error(e);
      });
    // Linking.openURL(url);
    console.log(url);
  };

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
        <Text onPress={() => getItem(item.fullPath)}>
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
    </Screen>
  );
};

export default Home;
