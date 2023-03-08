import React from "react";
import close from "../images/close.svg"

export default function SignInWindow(props) {
    
    return(
            <div className='signUpWindow--signUpScreen'>
              <div className='signUpWindow--signUpBox'>
              <img src={close} className="signUpWindow--closeWindow" onClick={props.handleSignInWindow} />
              <p className='signUpWindow--signUpText'>Sign In</p>
              {props.accountError && <p>Wrong Email or Password Please Try Again</p>}
              <form className='signUpWindow--signUpForm'>
                <input
                type="email"
                placeholder='Email'
                name="email"
                onChange={props.handleCreateAccount}
                value={props.createAccount.email}
                />
                <input
                type="password"
                placeholder='Password'
                name="password"
                onChange={props.handleCreateAccount}
                value={props.createAccount.password}
                />
                {props.createAccount.email.includes('@') && <button className='signUpWindow--createAccountButtonFilled' onClick={props.handleSignIn}>Sign In</button>}
              </form>
              {!props.createAccount.email.includes('@') && <button className='signUpWindow--createAccountButton'>Sign In</button>}
              </div>
        </div>
    )
}