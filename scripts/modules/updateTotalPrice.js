import elems from './elements.js';

const {
  cmsTotalPrice,
} = elems;

export const updateTotalPrice = (list) => {
  let totalPrice = 0;
  list.forEach(obj => {
    totalPrice += obj.count * obj.price;
  });

  cmsTotalPrice.textContent = `$ ${totalPrice}`;
};
