const isNotANumber = (value: number | string) => {
  return (!value && value !== 0) || value === '' || isNaN(Number(value));
};

export { isNotANumber };
