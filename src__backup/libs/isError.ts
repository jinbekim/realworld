export const isError = (response: any): response is GenericError => {
  if (!response) return false;
  return response.errors !== undefined || response.status !== undefined;
};

export const getErrorMessage = (error: GenericError): string => {
  let message = "";
  const keys = Object.getOwnPropertyNames(error.errors);
  keys.forEach((key) => {
    message += `${key}: ${error.errors[key]}`;
  });
  return message;
};
