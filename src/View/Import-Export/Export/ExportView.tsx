import React, { Component } from "react";
import "./ExportViewStyles.less";

export class ExportView extends Component<{}, {}> {
    private exportDataDiv: React.RefObject<HTMLParagraphElement>;

    constructor(props: any) {
        super(props);

        this.exportDataDiv = React.createRef();
    }
    render() {
        return (
            <div className="ExportView container">
                <button
                    onClick={() => {
                        this.exportDataDiv.current!.innerText = this.makeid(500);
                    }}
                    className="button"
                >
                    Generate Export Data
                </button>
                <button
                    onClick={() => {
                        var doc = document,
                            sel,
                            range;
                        sel = window.getSelection();
                        range = doc.createRange();
                        range.selectNodeContents(this.exportDataDiv.current!);
                        sel?.removeAllRanges();
                        sel?.addRange(range);
                    }}
                    className="button"
                >
                    Select All
                </button>
                <button
                    onClick={() => {
                        this.exportDataDiv.current!.innerText = "";
                    }}
                    className="button"
                >
                    Clear
                </button>
                <p className="exportData" ref={this.exportDataDiv}></p>
            </div>
        );
    }

    private makeid(length: number): string {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789       ";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
