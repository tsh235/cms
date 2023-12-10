import {goods} from '../index.js';
import consts from './const.js';
import {renderGoods} from './renderGoods.js';
import {updateTotalPrice} from './updateTotalPrice.js';

const {
  tableBody,
} = consts;

export const addProductData = (product) => {
  goods.push(product);
  const count = goods.length - 1;
  renderGoods(tableBody, goods, count);
  updateTotalPrice(goods);
};
