sendBtn.addEventListener('click', async () => {

    const url = "https://api.networkprint.jp/nwpsapi/v2/files?file_type=ALL&offset=0";
    let filesUrl = "";

    if (limit < 1) {
        alert('1以上の値を指定してください');
        return;
    }
    const urlLimit = url + "&limit=" + limit;

    filesUrl = urlLimit + '&secure_mode=true';

    try {

        // fetchでGET送信
        console.log(filesUrl);
        const res = await fetch(filesUrl, {
            method: 'GET', headers: {
                'X-NWPSToken': token, 'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            const errText = await res.text();
            responseView.textContent = `HTTPエラー: ${res.status}\n\n` + errText;
            return;
        }

        const resJson = await res.json();
        requestURL.textContent = filesUrl;
        responseView.textContent = JSON.stringify(resJson, null, 2);
        sessionStorage.removeItem("fileList");
        sessionStorage.setItem("fileList", JSON.stringify(resJson));

        console.log(sessionStorage.getItem("fileList"));
    } catch (e) {
        responseView.textContent = 'エラー: ' + e.message;
    }
});
