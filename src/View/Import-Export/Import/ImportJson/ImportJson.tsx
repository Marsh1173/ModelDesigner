import React from "react";
import { ImportPresenter } from "../../../../Presenter/ImportPresenter";
import "./ImportJsonStyles.less";

export const ImportJson: React.FC<{}> = () => {
    let importDataDiv: React.RefObject<HTMLTextAreaElement> = React.createRef();

    return (
        <div className="ImportJson">
            <div>
                <button
                    className="button"
                    onClick={() => {
                        ImportPresenter.processImportText(importDataDiv);
                    }}
                >
                    Import Json
                </button>
                <button
                    className="importData button"
                    onClick={() => {
                        ImportPresenter.clearImportField(importDataDiv);
                    }}
                >
                    Clear
                </button>
            </div>
            <textarea className="importDataField" placeholder="Put in your formatted input data..." ref={importDataDiv}></textarea>
        </div>
    );
};
