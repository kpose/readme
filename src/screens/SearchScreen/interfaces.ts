import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ISearchStackParamList} from '../../navigation/interfaces';

export type ISearchScreenProps = NativeStackScreenProps<
  ISearchStackParamList,
  'SearchScreen'
>;
