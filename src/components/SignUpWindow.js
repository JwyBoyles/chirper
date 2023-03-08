import React from "react";
import close from "../images/close.svg"

export default function SignUpWindow(props) {

  
    
    return(
        <div className='signUpWindow--signUpScreen'>
        <div className='signUpWindow--signUpBox'>
        <img src={close} className="signUpWindow--closeWindow" onClick={props.handleSignUpWindow} />
        <p className='signUpWindow--signUpText'>Create Your Account</p>
        <form className='signUpWindow--signUpForm' onSubmit={props.handleSignUp}>
          <input
          type="email"
          placeholder='Email'
          name="email"
          onChange={props.handleCreateAccount}
          value={props.createAccount.email}
          required
          />
          <input
          type="password"
          placeholder='Password'
          name="password"
          onChange={props.handleCreateAccount}
          value={props.createAccount.password}
          required
          />
           {(props.createAccount.email.includes('@') && props.createAccount.password !== "") && <button className='signUpWindow--createAccountButtonFilled' onClick={props.handleSignIn}>Sign Up</button>}
        </form>
        {(!props.createAccount.email.includes('@') || props.createAccount.password === "") && <button className='signUpWindow--createAccountButton'>Sign Up</button>}
        </div>
  </div>
    )
}