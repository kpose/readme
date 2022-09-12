import {View, FlatList, StyleSheet, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Text from '../Text/Text';
import {RNPdftron} from 'react-native-pdftron';
import {useUser} from '../../providers/UserProvider';
import useCloudStorage from '../../hooks/CloudStorage.hook';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import {useAppDispatch, useAppSelector} from '../../hooks/ReduxState.hook';
import {IPDFBook, updateBookStore} from '../../redux/slices/uploadedBooksSlice';

const UploadedDocs = () => {
  const books = useAppSelector(state => state.books.books);
  const dispatch = useAppDispatch();
  const [fetchingError, setFetchingError] = useState('');
  const {user} = useUser();
  const {getAllUploadedPDFs} = useCloudStorage();

  useEffect(() => {
    RNPdftron.initialize('');
    fatchDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAndWritePdf = useCallback(
    async (doc: FirebaseStorageTypes.Reference[]) => {
      for (const item of doc) {
        const url = await storage()
          .ref(item.fullPath)
          .getDownloadURL()
          .catch(e => {
            console.error(e);
          });
        if (!url) {
          return Alert.alert('Error', 'something went wrong');
        }
        const localFile = `${RNFS.DocumentDirectoryPath}/${item.name}`;
        const options = {
          fromUrl: url,
          toFile: localFile,
        };
        for (const _item of books) {
          console.log(_item);
          if (_item.name === item.name || _item.downloadUrl === url) {
            return;
          }
          RNFS.downloadFile(options)
            .promise.then(() => {
              dispatch(
                updateBookStore({
                  location: localFile,
                  name: item.name,
                  downloadUrl: url,
                }),
              );
            })
            .then(() => {
              // success
            })
            .catch(error => {
              console.log(error);
              // error
            });
        }
        // check for duplicates
      }
    },
    [books, dispatch],
  );

  console.log(books);

  const fatchDocs = useCallback(async () => {
    const email = user?.email;
    if (!email) {
      return;
    }
    await getAllUploadedPDFs()
      .then(doc => {
        getAndWritePdf(doc);
      })
      .catch(error => {
        setFetchingError(error);
      });
  }, [getAllUploadedPDFs, getAndWritePdf, user?.email]);

  const ItemSeparatorView = () => {
    return <View style={styles.inputContainer} />;
  };

  const ItemView = ({item}: IPDFBook) => (
    <View style={styles.itemView}>
      <Text /* onPress={() => getAndWritePdf(item.fullPath, item.name)} */>
        File Name: {item.name}
        {'\n'}
        File Full Path: {item.fullPath}
        {'\n'}
        Bucket: {item.bucket}
      </Text>
    </View>
  );

  if (!books) {
    return (
      <View>
        <Text>Loading books</Text>
      </View>
    );
  }

  return (
    <View>
      {books.length ? (
        <FlatList
          data={books}
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
