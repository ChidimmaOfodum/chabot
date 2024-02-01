import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

function getTwilioClient() {
    return twilio(accountSid, authToken);
}

export { getTwilioClient };
