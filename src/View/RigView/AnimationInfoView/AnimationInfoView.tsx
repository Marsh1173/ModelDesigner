import React, { useEffect, useState } from "react";
import "./AnimationInfoViewStyles.less";
import { AnimationListComponent } from "./AnimationListComponent/AnimationListComponent";
import { AnimationsCache } from "../../../DataAccessors/AnimationsCache";
import { AnimationInterface } from "../../../Model/Animation/AnimationInterface";
import { getNextKey } from "../../../ts/main";
import { AnimationViewComponent } from "./AnimationViewComponent/AnimationViewComponent";

export const AnimationInfoView: React.FC<{}> = () => {
    const getAnimationElements = (animations: AnimationInterface[]): JSX.Element[] => {
        return animations.map((animation, index) => {
            return <AnimationListComponent name={animation.animationName} key={index}></AnimationListComponent>;
        });
    };
    const getSelectedAnimation: (index: number) => JSX.Element = (index: number) => {
        return <AnimationViewComponent canDelete={true} animation={AnimationsCache.animations[index]}></AnimationViewComponent>;
    };

    const [animations, changeStateAnimationList] = useState(getAnimationElements(AnimationsCache.animations));
    const [animationView, changeStateAnimationSelect] = useState(getSelectedAnimation(AnimationsCache.selectedAnimationIndex));

    useEffect(() => {
        AnimationsCache.appendAnimationListObservers({
            onAnimationListChange: () => {
                changeListStateRef();
            },
        });
        AnimationsCache.appendAnimationSelectObservers({
            onAnimationSelectChange: () => {
                changeSelectedStateRef();
            },
        });
    }, []);

    const changeListStateRef = () => {
        changeStateAnimationList(getAnimationElements(AnimationsCache.animations));
    };

    const changeSelectedStateRef = () => {
        console.log("here");
        changeStateAnimationSelect(getSelectedAnimation(AnimationsCache.selectedAnimationIndex));
    };

    return (
        <div className="AnimationInfoView container">
            {animationView}
            <div className="animationList">
                {animations}
                <button
                    className="button"
                    onClick={() => {
                        AnimationsCache.animations.push({ animationName: "test" + getNextKey(), endAnimationName: "testEnd", time: 1 });
                        AnimationsCache.processAnimationListChange();
                    }}
                >
                    Create new animation
                </button>
            </div>
        </div>
    );
};
