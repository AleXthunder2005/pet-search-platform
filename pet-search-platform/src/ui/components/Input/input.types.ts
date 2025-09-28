import React from "react";

export interface InputBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    id?: string;
    errorMessage?: string;
    error?: boolean;
    success?: boolean;
    required?: boolean;
    className?: string;
}