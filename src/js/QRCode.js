import {loginQRCodeAPI} from "./srcParts.js";
import {token,responseView} from "./tokenModule.js";
const conQRCode = document.getElementById('conQRCode');

document.getElementById("QRSend").addEventListener('click', async () => {

    let loginQR = await loginQRCodeAPI(token,responseView);
//const imgURL = URL.createObjectURL(loginQR);
});
