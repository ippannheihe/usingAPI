import {FilesAPI} from "./srcParts.js";
import {responseView, sendBtn, token} from "./tokenModule.js";

sendBtn.addEventListener('click', async () => {

    let files = await FilesAPI(token, responseView);
    console.log("これ", files);
});
