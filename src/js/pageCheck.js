import {pageCheck,newsAPI} from "./srcParts.js";
import {notice,token, jsonText, appKey, responseView, sendBtn} from "./tokenModule.js";

window.addEventListener('load', async () => {
    let menu = await newsAPI(notice);
    console.log("これ", notice);
});

document.getElementById("openModalBtn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "block";
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

sendBtn.addEventListener('click', async () => {
    let kore = await pageCheck(token, jsonText, appKey, responseView);
});
