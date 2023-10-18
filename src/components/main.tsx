import { FC, useEffect } from "react";
import { Auth } from "./auth/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserContext } from "../userProvider";
import { User } from "./user/user";

export const Main: FC = () => {
    const auth = getAuth();
    const [user, setUser] = useUserContext();

    useEffect(() => {
        onAuthStateChanged(auth, (firebaseUser) => {
            if(firebaseUser){
                setUser({...firebaseUser})
            } else {
                setUser(null);
            }
        })
    }, [])    

    return (
        <div className="centerContainer">
            { Boolean(user) ? <User/> : <Auth />}
        </div>);
}