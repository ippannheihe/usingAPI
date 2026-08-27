//プレビューのちっちゃいあぴ
export async function PreviewAPI(fileId, token, responseView) {
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
        previewImage.appendChild(img);
    } catch (e) {
        responseView.textContent = 'エラー: ' + e.message;
    }
}

//げす
export async function guestLogin(jsonText, tokenKey, responseView) {

    const url = "https://api.networkprint.jp/nwpsapi/v2/loginforguest";
    const token = tokenKey.value.trim();
    const text = jsonText.value.trim();

    if (!text) {
        alert('送信する JSON を入力してください');
        return;
    }
    if (!token) {
        alert('AppKeyを入力してください');
        return;
    }
    try {
        const jsonData = JSON.parse(text);
        const res = await fetch(url, {
            method: 'POST', headers: {
                'Content-Type': 'application/json', 'X-NWPSAppKey': token, 'Accept': 'application/json'
            }, body: JSON.stringify(jsonData)
        });
        if (!res.ok) {
            const errText = await res.text();
            responseView.textContent = `HTTPエラー: ${res.status}\n\n` + errText;
        }
        const resJson = await res.json();
        responseView.textContent = JSON.stringify(resJson, null, 2);
        sessionStorage.setItem("token", resJson.token);
        sessionStorage.setItem("user_code", resJson.user_code);
        sessionStorage.setItem("appKey", token);
        console.log(sessionStorage.getItem("appKey"));
        window.location.href = "./fileRegister.html";
    } catch (e) {
        responseView.textContent = 'エラー: ' + e.message;
    }

}

//ファイルの一覧
export async function FilesAPI(token, responseView, requestURL) {
    const url = "https://api.networkprint.jp/nwpsapi/v2/files?";
    let filesUrl = "";

    const urlLimit = url + '';

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
        //変更
        //console.log(responseView.textContent = JSON.stringify(resJson, null, 2));
        sessionStorage.removeItem("fileList");
        sessionStorage.setItem("fileList", JSON.stringify(resJson));
        sessionStorage.removeItem("total");
        sessionStorage.setItem("total", JSON.stringify(resJson.total));
           console.log(sessionStorage.getItem("fileList"));
        console.log(sessionStorage.getItem("total"));
    } catch (e) {
        responseView.textContent = 'エラー: ' + e.message;
    }
}

//ふぁいる登録
export async function FileRegisterAPI(formData, token, responseView) {
    const url = "https://api.networkprint.jp/nwpsapi/v2/files/image";


    // multipart/form-data の中身を作る
    try {

        // fetchでPOST送信
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'X-NWPSToken': token, 'Accept': 'application/json'
            }, body: formData
        });

        if (!res.ok) {
            const errText = await res.text();
            responseView.textContent = `HTTPエラー: ${res.status}\n\n` + errText;
            return;
        }

        const resJson = await res.json();

        sessionStorage.removeItem("file_id");
        sessionStorage.setItem("file_id", JSON.stringify(resJson.file_id));
    } catch (e) {
        responseView.textContent = 'エラー: ' + e.message;
    }
}

//QRコード
export async function loginQRCodeAPI(token, responseView) {
    try {
        const conQRCode = document.getElementById('conQRCode');
        const resQR = await fetch("https://api.networkprint.jp/nwpsapi/v2/login/qrcode", {
            method: 'GET', headers: {
                'X-NWPSToken': token, 'Accept': 'image/jpeg'
            }
        });
        console.log("動く？");
        const resBlob = await resQR.blob();
        // console.log("結果a:", resBlob.text());
        //  document.getElementById('QRCode').src = URL.createObjectURL(resBlob);
        const img = document.createElement("img");
        img.src = URL.createObjectURL(resBlob);
        conQRCode.appendChild(img);
        console.log("疎通");
    } catch (e) {
        responseView.textContent = 'エラー: ' + e.message;
    }
}

export async function newsAPI(notice) {

    const url = "https://api.networkprint.jp/nwpsapi/v2/news/ja";

    try {
        const res = await fetch(url, {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            },
        });
        if (!res.ok) {
            const errText = await res.text();
            notice.textContent = `HTTPエラー: ${res.status}\n\n` + errText;
        }
        const resJson = await res.json();
        notice.textContent = JSON.stringify(resJson, null, 2);

    } catch (e) {
        notice.textContent = 'エラー: ' + e.message;
    }
}

export async function pageCheck(token, jsonText, appKey, responseView) {
    const url = 'https://api.networkprint.jp/nwpsparts/previewurl';
//const part = 'app_key"';
//let text = '{"' + part + ': '+ appKey+ '}';
    // const text = loleText.value.trim();
    const text = jsonText.value.trim();
    try {

        const jsonData = JSON.parse(text);
        //console.log(jsonData);
        const res = await fetch(url, {
            method: 'POST', headers: {
                'Content-Type': 'application/json', 'X-NWPSToken': token, 'Accept': 'application/json'
            }, body: JSON.stringify(jsonData)
        });
        if (!res.ok) {
            const errText = await res.text();
            responseView.textContent = `HTTPエラー: ${res.status}\n\n` + errText;
        }
        const resJson = await res.json();
        responseView.textContent = resJson.previewUrl.replace('"');
    } catch (e) {
        responseView.textContent = 'エラー: ' + e.message;
    }
}
