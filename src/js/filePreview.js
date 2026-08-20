const token = sessionStorage.getItem("token");
const secure = document.getElementById('secure');
const sendBtn = document.getElementById('sendBtn');
const responseView = document.getElementById('responseView');
let requestURL = document.getElementById('requestURL');
const previewImage = document.getElementById('previewImage');


const fileList = JSON.parse(sessionStorage.getItem("fileList"));
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
                console.log(file.id, file.name);

                if (secureMode === "true" || secureMode === "false") {
                    const pre = '?secure_mode=' + secureMode;
                    previewUrl = url + fileList + '/previews' + pre;
                } else {
                    previewUrl = url + fileList + '/previews';
                }

                // fetchでGET送信
                const res = await fetch(previewUrl, {
                    method: 'GET',
                    headers: {
                        'X-NWPSToken': token,
                        'Accept': 'application/json'
                    }
                });

                if (!res.ok) {
                    const errText = await res.text();
                    responseView.textContent =
                        `HTTPエラー: ${res.status}\n\n` + errText;
                    continue;
                }

                const resJson = await res.json();
                console.log("API2 の結果:", resJson);
                requestURL.textContent = previewUrl;
                const ImageUrl = await resJson.preview_url;
                responseView.textContent = JSON.stringify(resJson, null, 2);
                //secure_modeがtrueの場合の処理
                const img = document.createElement("img");
                if (secureMode === "true") {
                    const resImage = await fetch(ImageUrl, {
                        method: 'GET',
                        headers: {
                            'X-NWPSToken': token,
                        }
                    });

                    const trueURL = await resImage.String;
                    img.src = trueURL;
                    previewImage.appendChild(img);
                } else
                    img.src = ImageUrl;
                previewImage.appendChild(img);

            }
        } catch
            (e) {
            responseView.textContent = 'エラー: ' + e.message;
        }
    }
)
;
