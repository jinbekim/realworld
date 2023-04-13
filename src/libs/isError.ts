export const isError = (response: any): response is GenericError => {
  return response.errors !== undefined;
};
