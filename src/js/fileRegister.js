//const tokenKey = document.getElementById('tokenKey');
const token = sessionStorage.getItem("token");
const iFiles = document.getElementById('imageId');
const sendBtn = document.getElementById('sendBtn');
const responseView = document.getElementById('responseView');

sendBtn.addEventListener('click', async () => {
    const url = "https://api.networkprint.jp/nwpsapi/v2/files/image";
    const imageFile = iFiles.files[0];

    if (!iFiles.files.length) {
        alert('画像ファイルを選択してください');
        return;
    }
    // multipart/form-data の中身を作る
    const formData = new FormData();
    formData.append('file', imageFile);

    try {

        // fetchでPOST送信
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'X-NWPSToken': token,
                'Accept': 'application/json',
            },
            body: formData
        });

        if (!res.ok) {
            const errText = await res.text();
            responseView.textContent =
                `HTTPエラー: ${res.status}\n\n` + errText;
            return;
        }

        const resJson = await res.json();
        responseView.textContent = JSON.stringify(resJson, null, 2);
        sessionStorage.setItem("file_id", resJson.file_id);
    } catch (e) {
        responseView.textContent = 'エラー: ' + e.message;
    }
});
