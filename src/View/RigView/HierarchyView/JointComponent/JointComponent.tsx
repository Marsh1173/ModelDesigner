import React from "react";
import { JointsCache } from "../../../../DataAccessors/JointsCache";
import { getNextKey } from "../../../../ts/main";
import "./JointComponentStyles.less";

export const JointComponent: React.FC<JointComponentProp> = (props) => {
    let divDivs: JSX.Element[] = [];
    for (let i: number = 0; i < props.depth; i++) {
        divDivs.push(<div className="divisionDiv" key={getNextKey()}></div>);
    }

    return (
        <div className="JointComponent">
            {divDivs}
            <p
                className={`jointText ${JointsCache.selectedJoint && props.name == JointsCache.selectedJoint.name ? "selected" : ""}`}
                onClick={() => {
                    JointsCache.selectedJoint = JointsCache.getJointByName(props.name);
                    JointsCache.processJointSelectChange();
                    JointsCache.processJointsListChange();
                }}
            >
                {props.name}
            </p>
        </div>
    );
};

export interface JointComponentProp {
    name: string;
    depth: number;
}
