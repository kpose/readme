import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IAuthStackParamList} from '../../navigation/interfaces';

export type IFirstNameScreenProps = NativeStackScreenProps<
  IAuthStackParamList,
  'FirstName'
>;
