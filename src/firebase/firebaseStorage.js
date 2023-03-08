import { db } from './firebase'
import { collection, 
        addDoc,
        getDocs, 
        orderBy, 
        serverTimestamp, 
        query, 
        doc, 
        getDoc, 
        setDoc, 
        updateDoc,
        arrayUnion, 
        arrayRemove
        } from "firebase/firestore";

export async function getFeed(){
  const dataArray = []
  const q = query(collection(db, "chirp"), orderBy('timestamp', 'desc'))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => dataArray.push ({
     ...doc.data(),
     chirpID: doc.id 
  }));
  return(dataArray)
}

export async function setFeed(userName, handle, chirp, id){
    try {
      const docRef = await addDoc(collection(db, "chirp") , {
        userName: userName,
        handle: handle,
        chirp: chirp,
        id: id,
        timestamp: serverTimestamp(),
        likes: [],
        rechirp: [],
        
      });
    
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

export async function getUsers(id){
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return (docSnap.data());
      } else {
        return (false);
}
}

export async function getAllUsers(){
  const dataArray = []
  const q = query(collection(db, "users"))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => dataArray.push (
      doc.id 
  ));
return (dataArray)
}

export async function setUser(userName, handle, email, id){
    try {
        await setDoc(doc(db, 'users', id ) , {
        userName: userName,
        handle: handle,
        email: email,
        timestamp: serverTimestamp(),
        id: id,
        bio: "",
        following: [],
        followers: [],
      });
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

export async function setFollowers(followerId, followingId) {
  const setFollowing = doc(db, 'users', followingId);
  const setFollower = doc(db, 'users', followerId)
  const docSnapFollowing = await getDoc(setFollowing);
  const docSnapFollower = await getDoc(setFollower);

if(docSnapFollowing.data().following.includes(followerId)){
  await updateDoc(setFollowing, {
    following: arrayRemove(followerId)
})

} else {
  await updateDoc(setFollowing, {
    following: arrayUnion(followerId)
  })
  
}


if(docSnapFollower.data().followers.includes(followingId)){
  await updateDoc(setFollower, {
  followers: arrayRemove(followingId)
})

} else {
  await updateDoc(setFollower, {
    followers: arrayUnion(followingId)
  })
  
}

}


export async function setBio(id,desc) {
  const bio = doc(db, "users", id);
  await updateDoc(bio, {
  bio: desc,
});
}

export async function setLikes(chirpID, id) {
  const chirp = doc(db, "chirp", chirpID);
  const docSnap = await getDoc(chirp);
  if(docSnap.data().likes.includes(id)){
  await updateDoc(chirp, {
  likes: arrayRemove(id)
})

} else {
  await updateDoc(chirp, {
    likes: arrayUnion(id)
  })
}
  
}

export async function setRechirp(chirpID, id) {
  const chirp = doc(db, "chirp", chirpID);
  const docSnap = await getDoc(chirp);
  if(docSnap.data().rechirp.includes(id)){
  await updateDoc(chirp, {
  rechirp: arrayRemove(id)
})
} else {
  await updateDoc(chirp, {
    rechirp: arrayUnion(id)
  })
}

}


