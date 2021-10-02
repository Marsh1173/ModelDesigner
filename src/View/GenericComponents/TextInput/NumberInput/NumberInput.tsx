import React from "react";
import "./NumberInputStyles.less";

export class NumberInput extends React.Component<NumberInputProp, {}> {
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
            event.target.value = event.target.value.substring(0, event.target.value.length - 1);
            event.target.blur();
        }
    }

    render() {
        return (
            <div className="NumberInput">
                <textarea defaultValue={this.props.initValue} onBlur={this.handleFocusOut} onChange={this.verifyInput} />
            </div>
        );
    }
}

export interface NumberInputProp {
    initValue: number;
    onChange: (value: number) => void;
}
