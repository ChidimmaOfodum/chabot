import { toast } from "./eventHandlers.js";
import { sendFile } from "./postFile.js";

export async function handleSmsButtonClick() {
    const formData = { message: "" };
    $("#sendsms").on("click", function () {
        const message = $("#smsfield").val();

        formData.message = message;

        $(".btn-tertiary").show();
        sendFile("/message", formData).then(async (response) => {
            const data = await response.json();
            $(".btn-tertiary").hide();
            if (response.status === 200) {
                toast(".smsError", data.message, "success");
            } else {
                toast(".smsError", data.err, "error");
            }
        });
    });
}
