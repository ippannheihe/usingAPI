
import {newsAPI} from "./srcParts.js";
import {notice, responseView, sendBtn} from "./tokenModule.js";

sendBtn.addEventListener('click', async () => {

    let menu = await newsAPI(notice);

    console.log("これ", menu);
});




