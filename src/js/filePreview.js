const apiUrlInput = document.getElementById('apiUrl');
const tokenKey = document.getElementById('tokenKey');
const fileNum = document.getElementById('fileId');
const secure = document.getElementById('secure');
const sendBtn = document.getElementById('sendBtn');
const responseView = document.getElementById('responseView');
let requestURL = document.getElementById('requestURL');
let previewImage = document.getElementById('previewImage');


sendBtn.addEventListener('click', async () => {
    const url = apiUrlInput.value.trim();
    const token = tokenKey.value.trim();
    const fileId = fileNum.value.trim();
    const secureMode = secure.value.trim();
    let pre = "";

    if (!url) {
        alert('API URL を入力してください');
        return;
    }
    if (!token) {
        alert('NWPSTokenを入力してください');
        return;
    }
    if (!fileId) {
        alert('fileIdを入力してください');
        return;
    }
    if (secureMode === "true" || secureMode === "false") {
        pre = '?secure_mode=' + secureMode;

    }
    const previewUrl = url + fileId + '/previews' + pre;
    try {

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
            return;
        }

        const resJson = await res.json();
        requestURL.textContent = previewUrl;
        const ImageUrl = await resJson.preview_url;
        responseView.textContent = JSON.stringify(resJson, null, 2);
        //secure_modeがtrueの場合の処理
        if (secureMode==="true") {
            const resImage = await fetch(ImageUrl, {
                method: 'GET',
                headers: {
                    'X-NWPSToken': token,
                }
            });
            const trueURL = await resImage.formData();
            document.getElementById('previewImage').src = trueURL;
        }else
            document.getElementById('previewImage').src = ImageUrl;

        }
    catch
        (e)
        {
            responseView.textContent = 'エラー: ' + e.message;
        }
    }
)
    ;
