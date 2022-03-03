import './Button.scss';
import React from "react";

import SearchIcon from "./components/SearchIcon";

type ButtonProps = {
    onClick?: (e: React.MouseEvent) => void;
    disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({onClick, disabled}) => {

    return (
        <button className="button" onClick={disabled ? () => 0 : onClick}>
            <SearchIcon/>
        </button>
    );
};

export default  React.memo(Button);