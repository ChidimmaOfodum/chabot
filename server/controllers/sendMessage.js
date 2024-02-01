import { getTwilioClient } from "../lib/twilio.js";
import { Lead } from "../models/ContactList.js";

//sends messages using twilio api
function sendMessage(req, res) {
    const client = getTwilioClient();
    const message = req.body.message || "";

    Promise.all(
        Lead.allLeads.map((lead) => {
            return client.messages.create({
                to: lead.cellphone,
                from: process.env.MESSAGING_SERVICE_SID,
                body: `Hello ${lead.name} from ${lead.country} ${message}`,
            });
        })
    )
        .then((messages) => {
            console.log("Successfully sent an initial message");
            res.status(200).json({ message: "Messages sent successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({
                err: "Bad request. Please ensure numbers are valid",
            });
        });
}

export { sendMessage };
