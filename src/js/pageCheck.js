import {pageCheck} from "./srcParts.js";
import {sendBtn,jsonText,responseView} from "./tokenModule.js";

sendBtn.addEventListener('click', async () => {
    let kore = await pageCheck(jsonText,responseView);
    console.log("これ", kore);
});
