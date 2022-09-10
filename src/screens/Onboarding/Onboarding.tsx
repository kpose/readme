import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import data from './onboarding_data';
import {appcolors} from '../../utils/colors.util';
import Text, {ScreenTitle} from '../../components/Text/Text';
import {BackIcon, NextIcon} from '../../components/Icon/Icon';
import LottieView from 'lottie-react-native';
import Lottie from 'lottie-react-native';

const {width} = Dimensions.get('window');
const base = 10;
const Onboarding = () => {
  const flatlistRef = useRef<null | FlatList>(null);
  const animationRef = useRef<Lottie>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);

  const handleViewableItemsChanged = useRef(({viewableItems}) => {
    setViewableItems(viewableItems);
  });

  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) {
      return;
    }
    setCurrentPage(viewableItems[0].index);
  }, [currentPage, viewableItems]);

  useEffect(() => {
    animationRef.current?.play();
    animationRef.current?.play(30, 120);
  }, []);

  const handleSkipToEnd = () => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({
        animated: true,
        index: data.length - 1,
      });
    }
  };

  const handleNext = () => {
    if (currentPage === data.length - 1) {
      return;
    }
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({
        animated: true,
        index: currentPage + 1,
      });
    }
  };

  const handleBack = () => {
    if (currentPage === 0) {
      return;
    }
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({
        animated: true,
        index: currentPage - 1,
      });
    }
  };

  const renderFlatlistItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          {/* <ImageBackground source={item.img} style={styles.image} /> */}
          <Lottie ref={animationRef} source={item.img} style={styles.image} />
        </View>
        <View
          style={{
            paddingHorizontal: base * 4,
            marginVertical: base * 4,
          }}>
          <ScreenTitle style={styles.title}>{item.title}</ScreenTitle>
          <Text weight="bold" style={styles.description}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <View style={styles.topContainer}>
          {/* Back button */}
          <TouchableOpacity
            onPress={handleBack}
            style={{
              padding: base,
            }}>
            <BackIcon size={15} color={appcolors.light} />
          </TouchableOpacity>

          {/* Skip button */}
          {/* Hide Skip button on last screen */}
          <TouchableOpacity onPress={handleSkipToEnd}>
            <Text weight="bold" style={styles.skip}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderBottomSection = () => {
    return (
      <SafeAreaView>
        <View style={styles.bottomSection}>
          {/* Pagination */}
          <View style={styles.dotContainer}>
            {
              // No. of dots
              [...Array(data.length)].map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        index === currentPage
                          ? appcolors.primary
                          : appcolors.primary + '20',
                    },
                  ]}
                />
              ))
            }
          </View>

          {/* Next or GetStarted button */}
          {/* Show or Hide Next button & GetStarted button by screen */}
          {currentPage !== data.length - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              style={styles.nextButton}
              activeOpacity={0.8}>
              <NextIcon size={35} />
            </TouchableOpacity>
          ) : (
            // Get Started Button
            <TouchableOpacity style={styles.finishButton}>
              <NextIcon size={35} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {/* TOP SECTION - Back & Skip button */}
      {renderTopSection()}

      <FlatList
        data={data}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={renderFlatlistItem}
        ref={flatlistRef}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
        initialNumToRender={1}
        extraData={width}
      />

      {/* BOTTOM SECTION - pagination & next or GetStarted button */}
      {renderBottomSection()}
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  itemContainer: {
    width: width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: base * 2,
  },
  image: {
    width: 335,
    height: 335,
  },
  title: {
    alignSelf: 'center',
  },
  description: {
    fontSize: 18,
    opacity: 0.4,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 28,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: base * 2,
  },
  skip: {
    fontSize: 13,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: base * 2,
    paddingVertical: base * 2,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  finishButton: {
    paddingHorizontal: base * 2,
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStarted: {
    color: appcolors.light,
    fontSize: 18,
    marginLeft: base,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
