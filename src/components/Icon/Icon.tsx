import React from 'react';
import {IconProps} from './interfaces';
import FolderSVG from '../../assets/icons/folder.svg';
import CameraSVG from '../../assets/icons/camera.svg';
import CloudSVG from '../../assets/icons/cloud.svg';
import LinkSVG from '../../assets/icons/link.svg';
import PasteTextSVG from '../../assets/icons/paste-text.svg';
import NextSVG from '../../assets/icons/next.svg';
import BackSVG from '../../assets/icons/back.svg';
import HomeSvg from '../../assets/icons/home.svg';
import SearchSvg from '../../assets/icons/search.svg';
import DownloadSvg from '../../assets/icons/download.svg';
import UserSvg from '../../assets/icons/user.svg';
import ListenSVG from '../../assets/icons/listen.svg';
import ReadSVG from '../../assets/icons/read.svg';
import FastForwardSVG from '../../assets/icons/fastforward.svg';
import MicrophoneSVG from '../../assets/icons/microphone.svg';
import PauseSVG from '../../assets/icons/pause.svg';
import PlaySVG from '../../assets/icons/play.svg';
import RewindSVG from '../../assets/icons/rewind.svg';
import CloseSVG from '../../assets/icons/close.svg';
import CheckMarkSVG from '../../assets/icons/checkmark.svg';

import {appcolors} from '../../utils/colors.util';

export const FolderIcon: React.FC<IconProps> = function FolderIcon({
  color,
  size,
  opacity,
}) {
  return (
    <FolderSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const CameraIcon: React.FC<IconProps> = function CameraIcon({
  color,
  size,
  opacity,
}) {
  return (
    <CameraSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const CloudIcon: React.FC<IconProps> = function CloudIcon({
  color,
  size,
  opacity,
}) {
  return (
    <CloudSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const LinkIcon: React.FC<IconProps> = function LinkIcon({
  color,
  size,
  opacity,
}) {
  return (
    <LinkSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const PasteTextIcon: React.FC<IconProps> = function PasteTextIcon({
  color,
  size,
  opacity,
}) {
  return (
    <PasteTextSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const NextIcon: React.FC<IconProps> = function NextIcon({
  color,
  size,
  opacity,
}) {
  return (
    <NextSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const BackIcon: React.FC<IconProps> = function BackIcon({
  color,
  size,
  opacity,
}) {
  return (
    <BackSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const HomeIcon: React.FC<IconProps> = function HomeIcon({
  color,
  size,
  opacity,
}) {
  return (
    <HomeSvg
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const SearchIcon: React.FC<IconProps> = function SearchIcon({
  color,
  size,
  opacity,
}) {
  return (
    <SearchSvg
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const DownloadIcon: React.FC<IconProps> = function DownloadIcon({
  color,
  size,
  opacity,
}) {
  return (
    <DownloadSvg
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const UserIcon: React.FC<IconProps> = function UserIcon({
  color,
  size,
  opacity,
}) {
  return (
    <UserSvg
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const ReadIcon: React.FC<IconProps> = function ReadIcon({
  color,
  size,
  opacity,
}) {
  return (
    <ReadSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const FastForwardIcon: React.FC<IconProps> = function FastForwardIcon({
  color,
  size,
  opacity,
}) {
  return (
    <FastForwardSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const MicrophoneIcon: React.FC<IconProps> = function MicrophoneIcon({
  color,
  size,
  opacity,
}) {
  return (
    <MicrophoneSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const PauseIcon: React.FC<IconProps> = function PauseIcon({
  color,
  size,
  opacity,
}) {
  return (
    <PauseSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const PlayIcon: React.FC<IconProps> = function PlayIcon({
  color,
  size,
  opacity,
}) {
  return (
    <PlaySVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const RewindIcon: React.FC<IconProps> = function RewindIcon({
  color,
  size,
  opacity,
}) {
  return (
    <RewindSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const ListenIcon: React.FC<IconProps> = function ListenIcon({
  color,
  size,
  opacity,
}) {
  return (
    <ListenSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const CloseIcon: React.FC<IconProps> = function CloseIcon({
  color,
  size,
  opacity,
}) {
  return (
    <CloseSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export const CheckMarkIcon: React.FC<IconProps> = function CheckMarkIcon({
  color,
  size,
  opacity,
}) {
  return (
    <CheckMarkSVG
      fill={color || appcolors.primary}
      width={size || 16}
      height={size || 16}
      opacity={opacity || 1}
    />
  );
};

export default {
  FolderIcon,
  CameraIcon,
  PasteTextIcon,
  LinkIcon,
  CloudIcon,
  NextIcon,
  BackIcon,
  HomeIcon,
  SearchIcon,
  DownloadIcon,
  UserIcon,
  ReadIcon,
  ListenIcon,
  FastForwardIcon,
  MicrophoneIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  CloseIcon,
  CheckMarkIcon,
};
