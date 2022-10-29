import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  ListRenderItem,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Text from '../Text/Text';
import {RootState} from '../../redux/store';
import {useAppSelector} from '../../hooks/ReduxState.hook';
import {appcolors} from '../../utils/colors.util';
import {IPDFBook} from '../../redux/slices/uploadedBooksSlice';
import {IOpenDocProps} from './interfaces';
// import {usePDFViewer} from '../../providers/PDFViewerProvider';

const pdfWidth = 120;
const pdfHeight = 190;

const UploadedPDFs = () => {
  const books = useAppSelector((state: RootState) => state.books);
  const [popupOpen, setPopupOpen] = useState(false);
  const [openDoc, setOpenDoc] = useState<IOpenDocProps>();
  // const {openDocument} = usePDFViewer();

  useEffect(() => {
    // console.log(books);
  }, [books]);

  const handleDocPress = useCallback(
    (doc: IPDFBook) => {
      if (popupOpen) {
        return;
      }
      setPopupOpen(true);
      setOpenDoc({title: doc.title});
    },
    [popupOpen],
  );

  const renderPdfFiles: ListRenderItem<IPDFBook> = ({item}) => {
    return (
      <View style={styles.pdfContainer}>
        <Pressable onPress={() => handleDocPress(item)}>
          <Image
            // source={item.thumbnail}
            source={require('../../assets/images/thumbnail.png')}
            style={styles.thumbnailImage}
            resizeMode="contain"
          />
        </Pressable>
        <Text numberOfLines={1} style={styles.pdfTitle}>
          {item.title.split('.pdf')}
        </Text>
        <View style={styles.progressBar} />
      </View>
    );
  };

  if (!books.length) {
    return (
      <View>
        <Text>You currently don't have any books uploaded</Text>
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
            renderItem={renderPdfFiles}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.pdfContent}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : null}
    </View>
  );
};

export default UploadedPDFs;

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
