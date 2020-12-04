import React from 'react';
import css from './InputField.module.scss';

type InputFieldProps = {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder: string;
    disabled: boolean;
    error: boolean;
    valid: boolean;
    value: string | number;
    icon?: string;
    iconPosition?: 'left' | 'right';
    onChange: React.EventHandler<any>;
    onBlur: React.EventHandler<any>;
    customStyle?: string;
    iconRef?: React.RefObject<HTMLInputElement>;
};

const InputField = ({
    id,
    name,
    type,
    label,
    placeholder,
    value,
    disabled,
    error,
    valid,
    icon,
    iconPosition,
    onChange,
    onBlur,
    customStyle,
    iconRef,
}: InputFieldProps) => {
    const getClassName = () => {
        let className = css.input;
        if (valid) {
            className += ' ' + css.input__valid;
        }
        if (error) {
            className += ' ' + css.input__error;
        }
        if (icon) {
            if (iconPosition === 'right') {
                className += ' ' + css.input__iconRight;
            } else {
                className += ' ' + css.input__iconLeft;
            }
        }

        if (customStyle) {
            className += ' ' + css[`input__${customStyle}`];
            if (valid) {
                className += ' ' + css[`input__${customStyle}__valid`];
            }
            if (error) {
                className += ' ' + css[`input__${customStyle}__error`];
            }
        }
        return className;
    };

    return (
        <div className={css.wrapper}>
            {label && (
                <label htmlFor={id} className={css.label}>
                    {label}
                </label>
            )}
            <div className={css.input__wrapper}>
                {type === 'textarea' ? (
                    <textarea
                        name={name}
                        id={id}
                        placeholder={placeholder}
                        className={`${getClassName()} ${css.text_area}`}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                        style={{ height: '120px' }}
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        id={id}
                        placeholder={placeholder}
                        className={getClassName()}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                    />
                )}
                {icon && (
                    <div
                        ref={iconRef}
                        className={`${css.input__icon} ${
                            iconPosition === 'right' ? css[`input__icon__${iconPosition}`] : css.input__icon__left
                        }`}
                    >
                        <img src={icon} alt="input icon" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputField;
