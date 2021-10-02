import React, { Component } from "react";
import "./ControlViewStyles.less";
import { ButtonsComponent } from "./ControlComponents/ButtonsComponent";
import { MainComponent } from "./ControlComponents/MainComponent";
import { SettingsComponent } from "./ControlComponents/SettingsComponent";

export class ControlView extends Component<{}, {}> {
    render() {
        return (
            <div className="ControlView container">
                <ButtonsComponent></ButtonsComponent>
                <MainComponent></MainComponent>
                <SettingsComponent></SettingsComponent>
            </div>
        );
    }
}
