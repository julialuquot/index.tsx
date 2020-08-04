import React from 'react';
import Spinner from '../Spinner/Spinner';
import css from './Button.scss';

interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant: string;
    size: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button = ({ children, type, variant, size, isDisabled, isLoading, onClick }: ButtonProps) => {
    const style = () => {
        let className = css.default;
        variant === 'primary' && (className += ' ' + css.primary);
        variant === 'secondary' && (className += ' ' + css.secondary);
        size === 'small' && (className += ' ' + css.small);
        size === 'medium' && (className += ' ' + css.medium);
        size === 'large' && (className += ' ' + css.large);
        isDisabled && (className += ' ' + css.disabled);

        return className;
    };

    return (
        <button type={type} className={style()} onClick={onClick}>
            {children}
            {isLoading && <Spinner />}
        </button>
    );
};

export default Button;
