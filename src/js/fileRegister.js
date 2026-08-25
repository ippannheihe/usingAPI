import {FileRegisterAPI, PreviewAPI} from "./srcParts.js";
import {FilesAPI} from "./srcParts.js";
import {token, sendBtn, responseView, fileList, requestURL,previewImage} from "./tokenModule.js";

const iFiles = document.getElementById('imageId');
let iFolders = document.getElementById('imageFolder');


sendBtn.addEventListener('click', async () => {
    console.log("これ", iFiles.files[0]);


    if (iFiles.files.length > 0) {
        //単体ジ
        let imageFile = iFiles.files[0];
        console.log("それ",imageFile);
        const formData = new FormData();
        formData.append('file', imageFile);
        let fileRegister = await FileRegisterAPI(formData, token, responseView);
        console.log("これ", imageFile);

        console.log("あれ", imageFile.name);
        const nameTag = document.createElement("li");
        nameTag.textContent = imageFile.name;

        previewImage.appendChild(nameTag);
         let fileId = sessionStorage.getItem("file_id");

        let image = await PreviewAPI(fileId, token, responseView);

        //ファイルの一覧として保存する
        let fileLists = await FilesAPI(token, responseView, requestURL);
        console.log("一覧でたか？", fileLists);
        //複数ジ
    } else if (iFolders.files.length > 0) {
console.log("ざす",iFolders.files.length );
        for (const file of iFolders.files) {
            const formData = new FormData();
//デフォルトのfilename属性が不適切なためフォーマットの正しいname属性の値を新しくfilename属性として入れなおす
            const newFile = new File([file], file.name);
            formData.append("file", newFile);
            console.log("がす", newFile);
            console.log("かず", file.name);
            console.log("きず", iFolders.files);
            let fileRegister = await FileRegisterAPI(formData, token, responseView);
            console.log("どす", fileRegister);
            //ファイルの一覧として保存する
            const nameTag = document.createElement("li");
            nameTag.textContent = file.name;
            previewImage.appendChild(nameTag);
            let fileId = sessionStorage.getItem('file_Id');
            console.log("いで",fileId);
            let image = await PreviewAPI(fileId, token, responseView);


            let fileLists = await FilesAPI(token, responseView, requestURL);
        }
    } else {
        alert("どちらにもファイルが入っていません");
        return;
    }


});
