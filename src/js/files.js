const secure = document.getElementById('secure');
const token = sessionStorage.getItem("token");
const limitNum = document.getElementById('limit');
const sendBtn = document.getElementById('sendBtn');
const responseView = document.getElementById('responseView');
let requestURL = document.getElementById('requestURL');

sendBtn.addEventListener('click', async () => {

        const url = "https://api.networkprint.jp/nwpsapi/v2/files?file_type=ALL&offset=0";
        const limit = limitNum.value.trim();
        const secureMode = secure.value.trim();
        let filesUrl = "";

        if (!token) {
            alert('NWPSTokenを入力してください');
            return;
        }
        if (limit < 1) {
            alert('1以上の値を指定してください');
            return;
        }
        const urlLimit = url + "&limit=" + limit;

        if (secureMode === "true" || secureMode === "false") {
            filesUrl = urlLimit + '&secure_mode=' + secureMode;
        } else {
            filesUrl = urlLimit;
        }
        try {

            // fetchでGET送信
            console.log(filesUrl);
            const res = await fetch(filesUrl, {
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
                return;
            }

            const resJson = await res.json();
            requestURL.textContent = filesUrl;
            responseView.textContent = JSON.stringify(resJson, null, 2);
            sessionStorage.setItem("fileList", JSON.stringify(resJson));

            console.log(sessionStorage.getItem("fileList"));
        } catch
            (e) {
            responseView.textContent = 'エラー: ' + e.message;
        }
    }
)
;
