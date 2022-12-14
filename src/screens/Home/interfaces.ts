import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IHomeStackParamList} from '../../navigation/interfaces';

export type IFirstNameScreenProps = NativeStackScreenProps<
  IHomeStackParamList,
  'Home'
>;
