import './Input.scss';
import React, {ChangeEvent} from "react";

type InputProps = {
    placeholder?: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    inputValue: string;
}

const Input: React.FC<InputProps> = ({placeholder, setInputValue, inputValue}) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);

    return (
        <input className="input" type="text" placeholder={placeholder} value={inputValue}
               onChange={handleChange}></input>
    );
};

export default  React.memo(Input);

