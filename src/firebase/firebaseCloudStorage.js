import {storage} from './firebase'
import { ref, uploadBytes, getDownloadURL, getBlob } from "firebase/storage";

export function storeImage(file, location) {
    
  const storageRef = ref(storage, `images/${location}.jpg`);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {

  });
}

export function downloadImage(location) {
  
  
  const imageUrl = getDownloadURL(ref(storage, `images/${location}.jpg`)).then(url =>  url)
  
  // catch {
  // const imageUrl = getDownloadURL(ref(storage, `images/pug.jpg`)).then(url => imageUrl = url)
  // }

   return (imageUrl)
}