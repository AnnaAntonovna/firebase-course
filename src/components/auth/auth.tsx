import { FC } from "react";
import { GoogleAuth } from "./googleAuth";
import { MailRegister } from "./mailRegister";
import { MailLogin } from "./mailLogin";

 export const Auth: FC = () => {
    return(<div className="contentGrid">
        <div><GoogleAuth /></div>
        <div><MailRegister /></div>
        <div><MailLogin/></div>
    </div>)
 }