const token = sessionStorage.getItem("token");
const secure = document.getElementById('secure');
const sendBtn = document.getElementById('sendBtn');
let responseView = document.getElementById('responseView');
let requestURL = document.getElementById('requestURL');
const previewImage = document.getElementById('previewImage');


const fileListData = JSON.parse(sessionStorage.getItem("fileList"));
const fileList = fileListData.file_list;
previewImage.innerHTML = "";
console.log(fileList);
sendBtn.addEventListener('click', async () => {

        if (!token) {
            alert('NWPSTokenを入力してください');
            return;
        }

        const url = "https://api.networkprint.jp/nwpsapi/v2/files/";
        const secureMode = secure.value.trim();
        let previewUrl = "";


        try {
//画像のプレビューを量産する
            for (const file of fileList) {
                console.log(fileList[0]);
                console.log(file.file_id);

                if (secureMode === "true" || secureMode === "false") {
                    const pre = '?secure_mode=' + secureMode;
                    previewUrl = url + file.file_id + '/previews' + pre;
                } else {
                    previewUrl = url + file.file_id + '/previews';
                }

                // fetchでGET送信
                const res = await fetch(previewUrl, {
                    method: 'GET',
                    headers: {
                        'X-NWPSToken': token,
                        //
                        'Accept': 'application/json'
                    }
                });

                if (!res.ok) {
                    const errText = await res.text();
                    console.log("まえージ", errText);
                    responseView.textContent =
                        `HTTPエラー: ${res.status}\n\n` + errText;
                    continue;
                }

                const resJson = await res.json();
                console.log("結果a:", resJson);
                requestURL.textContent = previewUrl;
                const ImageUrl = await resJson.preview_url;
                console.log("結果いめ:", ImageUrl);
                responseView.textContent = JSON.stringify(resJson, null, 2);

                //secure_modeがtrueの場合の処理
   //ほぼ確実にここがなんか悪さしてる
                const img = document.createElement("img");
                if (secureMode === "true") {
                    const resImage = await fetch(ImageUrl, {
                        method: 'GET',
                        headers: {
                            'X-NWPSToken': token,
                        }
                    });
                    console.log("なかージ", resImage);
                    if (!resImage.ok) {
                        const errText = await resImage.text();
                        console.log("とるージ", errText);
                        responseView.textContent =
                            `HTTPエラー: ${resImage.status}\n\n` + errText;
                        continue;
                    }

                    const ImageJson = await resImage.json();
                    console.log("結果a:", ImageJson);
                    requestURL.textContent = previewUrl;

                    const trueURL = await ImageJson.preview_url;
                    img.src = trueURL;
                    console.log("結果とる:", trueURL);
                } else {
                    img.src = ImageUrl;
                }
                previewImage.appendChild(img);

            }
        } catch
            (e) {
            responseView.textContent = 'エラー: ' + e.message;
        }
    }
)
;
