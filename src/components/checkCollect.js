function collectAll() {
    const comp = document.querySelector("check-box");
    const count = comp.count;

    let list = [];

    for (let i = 0; i < count; i++) {
        const cb = comp.querySelector(`#cb${i}`);
        const txt = comp.querySelector(`#txt${i}`);

        if (cb.checked) {
            list.push(txt.value);
        }
    }

    // JSON文字列にする
    const jsonString = JSON.stringify({ items: list }, null, 2);

    // 別ファイルの関数に渡す
    handleJson(jsonString);

    return jsonString;
}
