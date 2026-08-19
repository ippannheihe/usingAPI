    const apiUrlInput = document.getElementById('apiUrl');
    const tokenKey = document.getElementById('tokenKey');
    const jsonText = document.getElementById('jsonText');
    const sendBtn = document.getElementById('sendBtn');
    const responseView = document.getElementById('responseView');

    sendBtn.addEventListener('click', async () => {
    const url = apiUrlInput.value.trim();
    const token = tokenKey.value.trim();
    const text = jsonText.value.trim();

    if (!url) {
    alert('API URL を入力してください');
    return;
}
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-NWPSAppKey': token,
                'Accept': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        if (!res.ok) {
            const errText = await res.text();
            responseView.textContent =
                `HTTPエラー: ${res.status}\n\n` + errText;
        }
        const resJson = await res.json();
        responseView.textContent = JSON.stringify(resJson, null, 2);

} catch (e) {
    responseView.textContent = 'エラー: ' + e.message;
}
});

