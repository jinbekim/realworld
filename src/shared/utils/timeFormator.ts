export const timeFormator = (date: string) => {
  const date2 = new Date(date).toLocaleString('kr');

  return date2;
};
