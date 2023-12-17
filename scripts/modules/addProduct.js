import {goods} from '../index.js';
import elems from './elements.js';
import {renderGoods} from './renderGoods.js';
import {updateTotalPrice} from './updateTotalPrice.js';

const {
  tableBody,
} = elems;

export const addProduct = (product) => {
  console.log('product: ', product);
  goods.push(product);
  const count = goods.length - 1;
  renderGoods(tableBody, goods, count);
  updateTotalPrice(goods);
};
