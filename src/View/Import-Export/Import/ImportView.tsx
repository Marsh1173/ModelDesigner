import React, { Component } from "react";
import "./ImportViewStyles.less";

export class ImportView extends Component<{}, {}> {
    private importDataDiv: React.RefObject<HTMLTextAreaElement>;

    constructor(props: any) {
        super(props);

        this.importDataDiv = React.createRef();
    }
    render() {
        return (
            <div className="ImportView container">
                <div>
                    <button
                        className="button"
                        onClick={() => {
                            alert("You imported!");
                        }}
                    >
                        Import Data
                    </button>
                    <button
                        className="importData button"
                        onClick={() => {
                            this.importDataDiv.current!.value = "";
                        }}
                    >
                        Clear
                    </button>
                </div>

                <textarea className="importDataField" placeholder="Put in your formatted input data..." ref={this.importDataDiv}></textarea>
            </div>
        );
    }
}
