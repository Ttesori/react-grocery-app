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
      history.push('/stores');
    } catch (error) {
      return setError(error.message);
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
      setMessage(`User logged in: ${resp.user.email}`);
      updateEmail('');
      updatePassword('');
      updateConfirmPassword('');
      history.push('/stores');
    } catch (error) {
      return setError(error.message);
    }
  }
  return (
    <div>
      <h1>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
      {error && <Alert type="error" message={error} />}
      {message && <Alert type="success" message={message} />}
      <form>
        <InputText type="email" label="Email Address" placeholder="you@somewhere.com" handleChange={(value) => updateEmail(value)} value={email} isValid={true} required={true} />
        <InputText type="password" label="Password" placeholder="At least 6 characters" handleChange={(value) => updatePassword(value)} value={password} isValid={true} required={true} />
        {isSignup && <InputText type="password" label="Confirm Password" placeholder="Must match password above" handleChange={(value) => updateConfirmPassword(value)} value={confirmPassword} isValid={true} required={true} />}
        <Button className="btn btn-form" handleOnClick={() => handleSubmit()}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
      </form>
      {isSignup &&
        <button onClick={() => updateIsSignup(false)}>Have an account? Sign in</button>}
      {!isSignup && <button onClick={() => updateIsSignup(true)}>Need an account? Sign up</button>}
    </div>
  )
}