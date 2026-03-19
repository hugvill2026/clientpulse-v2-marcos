import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../config/firebase'; // Note: db imports app
import { getApp } from 'firebase/app';

const storage = getStorage(getApp());

export const StorageService = {
  /**
   * Upload an image to Firebase Storage and return its public download URL
   */
  async uploadImage(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("StorageService.uploadImage Error:", error);
      throw error;
    }
  }
};
