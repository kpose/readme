import {StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen/Screen';
import {ScreenTitle} from '../../components/Text/Text';

const FirstName = () => {
  return (
    <Screen>
      <ScreenTitle>What is your first name?</ScreenTitle>
    </Screen>
  );
};

export default FirstName;

const styles = StyleSheet.create({});
