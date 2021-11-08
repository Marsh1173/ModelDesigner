import React, { useEffect, useState } from "react";
import "./NameListStyles.less";
import { NameListItem } from "./NameListItem";
import { getNextKey } from "../../../ts/main";

export const NameList: React.FC<NameListProps> = (props) => {
    const makeSelection: (value: string) => void = (value: string) => {
        props.onSelectName(value);
        props.onClose();
    };

    function getNameList(): JSX.Element[] {
        let names: string[] = props.getItems();
        props.extraItems.forEach((extraName) => {
            names.push(extraName);
        });
        return names.map((nameString) => {
            return <NameListItem name={nameString} onClick={makeSelection} key={getNextKey()}></NameListItem>;
        });
    }

    const [nameItems, changeNameList] = useState(getNameList());

    useEffect(() => {
        changeNameList(getNameList());
    }, []);

    return (
        <div className="NameList">
            <div className="nameListBackground" onClick={() => props.onClose()}></div>
            <div className="nameListMenu">{nameItems}</div>
        </div>
    );
};

export interface NameListProps {
    onClose: () => void;
    onSelectName: (value: string) => void;
    getItems: () => string[];
    extraItems: string[];
}
