import elems from './elements.js';

const {
  cmsTotalPrice,
} = elems;

export const createRow = (
    {id, count, name, category, units, price},
    rowCount,
) => {
  rowCount += 1;

  let totalPrice = +cmsTotalPrice.textContent.replace(/\D/g, '');

  const tr = document.createElement('tr');
  tr.classList.add('table__body-row');
  tr.dataset.count = rowCount;
  tr.innerHTML = `
    <td class="table__cell">${rowCount}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${id}">
      <span class="table__cell-id">id: ${id}</span>
      ${name}</td>
    <td class="table__cell table__cell_left">${category}</td>
    <td class="table__cell">${units}</td>
    <td class="table__cell">${count}</td>
    <td class="table__cell">$${price}</td>
    <td class="table__cell table__cell_total" data-total="${price * count}">
      $${price * count}
    </td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  `;

  totalPrice += count * price;

  cmsTotalPrice.textContent = `$ ${totalPrice}`;

  return tr;
};
