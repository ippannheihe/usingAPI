import {PreviewAPI} from "./srcParts.js";
import {token, sendBtn, responseView, fileListData} from "./tokenModule.js";

const previewImage = document.getElementById('previewImage');

const fileList = fileListData.file_list;
previewImage.innerHTML = "";
console.log(fileList);
sendBtn.addEventListener('click', async () => {

//secure_modeは問答無用でtrueにする
    const url = "https://api.networkprint.jp/nwpsapi/v2/files/";
    let previewUrl = "";

//画像のプレビューを量産する
    for (const file of fileList) {
        console.log(fileList[0]);
        console.log(file.file_id);
        let fileId = file.file_id;
        let preview = await PreviewAPI(fileId, token, responseView);
    }
});
