import { React } from "react";
import { Link } from "react-router-dom";


export default function SignUp(props) {
        
    return(
    
    <div className="SignUp">
        <div className="signUp--userPicContainer">
        {props.account.id && <Link onClick={props.getProfile} to={`/bio:${props.account.id}`}>
        <img src={props.getImages(props.account.id)} className="signUp--userPic"/> </Link>}
        </div>
       {props.account.isLoggedIn === false && <div className="signUp--box">
            <p className="signUp--bold">Sign Up</p>
            <p className="signUp--text">Create an account to get started</p>
            <button onClick={props.handleGoogleSignIn}className="signUp--button">Sign Up with Google</button>
            <button onClick={props.handleSignUpWindow}className="signUp--button">Sign Up with Email</button>
            <button onClick={props.handleSignInWindow} className="signUp--button">Sign In</button>
        </div>
        }
    </div>
    )
}
