//プレビューのちっちゃいあぴ
export async function PreviewAPI(fileId,responseView,token,requestURL) {
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
