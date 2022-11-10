import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISpeachVoice} from '../../providers/SpeachProvider';
import type {RootState} from '../store';

interface ISpeakerInfo {
  voice: ISpeachVoice | null;
  rate: string | null;
}
interface ISpeakerState {
  speaker: ISpeakerInfo;
}

const initialState: ISpeakerState = {
  speaker: {
    voice: null,
    rate: null,
  },
};

export const SpeakerInfoSlice = createSlice({
  name: 'SpeakerInfo',
  initialState: initialState.speaker,
  reducers: {
    updateVoice: (state, action: PayloadAction<ISpeachVoice>) => {
      state.voice = action.payload;
    },
    updateRate: (state, action: PayloadAction<string>) => {
      state.rate = action.payload;
    },
  },
});

export const {updateRate, updateVoice} = SpeakerInfoSlice.actions;

export const SpeakerInfo = (state: RootState) => state.speakerInfo;

export default SpeakerInfoSlice.reducer;
