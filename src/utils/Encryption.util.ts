import Logger from './Logger.util';
import CryptoJS from 'crypto-js';

export const ENCRYPTION_KEY: string = 'readme_some_pdf_files';

/**
 * This is used to encrypt data, the function uses the AES algorithm to encrypt the
 * passed data into a string. To ensure whatever is passed is encrypted, data is
 * first converted to JSON and then after that the passed data gets encrypted
 * @param data any
 * @param key string
 */
export const encrypto = (
  data: any,
  key: string = ENCRYPTION_KEY,
): string | null => {
  try {
    // encrypt data and return as a string
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  } catch (e) {
    Logger(e);
    return null;
  }
};

/**
 * This is used to decrypt encrypted data, function uses the AES algorithm to decryt the
 * passed back to understandable data. It is also assumed that the encrypted data was first
 * converted to JSON before encryption to a JSON parse will be attempted on the cyoher text
 * after decryption.
 * @param data string
 * @param key string
 */
export const decrypto = (
  cypherText: string,
  key: string = ENCRYPTION_KEY,
): any => {
  try {
    // decrypt cypher text to bytes
    const bytes = CryptoJS.AES.decrypt(cypherText, key);
    // JSON parse decrypted cypher text and return as original data
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    Logger(e);
    return undefined;
  }
};
