import {React} from "react";
import reply from "../images/reply.svg"
import repeat from "../images/repeat.svg"
import repeatFilled from "../images/repeatFilled.svg"
import heart from "../images/heart.svg"
import heartFilled from "../images/heartFilled.svg"

import Header from "./Header";
import { Link } from "react-router-dom";

export default function FollowingFeed(props) {

    window.scrollTo(0, 0)


// creates a feed of only accounts that the user is following
const followerFeed = props.chirpFeed.filter(chirp => (props.account.following.includes(chirp.id)))

const feedElements = followerFeed.map((chirp ) => <div className="feed--chirp" key={chirp.chirpID} > 
<div className="feed--header">
<img src={props.getImages(chirp.id)}  className="feed--userPic"/>
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
        <p>3</p>
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
        headerTitle={"Chirper - Following Feed"} />
        {feedElements}
        {feedElements.length === 0 && <p style={{margin:"2rem"}}>You are currently not following any accounts. 
        Click on a user's profile and hit follow to add them to the feed!</p>}
    </div>
    )
}
