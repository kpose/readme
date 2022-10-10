import AsyncStorage from '@react-native-async-storage/async-storage';
import {encrypto, decrypto} from './Encryption.util';

/**
 * Get's a single item from the async storage, encryoted data is
 * decrypted before returned.
 * @param storeKey string
 */
export const asyncGet = async (storeKey: string): Promise<any> => {
  // get data from async store
  const storeData = await AsyncStorage.getItem(storeKey);
  // if data is missing
  if (!storeData) {
    // resolve promise with null
    return Promise.resolve(null);
  }
  // decrypt data
  const data = decrypto(storeData);
  // resolve promise with decrypted data
  return Promise.resolve(data);
};

/**
 * Stores any kind of data to the async store on the users
 * device. For security sake data is encrypted before being stored.
 * @param storeKey string
 * @param data any
 */
export const asyncStore = async (
  storeKey: string,
  data: any,
): Promise<boolean> => {
  // encrypt data
  const encryptedData = encrypto(data);
  // check if failed to encrypt data
  if (!encryptedData) {
    // resolve with value as null
    return Promise.resolve(false);
  }
  // get data from async store
  await AsyncStorage.setItem(storeKey, encryptedData);
  // resolve promise with decrypted data
  return Promise.resolve(true);
};

/**
 * Removes a single item from the async storage.
 * @param storeKey string
 */
export const asyncRemove = async (storeKey: string): Promise<boolean> => {
  // get data from async store
  await AsyncStorage.removeItem(storeKey);
  // resolve promise with decrypted data
  return Promise.resolve(true);
};
