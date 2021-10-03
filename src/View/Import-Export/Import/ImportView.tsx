import React, { Component } from "react";
import "./ImportViewStyles.less";
import { ImportPresenter } from "../../../Presenter/ImportPresenter/ImportPresenter";

export class ImportView extends Component<{}, {}> {
    private importDataDiv: React.RefObject<HTMLTextAreaElement>;
    private importPhotoInputElem: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);

        this.importDataDiv = React.createRef();
        this.importPhotoInputElem = React.createRef();
    }
    render() {
        return (
            <div className="ImportView container">
                <div>
                    <input
                        ref={this.importPhotoInputElem}
                        className="importPhotoInput"
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={(e) => {
                            ImportPresenter.importPhoto(e);
                        }}
                    ></input>
                </div>
                <div className="buttonDiv">
                    <div>
                        <button
                            className="button"
                            onClick={() => {
                                ImportPresenter.processImportText(this.importDataDiv);
                            }}
                        >
                            Import Data
                        </button>
                        <button
                            className="importData button"
                            onClick={() => {
                                ImportPresenter.clearImportField(this.importDataDiv);
                            }}
                        >
                            Clear
                        </button>
                    </div>

                    <button
                        className="importPhotoButton button"
                        onClick={() => {
                            this.importPhotoInputElem.current?.click();
                        }}
                    >
                        Import Photo
                    </button>
                </div>

                <textarea className="importDataField" placeholder="Put in your formatted input data..." ref={this.importDataDiv}></textarea>
            </div>
        );
    }
}
