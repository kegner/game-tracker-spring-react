import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import FormItem from '../form/FormItem';
import { showSuccessToast, showErrorToast } from '../../actions/toastActions';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameValidClass, setFirstNameValidClass] = useState("");
  const [lastNameValidClass, setLastNameValidClass] = useState("");
  const [emailValidClass, setEmailValidClass] = useState("");
  const [usernameValidClass, setUsernameValidClass] = useState("");
  const [passwordValidClass, setPasswordValidClass] = useState("");
  
  const dispatch = useDispatch();

  const setState = (e, setter) => {
    setter(e.target.value);
  }

  const checkForInvalidField = (field, validClassSetter) => {
    if (!field) {
      validClassSetter("is-invalid");
      return true;
    }
    return false;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const firstNameCheck = checkForInvalidField(firstName, setFirstNameValidClass);
    const lastNameCheck = checkForInvalidField(lastName, setLastNameValidClass);
    const emailCheck = checkForInvalidField(email, setEmailValidClass);
    const usernameCheck = checkForInvalidField(username, setUsernameValidClass);
    const passwordCheck = checkForInvalidField(password, setPasswordValidClass);

    if (firstNameCheck || lastNameCheck || emailCheck || usernameCheck || passwordCheck) return;

    const user = {
      firstName,
      lastName,
      email,
      username,
      password
    };
    
    try {
      await axios.post("/api/v1/users", user);
      dispatch(showSuccessToast("Sign up successful."));
    } catch (error) {
      const validResponses = [404, 409];
      if (error && error.response && validResponses.includes(error.response.status)) {
        // this is the expected error format for Spring exception messages
        dispatch(showErrorToast(error.response.data.message));
      } else {
        console.error(error);
      }
    }
  }

  return (
    <form>
      <div className="row mb-4">
        <div className="col-6">
          <FormItem id="firstName" label="First Name"
            value={firstName} type="text"
            validClass={firstNameValidClass} validClassSetter={setFirstNameValidClass}
            isRequired={true} onChange={(e) => setState(e, setFirstName)}/>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-6">
          <FormItem id="lastName" label="Last Name"
            value={lastName} type="text"
            validClass={lastNameValidClass} validClassSetter={setLastNameValidClass}
            isRequired={true} onChange={(e) => setState(e, setLastName)} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-6">
          <FormItem id="email" label="Email"
            value={email} type="email"
            validClass={emailValidClass} validClassSetter={setEmailValidClass}
            isRequired={true} onChange={(e) => setState(e, setEmail)} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-6">
          <FormItem id="username" label="Username"
            value={username} type="text"
            validClass={usernameValidClass} validClassSetter={setUsernameValidClass}
            isRequired={true} onChange={(e) => setState(e, setUsername)} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-6">
          <FormItem id="password" label="Password"
            value={password} type="password"
            validClass={passwordValidClass} validClassSetter={setPasswordValidClass}
            isRequired={true} onChange={(e) => setState(e, setPassword)} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-6">
          <button className="btn btn-primary" type="submit" onClick={submitHandler}>Submit</button>
        </div>
      </div>
    </form>
  )
}

export default Signup
