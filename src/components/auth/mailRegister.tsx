import { FC, useState, FormEvent } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useUserContext } from "../../userProvider";

export const MailRegister: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>(
    "Password must be at least 6 characters long."
  );
  const [emailError, setEmailError] = useState<string>(
    ""
  );

  const auth = getAuth();
  const [user, setUser] = useUserContext();

  const validatePassword = (value: string) => {
    if (value.length >= 6) {
      setPasswordError("");
      return true;
    } else {
      setPasswordError("⛔️ Password must be at least 6 characters long.");
      return false;
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(value)) {
      setEmailError("");
      return true;
    } else {
      setEmailError("⛔️ Enter a valid email address.");
      return false;
    }
  };

  const onRegister = async (event: FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    event.stopPropagation();

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const newUser = response.user;
    await updateProfile(newUser, { displayName: name });
    setUser(user);
    window.location.reload();
  };

  return (
    <form className="contentFlexVertical" onSubmit={onRegister}>
      <label className="label">
        Full Name
        <input
          className="field"
          type="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label className="label">
        Email
        <input
          className="field"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            validateEmail(event.target.value);
          }}
        />
        <div className="error field" hidden={emailError === ""}>{emailError}</div>
      </label>
      <label className="label">
        Password
        <input
          className="field"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            validatePassword(event.target.value);
          }}
        />
        <div className="error field" hidden={passwordError === ""}>
          {passwordError}
        </div>
      </label>

      <button
        type="submit"
        className="button field"
        disabled={passwordError !== "" || emailError !== ""}
      >
        Register
      </button>
    </form>
  );
};
