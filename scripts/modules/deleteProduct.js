import consts from './const.js';
import {renderGoods} from './renderGoods.js';

const {
  tableBody,
  cmsTotalPrice,
} = consts;

const deleteProduct = (arrGoods, id) => {
  const index = arrGoods.findIndex(obj => obj.id === id);
  arrGoods.splice(index, 1);
  return arrGoods;
};

export const deleteRow = (listRows, goods) => {
  console.log('goods: ', goods.length);
  let totalPrice = +cmsTotalPrice.textContent.replace(/\D/g, '');
  console.log('totalPrice: ', totalPrice);

  listRows.addEventListener('click', ({target}) => {
    if (target.closest('.table__btn_del')) {
      const row = target.closest('.table__body-row');
      const id =
        parseInt(row.querySelector('.table__cell_name').dataset.id);
      const total =
        parseInt(row.querySelector('.table__cell_total').dataset.total);
      row.remove();
      const newGoods = deleteProduct(goods, id);
      console.log('newGoods: ', newGoods);

      renderGoods(tableBody, newGoods);
      totalPrice -= total;
      console.log('newGoods.length: ', newGoods.length);
      cmsTotalPrice.textContent = `$ ${totalPrice}`;
    }
  });
};
