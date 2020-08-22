//checking name only contains alphabets
export const nameRegexp = new RegExp("^[a-zA-z]{5,26}$");

//gender value should be either M, F or O
export const genderRegExp = new RegExp("[MFO]{1}");

//regex for checking language of the user
export const langRegExp = new RegExp("^(HI|EN)$");
