export const multipleEmails = value => {
  const emailRegx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (value === "") return true;
  return value.indexOf(",") !== -1
    ? value
        .split(",")
        .every(item => (item === "" ? true : emailRegx.test(item.trim())))
    : emailRegx.test(value);
};
