import {FileRegisterAPI} from "./srcParts.js";
import {token, sendBtn, responseView, requestURL} from "./tokenModule.js";
const iFiles = document.getElementById('imageId');
let iFolders = document.getElementById('imageFolder');
let selectedFiles = [];

console.log("これ", iFiles);

// 単数ファイル送信
sendBtn.addEventListener('click', async () => {
    const formData = new FormData();
    let imageFile = iFiles.files[0];
    formData.append('file', imageFile);
    //formData.append('filename', imageFile.name);
    let fileRegister = await FileRegisterAPI(formData, token, responseView);
    console.log("これ", imageFile);
});

// 複数ファイル選択
document.getElementById('imageFolder').addEventListener("change", (e) => {
   iFolders = e.target.files;

    console.log("選択されたファイル数:", iFolders.length);
    console.log("選択されたファイル数:", e.target.files);
});

// 複数ファイル送信
document.getElementById("folderBtn").addEventListener('click', async () => {
    if (iFolders.length === 0) {
        console.log("ファイルが選択されていません");
        return;
    }
//  4項目目を消したい
let fileInfo = {
  name: iFolders.name,
  lastModified: iFolders.lastModified,
  lastModifiedDate: iFolders.lastModifiedDate,
  size: iFolders.size,
  type: iFolders.type
  // webkitRelativePath は入れない
};

    for (const file of fileInfo) {
        let i = 0;
        const formData = new FormData();


         formData.append('file', file);
//    formData.append('filename', imageFile.name);
  console.log("かず",iFolders);  
    console.log("かず",iFolders[i]);  
        let fileRegister = await FileRegisterAPI(formData, token, responseView);
        console.log("これ", iFolders[[i]]);
        console.log("これ", file);
        i++;
    }
});
