import React, { Component } from "react";
import { CanvasControlsPresenter } from "../../../Presenter/CanvasControlsPresenter";

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
                    <button className="mainControlButton" onClick={CanvasControlsPresenter.restartAnimationButtonPress}>
                        &#8635;
                    </button>
                    <button className="mainControlButton" onClick={CanvasControlsPresenter.skipFrameBackward}>
                        {"|<|"}
                    </button>
                    <button
                        className="mainControlButton"
                        ref={this.pauseRef}
                        onClick={() => {
                            if (this.pauseRef.current) {
                                CanvasControlsPresenter.togglePause(this.pauseRef.current);
                            }
                        }}
                    >
                        | |
                    </button>
                    <button className="mainControlButton" onClick={CanvasControlsPresenter.skipFrameForward}>
                        {"|>|"}
                    </button>
                </div>
            </div>
        );
    }
}
