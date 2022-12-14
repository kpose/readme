import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IAuthStackParamList} from '../../navigation/interfaces';

export type IOnboardingScreenProps = NativeStackScreenProps<
  IAuthStackParamList,
  'Onboarding'
>;
