import React, { useEffect, useState } from "react";
import { NumberInput } from "../../../GenericComponents/TextInput/NumberInput/NumberInput";
import { TextInput } from "../../../GenericComponents/TextInput/TextInput/TextInput";
import { AnimationsCache } from "../../../../DataAccessors/AnimationsCache";
import "./AnimationViewComponentStyles.less";
import { AnimationInterface } from "../../../../Model/Animation/AnimationInterface";

export const AnimationViewComponent: React.FC<{}> = () => {
    const getSelectedAnimation: () => AnimationInterface = () => {
        return AnimationsCache.animations[AnimationsCache.selectedAnimationIndex];
    };

    const [animation, changeStateAnimationSelect] = useState(getSelectedAnimation());

    useEffect(() => {
        AnimationsCache.appendAnimationSelectObservers({
            onAnimationSelectChange: () => {
                changeSelectedStateRef();
            },
        });
    }, []);

    const changeSelectedStateRef = () => {
        changeStateAnimationSelect(getSelectedAnimation());
    };

    let nameRef: React.RefObject<TextInput> = React.createRef();
    let endNameRef: React.RefObject<TextInput> = React.createRef();
    let durationRef: React.RefObject<NumberInput> = React.createRef();

    useEffect(() => {
        nameRef.current!.setValue(animation.animationName);
        endNameRef.current!.setValue(animation.endAnimationName);
        durationRef.current!.setValue(animation.duration);
    });

    return (
        <div className="AnimationViewComponent">
            <h3>Animation</h3>
            <div>
                Name:
                <TextInput
                    ref={nameRef}
                    initValue={animation.animationName}
                    onChange={(value: string) => {
                        if (AnimationsCache.attemptChangeSelectedAnimationName(value)) {
                            AnimationsCache.processAnimationListChange();
                        }
                        AnimationsCache.processAnimationSelectChange();
                    }}
                ></TextInput>
            </div>
            <div>
                Follow-up animation:
                <TextInput
                    ref={endNameRef}
                    initValue={animation.endAnimationName}
                    onChange={(value: string) => {
                        animation.endAnimationName = value;
                        AnimationsCache.processAnimationSelectChange();
                    }}
                ></TextInput>
            </div>
            <div>
                Duration:
                <NumberInput
                    ref={durationRef}
                    initValue={animation.duration}
                    onChange={(value: number) => {
                        animation.duration = value;
                        AnimationsCache.processAnimationSelectChange();
                    }}
                ></NumberInput>
            </div>
            {AnimationsCache.animations.length > 1 && (
                <button
                    className="button"
                    onClick={() => {
                        AnimationsCache.animations.splice(AnimationsCache.selectedAnimationIndex, 1);
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
