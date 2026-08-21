import{FilesAPI} from "./srcParts.js";
import {token,limit, sendBtn, responseView, requestURL} from "./tokenModule.js";

sendBtn.addEventListener('click', async () => {

    let  files = await FilesAPI(limit,token,responseView, requestURL);
    console.log("これ",files);
});
