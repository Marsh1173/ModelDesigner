import React, { Component } from "react";
import { AnimationsCache } from "../../../../DataAccessors/AnimationsCache";
import { RootJoint } from "../../../../Model/Rig/RootJoint/RootJoint";
import "./AnimationListComponentStyles.less";

export class AnimationListComponent extends Component<AnimationListComponentProps, {}> {
    render() {
        return (
            <div className="AnimationListComponent">
                <div
                    className="playAnimation"
                    onClick={() => {
                        AnimationsCache.animations.forEach((animation) => {
                            if (animation.animationName == this.props.name) {
                                RootJoint.setAnimation(animation);
                            }
                        });
                    }}
                >
                    &#x2B9E;
                </div>
                <div
                    className={`animationName ${this.props.keyValue == AnimationsCache.selectedAnimationIndex ? "toggled" : ""}`}
                    onClick={() => {
                        if (AnimationsCache.selectedAnimationIndex != this.props.keyValue) {
                            AnimationsCache.selectedAnimationIndex = this.props.keyValue;
                            AnimationsCache.processAnimationSelectChange();
                            AnimationsCache.processAnimationListChange();
                        }
                    }}
                >
                    {this.props.name}
                </div>
            </div>
        );
    }
}

export interface AnimationListComponentProps {
    key: number;
    name: string;
    keyValue: number;
}
