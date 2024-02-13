import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "./app";

const storage = getStorage(firebaseApp, `gs://${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`)


export const uploadUserProfileImage = async (blobFile: Blob, fileName: string) => {
    const storageRef = ref(storage, `users/profile-images/${fileName}`);

    try {
        const snapshot = await uploadBytes(storageRef, blobFile)
        console.log('image upload sucessfully', snapshot)
        return snapshot;
    } catch (error) {
        console.error('error uploading file:', error)
        throw new Error("error uploading image");
    }
    
}

export const downloadUserProfileImage = async (imgPath: string) => {
    const storageRef = ref(storage, imgPath);
    try {
        const url = await getDownloadURL(storageRef)
        console.log('sucessfully downloaded', url)
        return url;
    } catch (error) {
        console.log('error downloading image', error)
        throw new Error("error downloading image");
    }
}


