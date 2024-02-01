import { sendFile } from "./postFile.js";

/*
  Gets the uploaded file name and changes the label to the file name
*/
function handleFileUpload(el) {
    $(document).on("change", el, function () {
        let fileName = $(this).val();
        let fileNameStart = fileName.lastIndexOf("\\");

        fileName = fileName.substr(fileNameStart + 1).substring(0, 20);

        if (fileName != "") {
            $(this)
                .closest(".fileUpload")
                .find(".upl")
                .html(fileName); /* changes the label text */
        }
    });
}

/**
 * appends a new file upload component when add new button is clicked
 */
function handleNewFileUpload() {
    $(".btn-new").on("click", function () {
        $("#uploader").append(
            '<div class="row uploadDoc"><div class="col-sm-3"><div class="docErr">Please upload valid file</div><!--error--><div class="fileUpload btn btn-orange"> <span class="upl" id="upload">Upload document</span><input type="file" class="upload input-upload" id="input-upload" onchange="validateFile(this);" /></div></div><div class="col-sm-8"><input type="text" class="form-control" name="" placeholder="Note"></div><div class="col-sm-1"><a class="cancel"><i class="fa fa-times"></i></a></div></div>'
        );
    });
}

/**
 * Submits form data to the chatbot server
 */
function handleSubmit() {
    $(".btn-next").on("click", function () {
        let length = 0;
        const formData = new FormData();
        $(".upl").each(function () {
            if (this.textContent !== "Upload document") {
                const target = $(this).siblings(".input-upload").prop("files")[0];
                formData.append("files", target);
                length++;
            }
        });
        if (length == 0) {
            toast(".docErr", "You have to upload at least one file", "error");
        } else {
            sendFile("/upload", formData).then(async (response) => {
                const data = await response.json();
                if (response.status === 200) {
                    toast(".serverValidationMsg", data.message, "success");
                    setTimeout(() => {
                        $("#one").hide();
                        $(".msg-box").show();
                    }, 2000);
                } else {
                    toast(".serverValidationMsg", data.err, "error");
                }
            });
        }
    });
}

/**
 * Deletes a file upload component when the cancel icon is clicked
 */
function removeFile() {
    $(document).on("click", "a.cancel", function () {
        if ($(".uploadDoc").length > 1) {
            $(this).closest(".uploadDoc").remove();
        } else {
            toast(".docErr", "You have to upload at least one file", "error");
        }
    });
}

function toast(element, message, type) {
    if (type === "error") {
        $(element)
            .text(message)
            .css("color", "red")
            .fadeIn("slow", function () {
                setTimeout(() => {
                    $(element).fadeOut("slow");
                }, 2000);
            });
    } else {
        $(element)
            .text(message)
            .css("color", "green")
            .fadeIn("slow", function () {
                setTimeout(() => {
                    $(element).fadeOut("slow");
                }, 1000);
            });
    }
}

export {
    handleFileUpload,
    handleNewFileUpload,
    handleSubmit,
    removeFile,
    toast,
};
