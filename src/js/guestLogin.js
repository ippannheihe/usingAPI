import{guestLogin} from "./srcParts.js";
import {jsonText,tokenKey, sendBtn, responseView} from "./tokenModule.js";

sendBtn.addEventListener('click', async () => {

    let  gLogin = await guestLogin(jsonText,tokenKey,responseView);
    console.log("これ",gLogin);
});