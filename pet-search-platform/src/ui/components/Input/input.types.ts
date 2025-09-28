import React from "react";

export interface InputBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    id?: string;
    errorMessage?: string;
    success?: boolean;
    required?: boolean;
    className?: string;
}