import { handleFileUpload, handleNewFileUpload, handleSubmit, removeFile } from "./eventHandlers.js";
import { handleSmsButtonClick } from "./sendMessageHandlers.js";

$(function () {
  handleFileUpload(".input-upload");
  handleNewFileUpload()
  handleSubmit()
  removeFile()
  handleSmsButtonClick()
});
