import {guestLogin} from "./srcParts.js";
import {jsonText, responseView, sendBtn, tokenKey} from "./tokenModule.js";
export const isAgree = document.getElementById('isAgree');

isAgree.addEventListener('click', async () => {
 sendBtn.disabled = false;

});


sendBtn.addEventListener('click', async () => {
    let gLogin = await guestLogin(jsonText, tokenKey, responseView);
    console.log("これ", gLogin);
});
