import {createRow} from './createRow.js';
import elems from './elements.js';

const {
  cmsTotalPrice,
  tableBody,
} = elems;


export const renderGoods = (elem, goods) => {
  cmsTotalPrice.textContent = `$ 0`;
  tableBody.textContent = '';
  const rows = goods.map(createRow);
  elem.append(...rows);
};
