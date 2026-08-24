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

    for (const file of iFolders) {
        let i = 0;
        const formData = new FormData();

//コンソールで見たnameは合っているのに  NetworkでPayloadのFormData見ると余計なものついてた
       //  formData.append('file', file);
      //   formData.append('filename', file.name);
         const newFile = new File([file], file.name);

formData.append("file", newFile);

           console.log("がす",newFile);
//    formData.append('filename', imageFile.name);
  console.log("かず",file.name);  
    console.log("かず",iFolders[i]);  
        let fileRegister = await FileRegisterAPI(formData, token, responseView);
        console.log("これ", iFolders[[i]]);
        console.log("これ", file);
        i++;
    }
});
