//refer this link -> https://codeforgeek.com/send-e-mail-node-js/

//installed packages
import nodeMailJet from "node-mailjet";

import { hereIsError } from "../index";

const mailjet = nodeMailJet.connect(process.env.EMAIL_API_KEY || "", 
    process.env.EMAIL_SECRET_KEY || "");


/**
 * @description => send email
 * 
 * @param name 
 * @param email 
 * @param subject 
 * @param textContent 
 * @param htmlContent 
 */
export const sendEmail = async (name:string, email:string, subject:string, 
    textContent:string, htmlContent:string)=>{

    try{
        const request =  mailjet.post("send", {'version': 'v3.3'})
            .request({ "Messages": [
                {
                "From": {
                    "Email": process.env.NO_REPLAY_EMAIL,
                    "Name": "Aptitiude App"
                },
                "To": [
                    {
                        "Email": email,
                        "Name": name
                    }
                ],
                "Subject": subject,
                "TextPart": textContent,
                "HTMLPart": htmlContent,
                }
            ]
        });

        //sending email 
        request.then((result:any) => {
            console.log(result);
        });
    }catch(error){
        hereIsError(error, "sendEmail");
    }
}

/**
 * @description => function will call to send email to verify email
 * 
 * @param email 
 * @param otpCode 
 */
export const sendOTPEmail = async (email:string, otpCode:string) =>{
    //generating email content for email verification and send email to user
    //sending response of email send to the user for email verification
    const htmlContent = `<html><body>
        Hey Admin,
		<br>
		<br>
		Your OTP for Aptitiude Web Admin Panel is ${otpCode}.
		<br>
		<p><i>Please don't share this OTP with anyone else.</i></p>
        <br>
        <h3><b>Jai Jinder</b></h3>
        <br>
        <h3><b>Team Aptitiude Web App</b></h3>
        </body>
        </html>`;

    const textContent = `Hey Admin,
    \n
    Your OTP for Aptitiude Web Admin Panel is ${otpCode}.
    \n
    Please don't share this OTP with anyone else.
    \n
    Jai Jinder
    \n
    Team Aptitiude Web App`;

	const subject = "OTP Verification";	
	await sendEmail("Admin", email, subject, textContent, htmlContent);
}
