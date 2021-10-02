import React from "react";
import { NumberInput } from "../../../GenericComponents/TextInput/NumberInput/NumberInput";
import { AnimationsCache } from "../../../../DataAccessors/AnimationsCache";
import "./AnimationViewComponentStyles.less";
import { AnimationInterface } from "../../../../Model/Animation/AnimationInterface";

export const AnimationViewComponent: React.FC<AnimationViewComponentProps> = (props) => {
    return (
        <div className="AnimationViewComponent">
            <h3>Animation</h3>
            <p>Name:</p>
            <textarea spellCheck="false">{props.animation.animationName}</textarea>
            <p>Follow-up animation name:</p>
            <textarea spellCheck="false"></textarea>
            <p>Time:</p>
            <NumberInput initValue={0} onChange={() => {}}></NumberInput>
            {props.canDelete && (
                <button
                    className="button"
                    onClick={() => {
                        AnimationsCache.animations.splice(0, 1);
                        AnimationsCache.processAnimationListChange();
                        AnimationsCache.processAnimationSelectChange();
                    }}
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export interface AnimationViewComponentProps {
    animation: AnimationInterface;
    canDelete: boolean;
}
