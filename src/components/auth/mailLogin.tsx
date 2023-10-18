import { useState, FC, FormEvent } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { onLog } from "firebase/app";

export const MailLogin: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();

  const onLogin = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
        await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
        setError("⛔️ Invalid email or password"); 
      }
  }

  return (
    <form className="contentFlexVertical" onSubmit={onLogin}>
      {error && <p className="field error">{error}</p>}
      <label className="label">
        Email
        <input
          className="field"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="label">
        Password
        <input
          className="field"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit" className="button field">
        Sign in
      </button>
    </form>
  );
};
