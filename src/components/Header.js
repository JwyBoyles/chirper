import React from "react";

export default function Header(props) {

    return(
    <div className="Header">
        {!props.chirpTotal && <p className="header--title">{props.headerTitle}</p>}
        {props.chirpTotal > 0 && <p className="header--username">{props.headerTitle}</p>}
        {props.chirpTotal > 0 && <p className="header--totalChirps">{props.chirpTotal} chirps</p>}
    </div>
    )
}