import {FileRegisterAPI} from "./srcParts.js";
import {token, sendBtn, responseView, requestURL} from "./tokenModule.js";
const iFiles = document.getElementById('imageId');
const iFolders = document.getElementById('imageFolder');
let selectedFiles = [];

console.log("これ", iFiles);

// 単数ファイル送信
sendBtn.addEventListener('click', async () => {
    const formData = new FormData();
    let imageFile = iFiles.files[0];
    formData.append('file', imageFile);
    let fileRegister = await FileRegisterAPI(formData, token, responseView);
    console.log("これ", fileRegister);
    console.log("これ", imageFile);
});

// 複数ファイル選択
document.getElementById('imageFolder').addEventListener("change", (e) => {
    selectedFiles = e.target.files;
    console.log("選択されたファイル数:", selectedFiles.length);
});

// 複数ファイル送信
document.getElementById("folderBtn").addEventListener('click', async () => {
    if (selectedFiles.length === 0) {
        console.log("ファイルが選択されていません");
        return;
    }



    for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);

        for (const [key, value] of formData.entries()) {
  console.log("FormData:", key, value);
}
        let fileRegister = await FileRegisterAPI(formData, token, responseView);
        console.log("これ", fileRegister);
        console.log("これ", file);
    }
});
