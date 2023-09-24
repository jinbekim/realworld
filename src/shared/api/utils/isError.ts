export const getErrorMessage = (error: any): string => {
  let message = '';
  const keys = Object.getOwnPropertyNames(error.errors);
  keys.forEach((key) => {
    message += `${key} ${error.errors[key]}`;
  });
  return message;
};
