import {goods} from '../index.js';
import consts from './const.js';
import {renderGoods} from './renderGoods.js';

const {
  tableBody,
} = consts;

export const addProductData = (product) => {
  goods.push(product);
  console.log('goods: ', goods);
  console.log('goods: ', goods.length);
  const count = goods.length - 1;
  renderGoods(tableBody, goods, count);
};
