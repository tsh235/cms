import elems from './const.js';
const {cmsTotalPrice} = elems;

export const counter = (rows) => {
  let counter = 1;

  rows.forEach(row => {
    row.dataset.index = counter;
    row.querySelector('.number').textContent = counter;
    counter++;
  });
};

export const updateCounter = (list, index) => {
  const rows = Array.from(list.querySelectorAll('tr'));

  rows.forEach((row, i) => {
    if (i >= index) {
      row.dataset.index -= 1;
      row.querySelector('.number').textContent = row.dataset.index;
    }
  });
};

export const updateTotalPrice = (list) => {
  let totalPrice = 0;
  list.forEach(obj => {
    totalPrice += obj.count * obj.price;
  });

  cmsTotalPrice.textContent = `$ ${totalPrice}`;
};
