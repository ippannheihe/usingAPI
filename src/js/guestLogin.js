import {guestLogin} from "./srcParts.js";
import {jsonText, responseView, sendBtn, tokenKey,eCode,alertMessage} from "./tokenModule.js";
export const isAgree = document.getElementById('isAgree');
sessionStorage.setItem("result_code","Z001" );
isAgree.addEventListener('click', async () => {
 sendBtn.disabled = false;

});


sendBtn.addEventListener('click', async () => {
    let gLogin = await guestLogin(jsonText, tokenKey, responseView);
    console.log("これ", gLogin);
});
