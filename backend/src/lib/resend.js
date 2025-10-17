import { Resend } from "resend";
import {ENV} from './env.js'
const requiredVars = ['RESEND_API_KEY', 'EMAIL_FROM', 'EMAIL_FROM_NAME'];
const missingVars = requiredVars.filter(varName => !ENV[varName]);
if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(' , ')}`);
}
export const resendClient=new Resend(ENV.RESEND_API_KEY);
// console.log("from resend.js");
// console.log(obj);
export const sender={
    email:ENV.EMAIL_FROM,
    name:ENV.EMAIL_FROM_NAME
}