import {React, useState} from "react";
import { storeImage } from '../firebase/firebaseCloudStorage.js'
import bird from "../images/bird.jpg"


export default function CreateUser(props) {

  // handles the selevtion of a profile picture and sends account information to Firebase
  const [file, setFile] = useState();  

  function handleImg(event) {
    setFile(event.target.files[0])
  }

  function handleEvent(event) {
    event.preventDefault()
    props.sendCreateUser()
    storeImage(file, props.account.id)

  }

    // Checks for banned characters in the handle
    const checkHandle = /^[A-Za-z0-9]*$/.test(props.account.handle)

    return(
        <div className='CreateUser--signUpScreen'>
        <div className='CreateUser--signUpBox'>
        <p className='CreateUser--signUpText'>Finish Creating Your Account</p>
        <form className='CreateUser--signUpForm' onSubmit={handleEvent}>
          <input
          type="text"
          placeholder='Name'
          name="userName"
          onChange={props.handleCreateUser}
          value={props.account.userName}
          maxLength="20"
          />
          <p className="createUser--usernameCounter">{props.account.userName.length} / 20</p>                
          <input
          type="text"
          placeholder='Handle (No Spaces)'
          name="handle"
          maxLength="10"
          onChange={props.handleCreateUser}
          value={props.account.handle}
          />
          <p className="createUser--handleCounter">{props.account.handle.length} / 10</p>  
          {file && <img src={(URL.createObjectURL(file))} className="createUser--userPic" />}
          <div className="createUser--profilePic">
          <label>Profile Picture:</label>
          <input className="createUser--uploadPic"type="file" id="myfile" name="profilePic"  onChange={handleImg} accept="image/png, image/jpeg, image/jpg" />
          </div>
          {(checkHandle && props.account.handle && props.account.userName)
          && <button className='CreateUser--createAccountButtonFilled'>Sign Up</button>}
        </form>
        {!(checkHandle && props.account.handle && props.account.userName)
         && <button className='CreateUser--createAccountButton'>Sign Up</button>}
        </div>
  </div>
    )
}