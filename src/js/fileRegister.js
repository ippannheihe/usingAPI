import {FileRegisterAPI} from "./srcParts.js";
import {token, sendBtn, responseView, requestURL,limit} from "./tokenModule.js";
const iFiles = document.getElementById('imageId');
console.log("これ",iFiles);
sendBtn.addEventListener('click', async () => {
    let  fileRegister = await FileRegisterAPI(iFiles,token,responseView, requestURL,limit);
    console.log("これ",fileRegister);
});
