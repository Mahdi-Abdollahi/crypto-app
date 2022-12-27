export const checkNumberSign = (number: number) =>
  Math.sign(number) === 0 || Math.sign(number) === -1 ? false : true;

export const addCommaToPrice = (number: number) => {
  number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
};
