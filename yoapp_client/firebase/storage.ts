import { getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseApp } from "./app";

const storage = getStorage(firebaseApp, `gs://${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`)


export const uploadUserProfileImage = async (blobFile: Blob, fileName: string) => {
    const storageRef = ref(storage, `users/profile-images/${fileName}`);

    try {
        const snapshot = await uploadBytes(storageRef, blobFile)
        console.log('image upload sucessfully')
        return snapshot
    } catch (error) {
        console.error('error uploading file:', error)
        throw error
    }
    
}


