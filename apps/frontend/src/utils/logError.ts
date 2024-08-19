export const handleError = (where: string, error: unknown) => {
  console.error(`${where}: `, error);

  //todo error handling

  throw error;
};
