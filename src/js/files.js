import {FilesAPI,PreviewAPI} from "./srcParts.js";
import {responseView, sendBtn, token,requestURL,fileListData,previewImage,totalFile} from "./tokenModule.js";

window.addEventListener('load', async () => {

    let files = await FilesAPI(token, responseView, requestURL);


    const fileList = fileListData.file_list;
    responseView.textContent = "ファイルの個数は"+totalFile+"個";
    console.log(fileList);
        for (const file of fileList) {

            console.log("な",file.create_date);
            console.log("な",file.delete_date);
            console.log(file.file_id);

            const nameTag = document.createElement("li");
            const fullTime =  document.createElement("li");
            const raw = file.delete_date;
            const date = new Date(raw);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, "0");
            const d = String(date.getDate()).padStart(2, "0");
            const onlyDate = `${y}-${m}-${d}`;
            const hour = date.getHours();
            const around = `${hour + 1}時ごろ`;
            nameTag.textContent = file.original_filename;
            fullTime.textContent = onlyDate+" の"+ around +"まで印刷可能";
            previewImage.appendChild(nameTag);
            previewImage.appendChild(fullTime);

            let fileId = file.file_id;
            let preview = await PreviewAPI(fileId, token, responseView);


        }
});
