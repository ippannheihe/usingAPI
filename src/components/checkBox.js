//余裕出来たらここの'+i+'のところを"${i}"にする（そのために'と"入れ替える必要がある）
class CheckBox extends HTMLElement {
    connectedCallback() {
        console.log("connectedCallback が呼ばれた");
        const count = Number(this.getAttribute("count"));
        const itemsAttr = this.getAttribute("items");
        const items = itemsAttr.split(",");
        let html = "";
        for (let i = 0; i < count; i++) {
            html += '<div class="item"><label><input type="checkbox"  class="cb" data-index="' + i + '" id="' + items[i] + '" value=' + i + 'data-index="${i}"}>' + items[i] +
                '</label><input class="txt" data-index="' + i + '" id="' + items[i] + '" value="">  </div><li>';
        }
        this.innerHTML = html;
        //生成
        const checkboxes = this.querySelectorAll(".cb");
        //読みやすさのため残す
        const textareas = this.querySelectorAll(".txt");

        for (let i = 0; i < this.count; i++) {
            const cb = this.querySelector(`#cb${i}`);
            const txt = this.querySelector(`#txt${i}`);

            cb.addEventListener("change", () => {
                txt.disabled = !cb.checked;
            });
        }
    }
}

customElements.define("check-box", CheckBox);
