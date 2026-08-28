import {loginQRCodeAPI} from "./srcParts.js";
import {token, responseView, userCode} from "./tokenModule.js";

const userNumber = document.getElementById('userNumber');
console.log(userCode);

document.getElementById("openModalBtn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "block";
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});


window.addEventListener('load', async () => {

    userNumber.textContent = userCode;
    let loginQR = await loginQRCodeAPI(token, responseView);
//const imgURL = URL.createObjectURL(loginQR);
});

