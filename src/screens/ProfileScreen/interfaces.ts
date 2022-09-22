import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IProfileStackParamList} from '../../navigation/interfaces';

export type ISearchScreenProps = NativeStackScreenProps<
  IProfileStackParamList,
  'ProfileScreen'
>;
