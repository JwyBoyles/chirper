import {React, useState, useEffect} from "react";
import reply from "../images/reply.svg"
import repeat from "../images/repeat.svg"
import repeatFilled from "../images/repeatFilled.svg"
import heart from "../images/heart.svg"
import heartFilled from "../images/heartFilled.svg"

import { downloadImage } from '../firebase/firebaseCloudStorage.js'
import Header from "./Header";
import { Link } from "react-router-dom";
import bird from "../images/bird.jpg"

export default function Feed(props) {

    window.scrollTo(0, 0)

// maps out the array and gives each object in it the elements to populate the feed
const feedElements = props.chirpFeed.map((chirp ) => <div className="feed--chirp" key={chirp.chirpID} >
    <div className="feed--header">
    <img src={props.getImages(chirp.id)}
         className="feed--userPic"/>
    </div>
    <div className="feed--chirpBody">
    
        <div className="feed--user">
            <p className="feed--userName" onClick={chirp.getProfile}> <Link  to={`/bio:${chirp.id}`}>{chirp.userName}</Link></p>
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
    <div className="Feed">
        <Header
        headerTitle={"Chirper - Main Feed"} />
        {feedElements}
    </div>
    )
}
