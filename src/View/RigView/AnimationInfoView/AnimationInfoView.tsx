import React, { useEffect, useState } from "react";
import "./AnimationInfoViewStyles.less";
import { AnimationListComponent } from "./AnimationListComponent/AnimationListComponent";
import { AnimationsCache } from "../../../DataAccessors/AnimationsCache";
import { AnimationInterface } from "../../../Model/Animation/AnimationInterface";
import { AnimationViewComponent } from "./AnimationViewComponent/AnimationViewComponent";
import { getNewAnimation } from "../../../DataAccessors/StartAnimations";

export const AnimationInfoView: React.FC<{}> = () => {
    const getAnimationElements = (animations: AnimationInterface[]): JSX.Element[] => {
        return animations.map((animation, index) => {
            return <AnimationListComponent name={animation.animationName} key={index} keyValue={index}></AnimationListComponent>;
        });
    };

    const [animations, changeStateAnimationList] = useState(getAnimationElements(AnimationsCache.animations));

    useEffect(() => {
        AnimationsCache.appendAnimationListObservers({
            onAnimationListChange: () => {
                changeListStateRef();
            },
        });
    }, []);

    const changeListStateRef = () => {
        changeStateAnimationList(getAnimationElements(AnimationsCache.animations));
    };

    return (
        <div className="AnimationInfoView container">
            <div className="animationList">
                {animations}
                <button
                    className="button"
                    onClick={() => {
                        AnimationsCache.animations.push(getNewAnimation());
                        AnimationsCache.processAnimationListChange();
                    }}
                >
                    Create new animation
                </button>
            </div>
            <AnimationViewComponent></AnimationViewComponent>
        </div>
    );
};
