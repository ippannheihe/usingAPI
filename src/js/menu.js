
import {newsAPI} from "./srcParts.js";
import {responseView, sendBtn} from "./tokenModule.js";

sendBtn.addEventListener('click', async () => {

    let menu = await newsAPI(responseView);
    console.log("これ", menu);
});




