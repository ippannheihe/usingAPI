//プレビューのちっちゃいあぴ
export async function PreviewAPI(fileId, token, responseView) {
    let previewUrl = "";

    console.log("ぷれび", previewUrl);

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
        const err = await res.json();
        const resultCode = err.result_code;
        console.log("これ", resultCode);
        if (resultCode === "M001") {
            window.location.href = "../../public/menu.html";
            return;
        }
        await Message(resultCode, responseView);
        document.getElementById("error").style.display = "block";
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

}

//げす
export async function guestLogin(jsonText, tokenKey, responseView) {

    const url = "https://api.networkprint.jp/nwpsapi/v2/loginforguest";
    const token = tokenKey.value.trim();
    const text = jsonText.value.trim();

    const jsonData = JSON.parse(text);
    const res = await fetch(url, {
        method: 'POST', headers: {
            'Content-Type': 'application/json', 'X-NWPSAppKey': token, 'Accept': 'application/json'
        }, body: JSON.stringify(jsonData)
    });

    if (!res.ok) {
        const err = await res.json();
        const resultCode = err.result_code;
        console.log("これ", resultCode);
        if (resultCode === "M001") {
            window.location.href = "../../public/menu.html";
            return;
        }
        await Message(resultCode, responseView);
        document.getElementById("error").style.display = "block";
        return;
    }

    const resJson = await res.json();
    responseView.textContent = JSON.stringify(resJson, null, 2);
    sessionStorage.setItem("token", resJson.token);
    sessionStorage.setItem("user_code", resJson.user_code);
    sessionStorage.setItem("appKey", token);
    console.log(sessionStorage.getItem("appKey"));
    window.location.href = "./fileRegister.html";

}

//ファイルの一覧
export async function FilesAPI(token, responseView, requestURL) {
    const url = "https://api.networkprint.jp/nwpsapi/v2/files?";
    let filesUrl = "";

    const urlLimit = url + '';

    filesUrl = urlLimit + '&secure_mode=true';


    // fetchでGET送信
    console.log(filesUrl);
    const res = await fetch(filesUrl, {
        method: 'GET', headers: {
            'X-NWPSToken': token, 'Accept': 'application/json'
        }
    });

    if (!res.ok) {
        const err = await res.json();
        const resultCode = err.result_code;
        console.log("これ", resultCode);
        if (resultCode === "M001") {
            window.location.href = "../../public/menu.html";
            return;
        }
        await Message(resultCode, responseView);
        document.getElementById("error").style.display = "block";
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
}

//ふぁいる登録
export async function FileRegisterAPI(formData, token, responseView) {

    const url = "https://api.networkprint.jp/nwpsapi/v2/files/image";

    // multipart/form-data の中身を作る
    // fetchでPOST送信
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'X-NWPSToken': token, 'Accept': 'application/json'
        }, body: formData
    });

    if (!res.ok) {
        const err = await res.json();
        const resultCode = err.result_code;
        console.log("これ", resultCode);
        if (resultCode === "M001") {
            window.location.href = "../../public/menu.html";
            return;
        }
        await Message(resultCode, responseView);
        document.getElementById("error").style.display = "block";
        return;
    }

    const resJson = await res.json();

    sessionStorage.removeItem("file_id");
    sessionStorage.setItem("file_id", JSON.stringify(resJson.file_id));
}

//QRコード
export async function loginQRCodeAPI(token, responseView) {

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
}

//メッセージ
export async function Message(resultCode, responseView) {
    const url = "https://api.networkprint.jp/nwpsapi/v2/message/";
    let messageUrl = url + resultCode;

    const res = await fetch(messageUrl, {
        method: 'GET', headers: {
            'Accept': 'application/json'
        },
    });

    if (!res.ok) {
        const errText = await res.text();
        responseView.textContent = `HTTPエラー: ${res.status}\n\n` + errText;
    }
    const resJson = await res.json();
    responseView.textContent = resJson.ja_jp;

}
