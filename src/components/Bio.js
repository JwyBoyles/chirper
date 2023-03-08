import {React, useEffect, useState} from "react";
import { downloadImage } from '../firebase/firebaseCloudStorage.js'
import reply from "../images/reply.svg";
import repeat from "../images/repeat.svg";
import repeatFilled from "../images/repeatFilled.svg";
import heart from "../images/heart.svg";
import heartFilled from "../images/heartFilled.svg";
import bird from "../images/bird.jpg"
import kuala from "../images/kualalumpur.jpg"
import mountains from "../images/mountains.jpg"
import texture from "../images/texture.jpg"
import tulips from "../images/tulips.jpg"
import tree from "../images/tree.jpg"
import universe from "../images/universe.jpg"
import { Link } from "react-router-dom";
import { getUsers } from "../firebase/firebaseStorage";
import Header from "./Header";

export default function Bio(props) {

    // value that determines if the text field that lets user update their bio should be rendered
    const [bioField, setBioField] = useState(false)

    // object that stores information of bio on the screen
    const [currentBio, setCurrentBio] = useState({
        userName: "",
        handle: "",
        iconColor: "black",
        timestamp: "",
        bio: "",
        id: "",
        following: [],
        followers: [],
      })

    // All of the images in the banner
    const bannerArray = [bird, kuala, mountains, texture, tulips, tree, universe]
    const [bannerImg, setBannerImg] = useState()

    //Banner will only render once on page load
    useEffect(() => {
        setBannerImg(bannerArray[Math.floor(Math.random()*bannerArray.length)])
        window.scrollTo(0, 0)
    }, [])
    
    
    // function that determines the correct bio information to render. If user refreshes page it gets the bio's id from the url
    function checkProfile() {
        if(props.profile !== ""){
            const accountInfo = getUsers(props.profile)
            accountInfo.then(value => setCurrentBio({...value}))
            
            } 
            else if(props.profile === ""){
                let getURL = window.location.href;
                const arrayURL = getURL.split(':')
                const accountInfo = getUsers(arrayURL[3])
                accountInfo.then(value => setCurrentBio({...value}))
            }
    }    

    useEffect(() => {
        checkProfile()
        }
        ,[props.profile])

    function editBio(){
        setBioField(!bioField)
    }

    // adds user to the followers of the viewed bio
    function follow() {
        props.handleFollow(currentBio.id)
    }

    // updates the bio
    function handleBioChange(event){
        props.updateBio(event.target.value)
    }

    async function handleBio() {
        props.sendBio(props.account.id, props.account.bio)
        setCurrentBio(prevValue => {return{
            ...prevValue,
            bio: props.account.bio,
        }})
        setBioField(false)
    }

    // style object that gives the numbers in the following and follower count a different look
    const followerNumbers = {
            fontWeight: 'bold',
            color: 'black',
     }
  
    // Creates feed of only the chirps of the current bio and anything that has been rechirped by the current bio
    const followerFeed = props.chirpFeed.filter(chirp => ((chirp.id) === (props.profile || currentBio.id)) || chirp.rechirp.includes(props.profile || currentBio.id))

    const feedElements = followerFeed.map(chirp => <div className="feed--chirp" key={chirp.chirpID} > 
     <div className="feed--header">
     <img src={props.getImages(chirp.id)} className="feed--userPic"/>
     </div>
     <div className="feed--chirpBody">
     {chirp.rechirp.includes(props.profile || currentBio.id) && <p className="bio--rechirpText">Rechirped by {currentBio.userName}</p>}
         <div className="feed--user">
             <p className="feed--userName" onClick={chirp.getProfile}><Link to={`/bio:${chirp.id}`}>{chirp.userName}</Link></p>
             <p className="feed--handle">@{chirp.handle} - {chirp.timestamp ? chirp.timestamp.toDate().toDateString().slice(4) : "Just Now"}</p>
         </div>
         <p className="feed--chirpContent">{chirp.chirp}</p>
         <div className="feed--icons">
             <div className="feed--iconGroup">
                 <img src={reply} onClick={chirp.handleReply}/>
             
             </div>
     
             <div className="feed--iconGroup">
                <img src={chirp.rechirp.includes(props.account.id) ? repeatFilled : repeat} onClick={chirp.handleRechirp}/>
             <p>{chirp.rechirp.length > 0 ? chirp.rechirp.length : " "}</p>
             </div>
     
             <div className="feed--iconGroup">
                 <img src={chirp.likes.includes(props.account.id) ? heartFilled : heart} onClick={chirp.handleLike} />
             <p>{chirp.likes.length > 0 ? chirp.likes.length : " "}</p>
             </div>
     
         </div>
     </div>
     </div>)

    return(
    <div className="Bio">
        <Header 
        headerTitle={currentBio.userName}
        chirpTotal={followerFeed.length}/>
        <div className="bio--header">
            <img src={bannerImg}
                className="bio--bannerImage"/>
            <img src={props.getImages(currentBio.id)} 
                className="bio--profileImage"/>
            {!bioField && ((props.account.id === (props.profile || currentBio.id)) ? <button className="bio--followButton" onClick={editBio}>Edit</button> 
            : <button onClick={follow}className="bio--followButton">{props.account.following.includes(currentBio.id) ? "Following" : "Follow"}</button>)}
        </div>
        <div className="bio--info">
        <p className="bio--username">{currentBio.userName}</p>
        <p className="bio--handle">@{currentBio.handle}</p>
        {!bioField && <p className="bio--description">{currentBio.bio}</p>}
        {bioField && <textarea placeholder="Tell us about yourself?"
                  id="bio"
                  name="bio"
                  className="bio--updateBioField"
                  onChange={handleBioChange}
                  rows="4"
                  minLength="1"
                  maxLength="250">
                  </textarea>}
        {bioField && <button className="bio--doneButton"onClick={handleBio}>Done</button>}
        <p className="bio--joinDate">{(currentBio.timestamp !== "") && `Joined ${currentBio.timestamp.toDate().toDateString().slice(4)}`}</p>
        <p className="bio--followerCount">
            <span style={followerNumbers}>{currentBio.following.length} </span>Following <span style={followerNumbers}>{currentBio.followers.length} </span>{currentBio.followers.length === 1 ? "Follower" : "Followers"}</p>
        </div>
        {feedElements}
    </div>
    )
}