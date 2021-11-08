import React from "react";
import "./NumberInputStyles.less";

export class NumberInput extends React.Component<NumberInputProp, {}> {
    private numberRef: React.RefObject<HTMLTextAreaElement> = React.createRef();

    constructor(props: NumberInputProp) {
        super(props);

        this.handleFocusOut = this.handleFocusOut.bind(this);
    }

    handleFocusOut(event: React.FocusEvent<HTMLTextAreaElement>) {
        let newValue: number = parseFloat(event.target.value + ".");
        if (isNaN(newValue)) {
            newValue = 0;
        }
        event.target.value = newValue.toString();
        this.props.onChange(newValue);
    }

    verifyInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        if (event.target.value.indexOf("\n") != -1) {
            event.target.value = event.target.value.replace("\n", "");
            event.target.blur();
        }
    }

    setValue(value: number) {
        this.numberRef!.current!.value = value.toPrecision();
    }

    render() {
        return (
            <div className="NumberInput">
                <textarea ref={this.numberRef} defaultValue={this.props.initValue} onBlur={this.handleFocusOut} onChange={this.verifyInput} />
            </div>
        );
    }
}

export interface NumberInputProp {
    initValue: number;
    onChange: (value: number) => void;
}
