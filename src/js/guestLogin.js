import {guestLogin} from "./srcParts.js";
import {jsonText, responseView, sendBtn, tokenKey} from "./tokenModule.js";

sendBtn.addEventListener('click', async () => {

    let gLogin = await guestLogin(jsonText, tokenKey, responseView);
    console.log("これ", gLogin);
});
