export const CHARS_SET_FOR_ID =
"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";

export const ID_LENGTH = 5 + Math.floor(Math.random() * 7);

export const randomGeneratorParameter = {
    charset: CHARS_SET_FOR_ID,
    length: ID_LENGTH,
};
