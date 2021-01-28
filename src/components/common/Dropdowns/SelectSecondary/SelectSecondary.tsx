import React, { useState, useRef, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import css from './SelectSecondary.module.scss';

type DropdownProps = {
    options: { value: string; label: any }[];
    customSelect?: string;
    placeholder?: any;
    closedIcon?: string;
    openIcon?: string;
    label?: string;
    onSelect?: (string) => void;
    customMenu?: string;
    customWidth?: string;
    customControl?: string;
    leftIcon?: string;
    customWrapper?: string;
};

const SelectSecondary = ({
    options,
    customSelect,
    label,
    placeholder,
    closedIcon,
    openIcon,
    onSelect,
    customMenu,
    customControl,
    leftIcon,
    customWrapper,
}: DropdownProps) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isOptionSelected, setIsOptionSelected] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef();
    useOnClickOutside(ref, () => setIsOpen(false));

    const handleChange = (e) => {
        setSelectedOption(e.value);
        setIsOptionSelected(true);
        setIsOpen(false);
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        onSelect && onSelect(selectedOption);
    }, [onSelect, selectedOption]);

    const arrowClosed = (
        <span className={css.select__arrow_closed}>
            <img src={closedIcon || '/front-static/icons/navigation/caret-down.svg'} alt="open" />
        </span>
    );

    const arrowOpen = (
        <span className={css.select__arrow_open}>
            <img src={openIcon || '/front-static/icons/navigation/caret-down.svg'} alt="close" />
        </span>
    );

    return (
        <div className={`${css.wrapper} ${customWrapper || ''}`} ref={ref}>
            <label className={css.label}>{label}</label>
            {leftIcon && <img className={css.left__icon} src={leftIcon} alt="input icon" />}

            <Dropdown
                options={options}
                onFocus={handleFocus}
                onChange={handleChange}
                value={selectedOption}
                placeholder={placeholder || options[0].label}
                controlClassName={`${css.select__control} ${
                    isOpen && isOptionSelected && css.select__control__is_open
                } ${customControl || ''}`}
                placeholderClassName={`${css.select__placeholder} ${leftIcon && css.select__placeholder__position}`}
                className={`${css.select} ${customSelect || ''}`}
                menuClassName={`${css.select__menu} ${customMenu || ''}`}
                arrowClassName={css.select__arrow}
                arrowClosed={arrowClosed}
                arrowOpen={arrowOpen}
            />
        </div>
    );
};

export default SelectSecondary;
