//プレビューのちっちゃいあぴ
export async function PreviewAPI(fileId,token,responseView,requestURL) {
    let previewUrl = "";

    console.log("ぷれび", previewUrl);
    try {
        previewUrl = "https://api.networkprint.jp/nwpsapi/v2/files/" + fileId + '/previews?secure_mode=true';
        console.log("ぷれび", previewUrl);
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
            console.log("まえージ", errText);
            responseView.textContent =
                `HTTPエラー: ${res.status}\n\n` + errText;
            return;
        }

        const resJson = await res.json();
        console.log("結果a:", resJson);
        requestURL.textContent = previewUrl;
        const ImageUrl = await resJson.preview_url;
        console.log("結果いめ:", ImageUrl);
        //secure_modeがtrueの場合の処理
        const resImage = await fetch(ImageUrl, {
            method: 'GET',
            headers: {
                'X-NWPSToken': token,
            }
        });
        console.log("なかージ", resImage);

        const ImageBlob = await resImage.blob();
        console.log("結果a:", ImageBlob.text());
            const img = document.createElement("img");
            img.src = URL.createObjectURL(ImageBlob);
            requestURL.textContent = previewUrl;
            previewImage.appendChild(img);
    } catch (e) {
        responseView.textContent = 'エラー: ' + e.message;
    }
}
//げす
//ファイルの一覧
export async function FilesAPI (limit,token,responseView,requestURL) {
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
}

//ふぁいる登録
export async function FileRegisterAPI(iFiles,token,responseView,limit) {
    const url = "https://api.networkprint.jp/nwpsapi/v2/files/image";
    const imageFile = iFiles.files[0];
    let count = limit;

    // multipart/form-data の中身を作る
    const formData = new FormData();
    formData.append('file', imageFile);

    try {

        // fetchでPOST送信
        const res = await fetch(url, {
            method: 'POST', headers: {
                'X-NWPSToken': token, 'Accept': 'application/json',
            }, body: formData
        });

        if (!res.ok) {
            const errText = await res.text();
            responseView.textContent = `HTTPエラー: ${res.status}\n\n` + errText;
            return;
        }

        const resJson = await res.json();
        responseView.textContent = JSON.stringify(resJson, null, 2);
        sessionStorage.setItem("file_id", resJson.file_id);
        console.log(typeof count, count);
        count++;
        sessionStorage.removeItem('limit');
        sessionStorage.setItem('limit', String(count));
        console.log("これかう" + sessionStorage.getItem('limit'));
    } catch (e) {
        responseView.textContent = 'エラー: ' + e.message;
    }
}
