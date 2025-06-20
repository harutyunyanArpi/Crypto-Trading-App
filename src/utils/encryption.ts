import CryptoJS from "crypto-js";
import { type StorageValue } from "zustand/middleware";

export function encrypt(data: object, key: string): string {
  const stringified = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringified, key).toString();
}

export function decrypt<T>(
  cipher: string,
  key: string,
): StorageValue<T> | null {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) throw new Error("Invalid decryption result");
    return JSON.parse(decrypted);
  } catch (error) {
    console.warn("Failed to decrypt persisted state:", error);
    return null;
  }
}
