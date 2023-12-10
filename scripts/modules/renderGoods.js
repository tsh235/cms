import {createRow} from './createRow.js';
import consts from './const.js';

const {
  cmsTotalPrice,
  tableBody,
} = consts;


export const renderGoods = (elem, goods) => {
  console.log('goods: ', goods);
  cmsTotalPrice.textContent = `$ 0`;
  tableBody.textContent = '';
  const rows = goods.map(createRow);
  elem.append(...rows);
};
