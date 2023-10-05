export const getErrorMessage = (error: Record<string, any>): string => {
  let message = '';
  const keys = Object.getOwnPropertyNames(error);
  keys.forEach((key) => {
    message += `${key} ${error[key]}`;
  });
  return message;
};
