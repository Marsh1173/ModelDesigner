import React, { Component, createElement } from "react";
import ReactDOM from "react-dom";
import { AnimationView } from "../View/AnimationView/AnimationView";
import { JointInfoView } from "../View/RigView/JointInfoView/JointInfoView";
import { AnimationInfoView } from "../View/RigView/AnimationInfoView/AnimationInfoView";
import { HierarchyView } from "../View/RigView/HierarchyView/HierarchyView";
import { MainCanvasView } from "../View/MainCanvas/MainCanvasView";
import { ControlView } from "../View/CanvasControls/ControlView";
import { ImportView } from "../View/Import-Export/Import/ImportView";
import { ExportView } from "../View/Import-Export/Export/ExportView";
import "./mainStyles.less";

let firstKey: number = 0;
export function getNextKey(): number {
    return firstKey++;
}

class MainDiv extends Component<{}, {}> {
    render() {
        return (
            <div className="MainDiv">
                <div className="animationContainer container">
                    <MainCanvasView></MainCanvasView>
                    <ControlView></ControlView>
                    <div className="importExportContainer container">
                        <ImportView></ImportView>
                        <ExportView></ExportView>
                    </div>
                </div>
                <div className="dataContainer container">
                    <div className="rigViewContainer container">
                        <div className="infoViewContainer container">
                            <JointInfoView></JointInfoView>
                            <AnimationInfoView></AnimationInfoView>
                        </div>
                        <HierarchyView></HierarchyView>
                    </div>
                    <AnimationView></AnimationView>
                </div>
            </div>
        );
    }
}

const domContainer = document.querySelector("#reactDom");
ReactDOM.render(createElement(MainDiv), domContainer);
