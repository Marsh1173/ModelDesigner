import React, { useState } from "react";
import "./ImportViewStyles.less";
import { ImportJson } from "./ImportJson/ImportJson";
import { ImportImages } from "./ImportImages/ImportImages";

export const ImportView: React.FC<{}> = () => {
    const [tabState, switchTab] = useState("image");

    return (
        <div className="ImportView container">
            <div className="importTabs">
                <div
                    onClick={() => {
                        switchTab("json");
                    }}
                    className={`importJsonTab ${tabState == "json" ? "selected" : ""}`}
                >
                    Import Json
                </div>
                <div
                    onClick={() => {
                        switchTab("image");
                    }}
                    className={`importImagesTab ${tabState == "image" ? "selected" : ""}`}
                >
                    Images
                </div>
            </div>
            {tabState == "json" && <ImportJson></ImportJson>}
            {tabState == "image" && <ImportImages></ImportImages>}
        </div>
    );
};
