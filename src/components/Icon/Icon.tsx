import React from 'react';
import {IconProps} from './interfaces';
import FolderSVG from '../../assets/icons/folder.svg';
import CameraSVG from '../../assets/icons/camera.svg';
import CloudSVG from '../../assets/icons/cloud.svg';
import LinkSVG from '../../assets/icons/link.svg';
import PasteTextSVG from '../../assets/icons/paste-text.svg';
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

export default {FolderIcon, CameraIcon, PasteTextIcon, LinkIcon, CloudIcon};
