import {React, useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import './App.css';
import Sidebar from './components/Sidebar';
import SignUp from './components/SignUp';
import CreateChirp from "./components/CreateChirp";
import SignUpWindow from "./components/SignUpWindow";
import SignInWindow from "./components/SignInWindow";
import CreateUser from './components/CreateUser';
import Settings from './components/Settings';
import NoPage from './components/NoPage';
import Feed from './components/Feed';
import Bio from './components/Bio';
import FollowingFeed from './components/FollowingFeed'
import { getFeed, setFeed, getUsers, getAllUsers, setUser, setBio, setLikes, setRechirp, setFollowers} from './firebase/firebaseStorage';
import { handleGoogleSignIn, signUpEmail, signInEmail, signOutUser , status  } from './firebase/firebaseAuthorization';
import { downloadImage } from './firebase/firebaseCloudStorage.js'
import { onAuthStateChanged } from "firebase/auth";


function App() {

let { bio } = useParams();


// value used for account currently logged in
const [account, setAccount] = useState({
  userName: "",
  handle: "",
  id: "",
  bio: "",
  timestamp: "",
  isLoggedIn: false,
  following: [],
  followers: [],
})

// An array of objects with profile picture URLs and the account ID they are tied to
const [profilePicArray, setProfilePicArray] = useState([])

// A value used to cause a render if a user interacts with a post
const [updatePost, setUpdatePost] = useState(false)

// value used for navigation to different bio pages
const [profile, setProfile] = useState("");

const [createAccount, setCreateAccount] = useState({
  email: "",
  password: "",
})

// value used for log in errors
const [accountError, setAccountError] = useState(false)

// value used to track if account is signed in
const [accountAuth, setAccountAuth] = useState(false)

// values used to control overlays
const [chirpWindow, setChirpWindow] = useState(false)

const [signUpWindow, setSignUpWindow] = useState(false)

const [signInWindow, setSignInWindow] = useState(false)

const [createUserWindow, setCreateUserWindow] = useState(false)

// value used to write a post
const [chirp, setChirp] = useState("")

// value used to set a feed of all posts
const [chirpFeed, setChirpFeed] = useState([])

// An array of user IDs
const [userList, setUserList] = useState([])

useEffect(() => {
  getAllUsers().then(value => setUserList(value))
}, [createUserWindow])

// Create an array of profile pictures
useEffect(() => {
  
  // If statement used to stop situation where the array of profile pics doubles in size every render
  if(userList.length !== profilePicArray.length){
  setProfilePicArray([])
  userList.map(id => downloadImage(id).then(value =>    
  setProfilePicArray(prevValue => [...prevValue, {id: id, url: value} ])))
  }
}, [chirpFeed])

// Get the URL for Profile Pictures
function getImages(id) {
  let url
  profilePicArray.map(value => {if (id === value.id) url = value.url})
  return url
}

// allow user to navigate to their own bio from any page
function getProfile() {
  setProfile(account.id)
}

// update users status in the users bio
function updateBio(value) {
  setAccount(prevData => {
    return {
        ...prevData,
        bio: value
    }
})
}

// Send updated bio information to Firebase
function sendBio() {
  setBio(account.id, account.bio)
}


async function handleFollow(followingId) {
  await setFollowers(followingId, account.id)

  //update state for following feed
  const getFollowing = getUsers(account.id)
  getFollowing.then(value =>{
    setAccount(prevValue => {
      return{
        ...prevValue,
        following: value.following
      }
    })
  })
}

function handleSignUpWindow() {
      setSignUpWindow(!signUpWindow)
    }
    
function handleSignInWindow() {
      setSignInWindow(!signInWindow)
    }
    
function handleChirpWindow() {
        setChirpWindow(!chirpWindow)
    }


function handleCreateAccount(event) {
  
setCreateAccount(prevData => {
      return {
          ...prevData,
          [event.target.name]: event.target.value
      }
  })
  
}

function handleCreateUser(event) {
  
  setAccount(prevData => {
        return {
            ...prevData,
            [event.target.name]: event.target.value
        }
    })
    
  }

// Create the array for the feed 

useEffect(() => {
  
  const feedGetter = getFeed()
  feedGetter.then(value => value.map(chirp => {
      
      return{
          ...chirp,
          getProfile: function() {setProfile(chirp.id)},
          handleLike: async function() {
            if (account.isLoggedIn == true){
            await setLikes(chirp.chirpID, account.id)
            setUpdatePost(!updatePost)
            }
          },
          handleRechirp: async function() {
            if (account.isLoggedIn == true){
            await setRechirp(chirp.chirpID, account.id)
            setUpdatePost(!updatePost)
            }
          },
          handleReply: function() {
            if (account.isLoggedIn == true){
            setChirpWindow(!chirpWindow)
            setChirp(`@${chirp.handle}`)
            setUpdatePost(!updatePost) 
            }
          }
          
      }
      
    }, )).then(value => setChirpFeed([...value]))
    
    window.scrollTo(0, 0)
}, [chirpWindow, updatePost, account.isLoggedIn])

// Check if user has created an account and if that account has all the information needed to function

function accountCheck(x) {
    if (x === false){
      setCreateUserWindow(!createUserWindow)
    }
    else{
      setAccount(() => { return {
          userName: x.userName,
          handle: x.handle,
          id: x.id,
          isLoggedIn: true,
          following: x.following,
          
        }
      }
      )
    }
}

// Check if user is logged in

useEffect(() => {
 console.log("user auth state")
 onAuthStateChanged(status, (user) => {
  if (user) {
    const uid = user.uid;
    setAccount(prevData => {
      
      return {
          ...prevData,
          id: uid,
      }
  })
    const accountInfo = getUsers(uid)
    accountInfo.then(value => accountCheck(value) )
    
  } else {
    
  }

}
)

}, [accountAuth])

 function handleSignUp(event) {
  event.preventDefault()
  signUpEmail(createAccount.email, createAccount.password)
 
  handleSignUpWindow()
 }

function handleSignIn(event) {
  event.preventDefault()
  signInEmail(createAccount.email, createAccount.password)
  
  onAuthStateChanged(status, (user) => {
    if (user) {
      handleSignInWindow()
    } else {
      setAccountError(true)
    }  
  })
}

function handleChangeChirp(event) {
    setChirp(event.target.value)
  }

function handleChangeChirpFeed() {
    setFeed(account.userName,account.handle,chirp, account.id)
    setChirp("")
    handleChirpWindow();
  }


  function sendCreateUser() {
    
    if (account.userName && account.handle !== ("" || " ")){
    setUser(account.userName, account.handle, createAccount.email, account.id)
    setAccount(prevValue => {return{
    ...prevValue,
    }})
    
    setCreateUserWindow(false)
    setAccountAuth(!accountAuth)
    }
    }


// Wipes all account information on log out
function handleSignOut() {
  signOutUser()
  setAccount({
    userName: "",
    handle: "",
    id: "",
    bio: "",
    timestamp: "",
    isLoggedIn: false,
    following: [],
    followers: [],
  })
  setCreateAccount({
    email: "",
    password: "",
  })
  
  setAccountError(false)
}

  return (
    <BrowserRouter>
    <div className="App">
    <Sidebar  
        account={account}
        handleChirpWindow={handleChirpWindow}/>
    <div className='Body'>
    
      <Routes>
        <Route path="/" element={ <Feed 
            chirpFeed={chirpFeed}
            account={account}
            getImages={getImages}
            profilePicArray={profilePicArray}
             />} />
        <Route path={`/:bio`} element={ <Bio 
                getImages={getImages}
                profile={profile}
                account={account}
                handleFollow={handleFollow}
                chirpFeed={chirpFeed}
                updateBio={updateBio}
                sendBio={sendBio}
               
                />} />
        <Route path="/following" element={<FollowingFeed             
            chirpFeed={chirpFeed}
            getImages={getImages}
            account={account}
            updatePost={updatePost} />} />
        <Route path="/settings" element={<Settings 
        signOut={handleSignOut}/>} />
        <Route path="*" element={<NoPage />} />
      </Routes>

    </div>
        <SignUp 
        handleGoogleSignIn={handleGoogleSignIn}
        chirp={chirp}
        handleChangeChirp={handleChangeChirp}
        handleChangeChirpFeed={handleChangeChirpFeed}
        handleSignUp={handleSignUp}
        handleSignIn={handleSignIn}
        handleSignUpWindow={handleSignUpWindow}
        handleSignInWindow={handleSignInWindow}
        account={account}
        getImages={getImages}
        profilePicArray={profilePicArray}
        getProfile={getProfile}
         />
        {chirpWindow && <CreateChirp
        account={account}
        chirp={chirp}
        getImages={getImages}
        handleChangeChirp={handleChangeChirp}
        handleChangeChirpFeed={handleChangeChirpFeed}
        handleChirpWindow={handleChirpWindow}
        />}
        
        {signUpWindow && <SignUpWindow
        handleCreateAccount={handleCreateAccount}
        createAccount={createAccount}
        handleSignUp={handleSignUp}
        handleSignUpWindow={handleSignUpWindow}/>}

        {signInWindow && <SignInWindow
        handleCreateAccount={handleCreateAccount}
        createAccount={createAccount}
        handleSignIn={handleSignIn}
        handleSignInWindow={handleSignInWindow}
        accountError={accountError}
        />}

        {createUserWindow && <CreateUser
        sendCreateUser={sendCreateUser}
        handleCreateUser={handleCreateUser}
        account={account}
        />}
    </div>
    </BrowserRouter>
  );
}

export default App;

