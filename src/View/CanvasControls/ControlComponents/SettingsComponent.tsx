import React, { Component } from "react";
import { ToggleButton } from "../../GenericComponents/ToggleButton/ToggleButton";
import { OptionsCache } from "../../../DataAccessors/OptionsCache";
import { CanvasControlsPresenter } from "../../../Presenter/CanvasControlsPresenter";

export class SettingsComponent extends Component<{}, {}> {
    render() {
        return (
            <div className="SettingsComponent">
                <div className="toggleContainer">
                    <ToggleButton onChangeFunc={CanvasControlsPresenter.updateShowJoints} startValue={OptionsCache.showJoints}></ToggleButton>
                    show joints
                </div>
                <div className="toggleContainer">
                    <ToggleButton onChangeFunc={CanvasControlsPresenter.updateShowBones} startValue={OptionsCache.showBones}></ToggleButton>
                    show bones
                </div>
            </div>
        );
    }
}
