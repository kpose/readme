import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Text from '../../components/Text/Text';
import Screen from '../../components/Screen/Screen';
import data from './Onboarding';
import {appcolors} from '../../utils/colors.util';

const size = 10;
const {width, height} = Dimensions.get('window');

const OnBoad = () => {
  const flatlistRef = useRef();
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

  const handleNext = () => {
    if (currentPage == data.length - 1) return;

    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };

  const handleBack = () => {
    if (currentPage == 0) return;
    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    });
  };

  const handleSkipToEnd = () => {
    flatlistRef.current.scrollToIndex({
      animate: true,
      index: data.length - 1,
    });
  };

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: size * 2,
          }}>
          {/* Back button */}
          <TouchableOpacity
            onPress={handleBack}
            style={{
              padding: size,
            }}>
            {/* Back icon */}
            {/* Hide back button on 1st screen */}
            {/* <AntDesignIcons
              name="left"
              style={{
                fontSize: 25,
                color: appcolors.dark,
                opacity: currentPage == 0 ? 0 : 1,
              }}
            /> */}
            <Text>BACK</Text>
          </TouchableOpacity>

          {/* Skip button */}
          {/* Hide Skip button on last screen */}
          <TouchableOpacity onPress={handleSkipToEnd}>
            <Text
              style={{
                fontSize: 18,
                color: appcolors.dark,
                opacity: currentPage == data.length - 1 ? 0 : 1,
              }}>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: size * 2,
            paddingVertical: size * 2,
          }}>
          {/* Pagination */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {
              // No. of dots
              [...Array(data.length)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      index == currentPage
                        ? appcolors.primary
                        : appcolors.primary + '20',
                    marginRight: 8,
                  }}
                />
              ))
            }
          </View>

          {/* Next or GetStarted button */}
          {/* Show or Hide Next button & GetStarted button by screen */}
          {currentPage !== data.length - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: appcolors.primary,
              }}
              activeOpacity={0.8}>
              {/* <AntDesignIcons
                name="right"
                style={{fontSize: 18, color: appcolors.light, opacity: 0.3}}
              /> */}
              <Text>BACK</Text>
              {/* <AntDesignIcons
                name="right"
                style={{fontSize: 25, color: appcolors.light, marginLeft: -15}}
              /> */}
              <Text>BACK</Text>
            </TouchableOpacity>
          ) : (
            // Get Started Button
            <TouchableOpacity
              style={{
                paddingHorizontal: size * 2,
                height: 60,
                borderRadius: 30,
                backgroundColor: appcolors.primary,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: appcolors.light,
                  fontSize: 18,
                  marginLeft: size,
                }}>
                Get Started
              </Text>
              {/* <AntDesignIcons
                name="right"
                style={{
                  fontSize: 18,
                  color: appcolors.light,
                  opacity: 0.3,
                  marginLeft: size,
                }}
              /> */}
              <Text>BACK</Text>
              {/* <AntDesignIcons
                name="right"
                style={{fontSize: 25, color: appcolors.light, marginLeft: -15}}
              /> */}
              <Text>BACK</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const renderFlatlistItem = ({item}) => {
    return (
      <View
        style={{
          width: SIZES.width,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: size * 2,
          }}>
          <ImageBackground
            source={item.img}
            style={{width: 335, height: 335, resizeMode: 'contains'}}
          />
        </View>
        <View
          style={{
            paddingHorizontal: size * 4,
            marginVertical: size * 4,
          }}>
          <Text style={{fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 18,
              opacity: 0.4,
              textAlign: 'center',
              marginTop: 15,
              lineHeight: 28,
            }}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <Screen>
      {/* TOP SECTION - Back & Skip button */}
      {renderTopSection()}

      {/* FLATLIST with pages */}

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
    </Screen>
  );
};

export default OnBoad;
