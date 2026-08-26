import {pageCheck} from "./srcParts.js";
import {token,jsonText,appKey,responseView,sendBtn} from "./tokenModule.js";

console.log(appKey);
sendBtn.addEventListener('click', async () => {
    let kore = await pageCheck(token,jsonText,appKey,responseView);
});
