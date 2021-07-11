import { useState } from "react";
import Button from "../common/Button";
import InputText from "../form/InputText";
import Alert from "../common/Alert";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
export default function ResetPassword() {
  const history = useHistory();
  const [email, updateEmail] = useState('');
  const [emailSent, updateEmailSent] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const handleSubmit = () => {
    sendResetPassword();
  }
  const sendResetPassword = async () => {
    if (!email) {
      return setError('Enter a valid email');
    }
    setError('');
    try {
      let resp = await auth.sendPasswordResetEmail(email, {
        url: `${process.env.REACT_APP_BASEURL}/login`,
        handleCodeInApp: false
      });
      setMessage('Password reset email sent successfully!');
      updateEmailSent(true);
      updateEmail('');
    } catch (error) {
      return setError(error.message);
    }
  }
  return (
    <>
      <h3><span>Reset Password</span></h3>
      {message && <Alert type="success" message={message} />}
      {!emailSent &&
        <form className="rg-signin mb-3 mt-5 px-3">
          <p className="text-white">Enter your email address below to receive a password reset email.</p>
          {error && <Alert type="error" message={error} />}
          <InputText id="email" type="email" label="Email Address" placeholder="you@somewhere.com" handleChange={(value) => updateEmail(value)} value={email} isValid={true} required={true} />
          <Button className="btn-block mt-3 hover:shadow-md" icon="fas fa-envelope-open-text" handleOnClick={() => handleSubmit()}>Send Reset Password Email</Button>
          <Button icon="fas fa-arrow-left" className="btn-link light" handleOnClick={() => history.push('/login')}>Back to Sign In</Button>
        </form>
      }
      {emailSent &&
        <>
          <p className="text-white mt-5">Check your inbox for details on resetting your password.</p>
          <Button icon="fas fa-arrow-left" className="btn-block" handleOnClick={() => history.push('/login')}>Back to Sign In</Button>
        </>

      }

    </>
  )
}
