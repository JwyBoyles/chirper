import {React} from "react";
import Header from "./Header";

export default function Settings(props) {

    return(
        <div className="Settings">
            <Header
            headerTitle={"Settings"}
            />
            <button className="settings--signOutButton" onClick={props.signOut}>Sign Out</button>
            
        </div>
    )
}