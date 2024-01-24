import {goods} from '../index.js';
import elems from './const.js';
import {updateTotalPrice} from './helpers.js';
import {renderGoods} from './render.js';

const {tableBody} = elems;

export const addProduct = (product) => {
  console.log('product: ', product);
  goods.push(product);
  const count = goods.length - 1;
  renderGoods(tableBody, goods, count);
  updateTotalPrice(goods);
};

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

export const openImage = (listRows) => {
  listRows.addEventListener('click', ({target}) => {
    if (target.closest('.table__btn_pic')) {
      const imageUrl = target.dataset.pic;
      const windowWidth = 800;
      const windowHeight = 600;
      const windowFeatures = `width=${windowWidth}, height=${windowHeight}`;

      const newWindow = window.open('about:blank', '', windowFeatures);
      newWindow.moveTo(screen.width / 2 - windowWidth / 2,
          screen.height / 2 - windowHeight / 2);

      newWindow.focus();

      newWindow.document.write(`
        <img src="${imageUrl}" alt="Изображение"/>
      `);
    }
  });
};

