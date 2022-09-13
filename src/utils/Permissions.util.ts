import {request, PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';
import Logger from './Logger.util';
const CAMERA_PERMSION =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
const PHOTOS_PERMSION =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

type PermissionResult = 'granted' | 'denied' | 'blocked' | 'unavailable';

export function requestCameraPermission(): Promise<PermissionResult> {
  return new Promise((res, rej) => {
    request(CAMERA_PERMSION)
      .then(async result => {
        res(result);
      })
      .catch(e => {
        //  log error
        Logger(e);
        rej(e);
      });
  });
}

export function requestPhotosPermission(): Promise<PermissionResult> {
  return new Promise((res, rej) => {
    request(PHOTOS_PERMSION)
      .then(async result => {
        res(result);
      })
      .catch(e => {
        //  log error
        Logger(e);
        rej(e);
      });
  });
}

export function requestFilePermission(): Promise<PermissionResult> {
  return new Promise((res, rej) => {
    if (Platform.OS === 'ios') {
      return res('granted');
    }
    // check permission status
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then(async result => {
        res(result);
      })
      .catch(e => {
        //  log error
        Logger(e);
        rej(e);
      });
  });
}
