import { FC } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import loginIcon from '../../images/google-icon.png';

export const GoogleAuth: FC = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const onLoginClick = () => {
        signInWithPopup(auth, provider);
    }

    return <button className="button" onClick={onLoginClick}>
        <img src={loginIcon} alt="logo" className="button-icon"/>
        Google Login</button>
}