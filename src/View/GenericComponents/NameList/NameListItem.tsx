import React from "react";
export const NameListItem: React.FC<NameListItemProps> = (props) => {
    return (
        <div className="NameListItem" onClick={() => props.onClick(props.name)}>
            <p>{props.name}</p>
        </div>
    );
};

export interface NameListItemProps {
    name: string;
    onClick: (value: string) => void;
}
