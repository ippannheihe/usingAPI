import {PreviewAPI} from "./srcParts.js";
import {token, sendBtn, responseView, fileListData,previewImage} from "./tokenModule.js";


const fileList = fileListData.file_list;
previewImage.innerHTML = "";
console.log(fileList);
sendBtn.addEventListener('click', async () => {

//画像のプレビューを量産する
    for (const file of fileList) {
        console.log(fileList[0]);
        console.log(file.file_id);
        let fileId = file.file_id;
        let preview = await PreviewAPI(fileId, token, responseView,previewImage);
    }
});
