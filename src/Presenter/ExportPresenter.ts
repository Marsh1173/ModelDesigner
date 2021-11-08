export class ExportPresenter {
    public static selectAllInElem(elem: HTMLParagraphElement) {
        var doc = document,
            sel,
            range;
        sel = window.getSelection();
        range = doc.createRange();
        range.selectNodeContents(elem);
        sel?.removeAllRanges();
        sel?.addRange(range);
    }

    public static generateDummyExportData(len: number = 100): string {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789       ";
        var charactersLength = characters.length;
        for (var i = 0; i < len; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static clearElemText(elem: HTMLParagraphElement) {
        elem.innerText = "";
    }
}
