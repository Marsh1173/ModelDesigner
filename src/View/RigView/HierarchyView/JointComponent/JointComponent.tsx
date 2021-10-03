import React, { Component } from "react";
import { JointsCache } from "../../../../DataAccessors/JointsCache";
import "./JointComponentStyles.less";

export class JointComponent extends Component<JointComponentProp, {}> {
    render() {
        let divDivs: JSX.Element[] = [];
        for (let i: number = 0; i < this.props.depth; i++) {
            divDivs.push(<div className="divisionDiv"></div>);
        }

        return (
            <div className="JointComponent">
                {divDivs}
                <p
                    className={`jointText ${JointsCache.selectedJoint && this.props.name == JointsCache.selectedJoint.name ? "selected" : ""}`}
                    onClick={() => {
                        JointsCache.selectedJoint = JointsCache.getJointByName(this.props.name);
                        JointsCache.processJointSelectChange();
                        JointsCache.processJointsListChange();
                    }}
                >
                    {this.props.name}
                </p>
            </div>
        );
    }
}

export interface JointComponentProp {
    key: string;
    name: string;
    depth: number;
}
