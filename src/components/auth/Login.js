import { useState } from "react";
import InputText from "../form/InputText";
export default function Login() {
  const [email, updateEmail] = useState();
  const [password, updatePassword] = useState();
  return (
    <div>
      <form>
        <InputText label="Email Address" placeholder="you@somewhere.com" handleChange={(e) => updateEmail(e.target.value)} value={email} isValid={true} />
        <InputText type="password" label="Password" placeholder="At least 6 characters" handleChange={(e) => updatePassword(e.target.value)} value={password} isValid={true} />
      </form>
    </div>
  )
}
