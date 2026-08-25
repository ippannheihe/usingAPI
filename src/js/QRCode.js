import {loginQRCodeAPI} from "./srcParts.js";
import {token,responseView} from "./tokenModule.js";
const conQRCode = document.getElementById('conQRCode');

window.addEventListener('load', async () => {

    let loginQR = await loginQRCodeAPI(token,responseView);
//const imgURL = URL.createObjectURL(loginQR);
});
conQRCode.addEventListener('click', async () => {

    let loginQR = await loginQRCodeAPI(token,responseView);
    img.classList.toggle("hide");
//const imgURL = URL.createObjectURL(loginQR);
});
