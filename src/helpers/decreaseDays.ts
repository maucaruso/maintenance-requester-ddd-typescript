const decreaseDays = (date: Date, days: number) => {
  const resultDate = new Date(date);
  resultDate.setDate(date.getDate() - days);

  return resultDate;
};

export { decreaseDays };
