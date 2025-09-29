import {md5} from 'js-md5';

export const md5Hash = (input: string): string => {
    return md5(input);
};