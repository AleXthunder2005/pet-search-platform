export const validatePasswordRules = (password: string): {
    lengthOk: boolean;
    hasLower: boolean;
    hasUpper: boolean;
    hasDigit: boolean;
    hasSymbol: boolean;
    valid: boolean;
} => {
    const lengthOk = password.length >= 8;
    const hasLower = /[a-zа-яё]/.test(password);
    const hasUpper = /[A-ZА-ЯЁ]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-zА-Яа-я0-9]/.test(password);

    const valid = lengthOk; //&& hasLower && hasUpper && hasDigit && hasSymbol;
    return { lengthOk, hasLower, hasUpper, hasDigit, hasSymbol, valid };
};

export const passwordStrengthLabel = (password: string): { level: number; label: string } => {
    if (!password) return { level: 0, label: "" };

    const { hasLower, hasUpper, hasDigit, hasSymbol } = validatePasswordRules(password);
    const count = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;

    const labels = ["", "Простой", "Средний", "Хороший", "Отличный"];

    return {level: count, label: labels[count]};
};