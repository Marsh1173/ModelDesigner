import React, { Component } from "react";
import "./ExportViewStyles.less";
import { ExportPresenter } from "../../../Presenter/ExportPresenter";

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
                        if (this.exportDataDiv.current) this.exportDataDiv.current.innerText = ExportPresenter.generateDummyExportData(500);
                    }}
                    className="button"
                >
                    Generate Export Data
                </button>
                <button
                    onClick={() => {
                        if (this.exportDataDiv.current) ExportPresenter.selectAllInElem(this.exportDataDiv.current);
                    }}
                    className="button"
                >
                    Select All
                </button>
                <button
                    onClick={() => {
                        if (this.exportDataDiv.current) ExportPresenter.clearElemText(this.exportDataDiv.current);
                    }}
                    className="button"
                >
                    Clear
                </button>
                <p className="exportData" ref={this.exportDataDiv}></p>
                <p>TODO:</p>
                <p>render on top of parent</p>
                <p>Animation view - rotation, base pos, imgRotation</p>
                <p>Animation view and canvas dragging/dropping</p>
                <p>Importing and exporting functionality</p>
            </div>
        );
    }
}
