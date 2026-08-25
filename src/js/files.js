import {FilesAPI} from "./srcParts.js";
import {responseView, sendBtn, token,requestURL} from "./tokenModule.js";

sendBtn.addEventListener('click', async () => {

    let files = await FilesAPI(token, responseView, requestURL);
    console.log("これ", files);
});
