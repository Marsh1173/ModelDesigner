import React, { Component } from "react";
import { ToggleButton } from "../../GenericComponents/ToggleButton/ToggleButton";
import { OptionsCache } from "../../../DataAccessors/OptionsCache";

export class SettingsComponent extends Component<{}, {}> {
    render() {
        return (
            <div className="SettingsComponent">
                <div className="toggleContainer">
                    <ToggleButton
                        onChangeFunc={(value) => {
                            OptionsCache.showJoints = value;
                        }}
                        startValue={OptionsCache.showJoints}
                    ></ToggleButton>
                    show joints
                </div>
                <div className="toggleContainer">
                    <ToggleButton
                        onChangeFunc={(value) => {
                            OptionsCache.showBones = value;
                        }}
                        startValue={OptionsCache.showBones}
                    ></ToggleButton>
                    show bones
                </div>
            </div>
        );
    }
}
