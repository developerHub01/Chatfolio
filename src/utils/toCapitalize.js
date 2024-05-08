export const toCapitalize = (str) => {
  str = str.split("");
  str[0] = str[0].toUpperCase();
  return str.join("");
};
