import {loginQRCodeAPI} from "./srcParts.js";
import {token,responseView,userCode} from "./tokenModule.js";
const conQRCode = document.getElementById('conQRCode');
const userNumber = document.getElementById('userNumber');
console.log(userCode);
window.addEventListener('load', async () => {

    userNumber.textContent = userCode;
    let loginQR = await loginQRCodeAPI(token,responseView);
//const imgURL = URL.createObjectURL(loginQR);
});

