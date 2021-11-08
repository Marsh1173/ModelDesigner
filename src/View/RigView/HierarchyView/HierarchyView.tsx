import React, { useEffect, useState } from "react";
import "./HierarchyViewStyles.less";
import { JointComponent } from "./JointComponent/JointComponent";
import { JointsCache } from "../../../DataAccessors/JointsCache";
import { getNextKey } from "../../../ts/main";

export const HierarchyView: React.FC<{}> = () => {
    const getJointElements = (joints: { name: string; depth: number }[]): JSX.Element[] => {
        return joints.map((joint) => {
            return <JointComponent key={getNextKey()} name={joint.name} depth={joint.depth}></JointComponent>;
        });
    };

    useEffect(() => {
        JointsCache.appendJointsListObservers({
            onJointsListChange: () => {
                changeListStateRef();
            },
        });
    }, []);

    const [joints, changeStateJointList] = useState(getJointElements(JointsCache.getJointsHierarchy()));

    const changeListStateRef = () => {
        changeStateJointList(getJointElements(JointsCache.getJointsHierarchy()));
    };

    return (
        <div className="HierarchyView container">
            <h3>Joints</h3>
            <div className="jointsDiv">{joints}</div>
        </div>
    );
};
