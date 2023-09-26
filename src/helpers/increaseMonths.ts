const increaseMonths = (date: Date, increaseMonths: number) => {
  const currentDate = date;

  currentDate.setMonth(currentDate.getMonth() + increaseMonths);

  if (currentDate.getMonth() > 11) {
    currentDate.setFullYear(currentDate.getFullYear() + increaseMonths);
    currentDate.setMonth(0);
  }

  return currentDate;
};

export { increaseMonths };
