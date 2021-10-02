import React, { useState } from "react";
import "./ToggleButtonStyles.less";

export const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
    function toggle() {
        let tempToggled = !toggled;
        changeToggleState(tempToggled);
        props.onChangeFunc(tempToggled);
        console.log("its " + tempToggled);
    }

    const [toggled, changeToggleState] = useState(props.startValue);

    return (
        <div className={`ToggleButton ${toggled ? "toggled" : ""}`} onClick={toggle}>
            <div className="coverDiv"></div>
        </div>
    );
};

export interface ToggleButtonProps {
    startValue: boolean;
    onChangeFunc: (value: boolean) => void;
}
