import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IDownloadStackParamList} from '../../navigation/interfaces';

export type ISearchScreenProps = NativeStackScreenProps<
  IDownloadStackParamList,
  'DownloadScreen'
>;
