export const timeSince = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    // 👉 Хелперы для правильных окончаний
    const pluralize = (num: number, one: string, few: string, many: string) => {
        const mod10 = num % 10;
        const mod100 = num % 100;

        if (mod10 === 1 && mod100 !== 11) return `${num} ${one}`;
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${num} ${few}`;
        return `${num} ${many}`;
    };

    if (days === 0) {
        return "сегодня";
    } else if (days === 1) {
        return "вчера";
    } else if (days < 30) {
        return `${pluralize(days, "день", "дня", "дней")} назад`;
    } else if (months < 12) {
        return `${pluralize(months, "месяц", "месяца", "месяцев")} назад`;
    } else {
        return `${pluralize(years, "год", "года", "лет")} назад`;
    }
};
