import {PreviewAPI} from "./srcParts.js";
import {token, sendBtn, responseView, requestURL} from "./tokenModule.js";
const fileId = sessionStorage.getItem("file_id");
const previewImage = document.getElementById('previewImage');

sendBtn.addEventListener('click', async () => {
    const img = document.createElement("img");
let  image = await PreviewAPI(fileId,token,responseView, requestURL);
console.log("これ",image);
});
