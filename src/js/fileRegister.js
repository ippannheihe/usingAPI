import {FileRegisterAPI} from "./srcParts.js";
import {FilesAPI} from "./srcParts.js";
import {token, sendBtn, responseView,fileList,requestURL} from "./tokenModule.js";
const iFiles = document.getElementById('imageId');
let iFolders = document.getElementById('imageFolder');

console.log("これ", iFiles);

// 単数ファイル送信
sendBtn.addEventListener('click', async () => {
    const formData = new FormData();
    let imageFile = iFiles.files[0];
    formData.append('file', imageFile);
    let fileRegister = await FileRegisterAPI(formData, token, responseView);
    console.log("これ", imageFile);

    let fileLists = await FilesAPI (token,responseView,requestURL);
    console.log("一覧でたか？",fileLists);
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
        const formData = new FormData();

//コンソールで見たnameは合っているのに  NetworkでPayloadのFormData見ると余計なものついてた
       //  formData.append('file', file);
      //   formData.append('filename', file.name);
      //複数送ったときにfilenameにフォルダの名前が勝手につくので改めてnameを差し込んだ
         const newFile = new File([file], file.name);

formData.append("file", newFile);

           console.log("がす",newFile);
  console.log("かず",file.name);  
        let fileRegister = await FileRegisterAPI(formData, token, responseView);
        console.log("これ", file);
    }
    let fileLists = await FilesAPI (token,responseView,requestURL);
    console.log("一覧でたか？",fileLists);
});
console.log("どこ？",responseView);
document.getElementById("responseView").addEventListener('change',async () =>{
    if((responseView != まだレスポンスはありません)){
 let fileLists = await FilesAPI (token,responseView,'')
 console.log("一覧でたか？",fileLists) }
});