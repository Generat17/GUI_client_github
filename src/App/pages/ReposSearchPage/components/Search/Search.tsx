import './Search.scss';

import React, {useState} from "react";

import Button from "./components/Button";
import Input from "./components/Input";

type SearchProps = {
    setCurrentInput: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
}

const Search: React.FC<SearchProps> = ({setCurrentInput, isLoading}) => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleClick = () => {
        setCurrentInput(inputValue);
    }

    return (
        <div className="search">
            <Input placeholder="Введите название компании" setInputValue={setInputValue} inputValue={inputValue}/>
            <Button onClick={handleClick} disabled={isLoading}/>
        </div>
    );
};

export default Search;