import consts from './const.js';
import {renderGoods} from './renderGoods.js';
import {updateTotalPrice} from './updateTotalPrice.js';

const {
  tableBody,
} = consts;

const deleteProduct = (arrGoods, id) => {
  const index = arrGoods.findIndex(obj => obj.id === id);
  arrGoods.splice(index, 1);
  return arrGoods;
};

export const deleteRow = (listRows, goods) => {
  listRows.addEventListener('click', ({target}) => {
    if (target.closest('.table__btn_del')) {
      const row = target.closest('.table__body-row');
      const id =
        parseInt(row.querySelector('.table__cell_name').dataset.id);
      row.remove();
      const newGoods = deleteProduct(goods, id);

      renderGoods(tableBody, newGoods);
      updateTotalPrice(newGoods);
    }
  });
};
