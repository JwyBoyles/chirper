import { React } from "react";
import bird from "../images/bird.svg"
import home from "../images/home.svg"
import settings from "../images/settings.svg"
import users from "../images/users.svg"
import { Link } from "react-router-dom";

export default function Sidebar(props) {

    return(
    <div className="Sidebar">
          <div className="sidebar--content">
               <div>
                    <img src={bird}
                         className="sidebar--logo"
                    />
               </div>
               <Link to="/" className="sidebar--link"><div className="sidebar--list">
                    <img src={home}
                         className="sidebar--icon"
                    />
                    <p className="sidebar--text">Home</p>
               </div></Link>

               {props.account.isLoggedIn && <Link to="/following"><div className="sidebar--list">
                    <img src={users}
                         className="sidebar--icon"
                    />
                    <p className="sidebar--text">Following</p>
               </div></Link>}
               <Link to="/settings"><div className="sidebar--list">
                    <img src={settings}
                    className="sidebar--icon"
                    />
                    <p className="sidebar--text">Settings</p>
               </div></Link>
        </div>
        {props.account.isLoggedIn && <button onClick={props.handleChirpWindow} className="signUp--chirpButton">Chirp</button> }
    </div>
    )
}
