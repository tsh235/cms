import consts from './const.js';

const {
  cmsTotalPrice,
} = consts;

export const updateTotalPrice = (list) => {
  let totalPrice = 0;
  list.forEach(obj => {
    totalPrice += obj.count * obj.price;
  });

  cmsTotalPrice.textContent = `$ ${totalPrice}`;
};
