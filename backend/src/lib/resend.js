import { Resend } from "resend";
import {ENV} from './env.js'
export const resendClient=new Resend(ENV.RESEND_API_KEY);
// console.log("from resend.js");
// console.log(obj);
export const sender={
    email:ENV.EMAIL_FROM,
    name:ENV.EMAIL_FROM_NAME
}