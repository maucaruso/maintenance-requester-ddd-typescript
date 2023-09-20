const isNotANumber = (value: number | string) => {
  return !value || value === '' || isNaN(Number(value));
};

export { isNotANumber };
