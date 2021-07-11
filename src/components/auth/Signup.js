import firebase from "firebase/app"
import { useState } from "react";
import Button from "../common/Button";
import InputText from "../form/InputText";
import Alert from "../common/Alert";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
export default function Signup() {
  const history = useHistory();
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [confirmPassword, updateConfirmPassword] = useState('');
  const [isSignup, updateIsSignup] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const handleSubmit = () => {
    if (isSignup) return createAccount();
    signInUser();
  }
  const createAccount = async () => {
    if (!email) {
      return setError('Enter a valid email');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    setError('');
    try {
      let resp = await auth.createUserWithEmailAndPassword(email, password);
      setMessage(`New user created: ${resp.user.email}`);
      updateEmail('');
      updatePassword('');
      updateConfirmPassword('');
      updateIsSignup(false);
      history.push('/dashboard');
    } catch (error) {
      return setError(error.message);
    }
  }
  const handleGoogleLogin = async () => {
    let provider = new firebase.auth.GoogleAuthProvider();

    try {
      let result = await firebase.auth().signInWithPopup(provider);
      if (result.user.email) {
        history.push('/dashboard');
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleTwitterLogin = async () => {
    let provider = new firebase.auth.TwitterAuthProvider();
    try {
      let result = await firebase.auth().signInWithPopup(provider);
      if (result.user.email) {
        history.push('/dashboard');
      }
    } catch (error) {
      console.error(error)
    }

  }
  const signInUser = async () => {
    if (!email) {
      return setError('Enter a valid email');
    }
    if (!password) {
      return setError('Please enter your password');
    }
    setError('');
    try {
      let resp = await auth.signInWithEmailAndPassword(email, password);
      if (resp.user.email) {
        history.push('/dashboard');
      }
    } catch (error) {
      return setError(error.message);
    }
  }
  return (
    <>
      <h3><span>{isSignup ? 'Sign Up' : 'Sign In'}</span></h3>
      <Button className="btn-link light text-sm mb-5 font-normal" handleOnClick={() => updateIsSignup(!isSignup)}>
        {isSignup ? 'Have an account? Sign in' : 'Create an Account'}
      </Button>
      <form className="rg-signin">
        {error && <Alert type="error" message={error} />}
        {message && <Alert type="success" message={message} />}
        <InputText id="email" type="email" label="Email Address" placeholder="you@somewhere.com" handleChange={(value) => updateEmail(value)} value={email} isValid={true} required={true} />
        <InputText id="password" type="password" label="Password" placeholder="At least 6 characters" handleChange={(value) => updatePassword(value)} value={password} isValid={true} required={true} />
        {isSignup && <InputText type="password" label="Confirm Password" placeholder="Must match password above" handleChange={(value) => updateConfirmPassword(value)} value={confirmPassword} isValid={true} required={true} />}
        <Button className="btn-block mt-3 hover:shadow-md" icon="fas fa-sign-in-alt" handleOnClick={() => handleSubmit()}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>

      </form>
      {!isSignup &&
        <>
          <div className="relative flex justify-center mt-4 text-sm text-white text-opacity-70 mb-1">Or, Sign In With:</div>
          <div className="flex justify-between items-center mt-1">
            <Button icon="fab fa-google" icon_color="text-primary" className="mr-1 flex-grow btn-outline bg-transparent border-white border-opacity-25 text-white text-opacity-70" handleOnClick={handleGoogleLogin}>Google</Button>
            <Button icon="fab fa-twitter" icon_color="text-primary" className="ml-1 flex-grow btn-outline bg-transparent border-white border-opacity-25 text-white text-opacity-70" handleOnClick={handleTwitterLogin}>Twitter</Button>
          </div>

        </>
      }
      <Button className="btn-link light text-sm mb-0 font-normal" handleOnClick={() => history.push('/reset')}>Forgot password?
      </Button>

    </>
  )
}
