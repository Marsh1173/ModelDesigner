import React, { Component } from "react";
import { OptionsCache } from "../../../DataAccessors/OptionsCache";
import { Looper } from "../../../Model/Looper/Looper";
import { RootJoint } from "../../../Model/Rig/RootJoint/RootJoint";

export class MainComponent extends Component<any, {}> {
    private pauseRef: React.RefObject<HTMLButtonElement>;

    constructor(props: any) {
        super(props);

        this.pauseRef = React.createRef();
    }

    render() {
        return (
            <div className="MainComponent">
                <div className="mainButtons">
                    <button
                        className="mainControlButton"
                        onClick={() => {
                            RootJoint.resetAnimation();
                        }}
                    >
                        &#8635;
                    </button>
                    <button className="mainControlButton" onClick={() => this.skipFrameBackward()}>
                        {"|<|"}
                    </button>
                    <button className="mainControlButton" ref={this.pauseRef} onClick={() => this.togglePause()}>
                        | |
                    </button>
                    <button className="mainControlButton" onClick={() => this.skipFrameForward()}>
                        {"|>|"}
                    </button>
                </div>
            </div>
        );
    }

    togglePause() {
        if (this.pauseRef.current == null) return;
        OptionsCache.paused = !OptionsCache.paused;
        if (OptionsCache.paused) {
            this.pauseRef.current.innerText = ">";
        } else {
            this.pauseRef.current.innerText = "| |";
        }
    }

    skipFrameBackward() {
        Looper.update(-1 / 20);
    }

    skipFrameForward() {
        Looper.update(1 / 20);
    }
}
