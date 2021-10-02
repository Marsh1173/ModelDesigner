import React, { Component } from "react";
import "./AnimationListComponentStyles.less";

export class AnimationListComponent extends Component<AnimationListComponentProps, {}> {
    render() {
        return (
            <div className="AnimationListComponent">
                <div className="playAnimation">&#x2B9E;</div>
                <div className="animationName">{this.props.name}</div>
            </div>
        );
    }
}

export interface AnimationListComponentProps {
    key: number;
    name: string;
}
