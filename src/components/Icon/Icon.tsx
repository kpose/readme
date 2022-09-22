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
};
