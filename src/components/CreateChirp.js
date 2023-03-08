import {React, useState} from "react";
import { storeImage, downloadImage } from '../firebase/firebaseCloudStorage.js'
import close from "../images/close.svg"
import bird from "../images/bird.jpg"

export default function CreateChirp(props) {

  // dynamically increases the size of the chirp field 
    function composeChirpRows(x) {
        if (props.chirp.length <= 51) {
          x = '1'
        } else if(props.chirp.length <= 102) {
          x = '2'
        } else {
          x = '3'
        }
        return (x)
      }

    return(
<div className='app--newChirpScreen'>
              <div className='app--newChirpBox'>
              <img src={close} className="app--closeWindow" onClick={props.handleChirpWindow} />
                <div className='app--userInput'>
                <img src={props.getImages(props.account.id)}  className="feed--userPic"/>
                  <textarea 
                  placeholder="Whats on Your Mind?"
                  id="composeChirp"
                  name="composeChirp"
                  value={props.chirp}
                  onChange={props.handleChangeChirp}
                  className="app--composeChirp"
                  minLength={1}
                  maxLength={140}
                  rows={composeChirpRows()}
                  cols="50"
                  />
                </div>
                <p className='app--counter'>{props.chirp.length} / 140</p>
            <button className='app--createChirpButton' onClick={props.handleChangeChirpFeed}>Chirp</button>
              </div>
        </div>
    )
}