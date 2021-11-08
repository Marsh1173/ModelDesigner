import React, { Component } from "react";
import { AnimationCanvasContainer } from "./AnimationCanvasContainer";
import "./AnimationViewStyles.less";

export class AnimationView extends Component<{}, {}> {
    render() {
        return (
            <div className="AnimationView container">
                <AnimationCanvasContainer></AnimationCanvasContainer>
            </div>
        );
    }
}
