import React, { Component } from "react";
import "./HierarchyViewStyles.less";
import { JointComponent } from "./JointComponent/JointComponent";
import { JointsCache } from "../../../DataAccessors/JointsCache";

export class HierarchyView extends Component<{}, {}> {
    render() {
        let data: { name: string; depth: number }[] = JointsCache.getJointsHierarchy();
        let jointComponents: JSX.Element[] = data.map((jointInfo) => {
            return <JointComponent name={jointInfo.name} depth={jointInfo.depth} key={jointInfo.name}></JointComponent>;
        });

        return (
            <div className="HierarchyView container">
                <h3>Joints</h3>
                <div className="jointsDiv">{jointComponents}</div>
            </div>
        );
    }
}
