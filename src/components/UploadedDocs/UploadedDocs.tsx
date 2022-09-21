import {View, FlatList, StyleSheet, Image, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Text from '../Text/Text';
import {RootState} from '../../redux/store';
import {useAppSelector} from '../../hooks/ReduxState.hook';
import {appcolors} from '../../utils/colors.util';
import {usePDFViewer} from '../../providers/PDFViewerProvider';
import RNFS from 'react-native-fs';

const pdfWidth = 120;
const pdfHeight = 190;

const UploadedDocs = () => {
  const books = useAppSelector((state: RootState) => state.books);
  const [book, setBook] = useState([]);
  const {openDocument} = usePDFViewer();

  useEffect(() => {
    // console.log(books);
  }, [books]);

  const open = useCallback(async x => {
    const file = {
      uri: x.location,
      name: x.name,
      type: 'application/pdf',
    };

    const body = new FormData();
    body.append('pdfFile', file);

    try {
      const responseOfFileUpload = await fetch(
        'http://172.20.10.2:4000/extract',
        {
          method: 'POST',
          body: body,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      let responseInJs = await responseOfFileUpload.json();
      setBook(responseInJs.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderPdfView = ({item}) => {
    return (
      <View style={styles.pdfContainer}>
        <Pressable
          onPress={() => {
            open(item);
          }}>
          <Image
            source={item.thumbnail}
            style={styles.thumbnailImage}
            resizeMode="contain"
          />
        </Pressable>
        <Text numberOfLines={1} style={styles.pdfTitle}>
          {item.name.split('.pdf')}
        </Text>
        <View style={styles.progressBar} />
      </View>
    );
  };

  const renderBook = item => {
    return (
      <View>
        <Text>{item.item}</Text>
      </View>
    );
  };
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
        <View>
          <Text style={styles.heading}> Recently added </Text>
          <FlatList
            data={books}
            horizontal
            renderItem={renderPdfView}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.pdfContent}
          />
        </View>
      ) : null}

      {book.length ? (
        <View>
          <Text style={styles.heading}> Book </Text>
          <FlatList
            data={book}
            renderItem={renderBook}
            keyExtractor={item => item}
            contentContainerStyle={styles.pdfContent}
          />
        </View>
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
  pdfView: {
    backgroundColor: 'red',
  },
  thumbnailImage: {
    width: pdfWidth,
    height: pdfHeight,
    borderRadius: 20,
    overflow: 'hidden',
  },
  pdfContainer: {
    marginRight: 20,
    alignItems: 'center',
    width: pdfWidth,
    shadowColor: appcolors.primary,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  pdfContent: {
    // paddingHorizontal: 10,
  },
  pdfTitle: {
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  progressBar: {
    backgroundColor: appcolors.primary,
    borderRadius: 10,
    width: '100%',
    height: 2,
    marginTop: 6,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
  },
});
