'use strict';

const goods = [
  {
    'id': 1,
    'name': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': 'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    'category': 'mobile-phone',
    'discont': false,
    'count': 3,
    'units': 'шт',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 2,
    'name': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
    'category': 'toys',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'id': 3,
    'name': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': 'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
    'category': 'tv-box',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 4,
    'name': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': 'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
    'category': 'cables',
    'discont': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

const overlay = document.querySelector('.overlay');
// const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
// const modalCheckbox = document.querySelector('.modal__checkbox');
// const modalInputDiscount = document.querySelector('.modal__input_discount');
const cmsTotalPrice = document.querySelector('.cms__total-price');
const tableBody = document.querySelector('.table__body');
const btnAddGoods = document.querySelector('.panel__add-goods');

overlay.classList.remove('active');
modalForm.total.textContent = `$ 0.00`;
cmsTotalPrice.textContent = `$ 0.00`;

const modalControl = () => {
  const getVendorId = () => {
    let id = 0;
    id = Math.ceil(Math.random() * 1000000000);

    const vendorCodeId = overlay.querySelector('.vendor-code__id');
    vendorCodeId.textContent = id;
    return id;
  };
  const vendorId = getVendorId();

  const openModal = () => {
    overlay.classList.add('active');
  };

  const closeModal = () => {
    overlay.classList.remove('active');
  };

  btnAddGoods.addEventListener('click', () => {
    openModal();
  });

  overlay.addEventListener('click', ({target}) => {
    if (target === overlay || target.closest('.modal__close')) {
      closeModal();
    }
  });

  return {
    vendorId,
    closeModal,
  };
};

const {vendorId, closeModal} = modalControl(modalForm);

let rowCount = 0;
let totalPrice = 0;

const createRow = ({id, count, name, category, units, price}) => {
  rowCount += 1;
  const tr = document.createElement('tr');
  tr.classList.add('table__body-row');
  tr.innerHTML = `
    <td class="table__cell">${rowCount}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${id}">
      <span class="table__cell-id">id: ${id}</span>
      ${name}</td>
    <td class="table__cell table__cell_left">${category}</td>
    <td class="table__cell">${units}</td>
    <td class="table__cell">${count}</td>
    <td class="table__cell">$${price}</td>
    <td class="table__cell table__cell_total" data-total="${price * count}">$${price * count}</td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  `;

  totalPrice += count * price;

  cmsTotalPrice.textContent =
    `$ ${totalPrice.toFixed(2)}`;

  return tr;
};

tableBody.textContent = '';

const renderGoods = (elem, goodsList) => {
  const rows = goodsList.map(createRow);
  elem.append(...rows);
};

renderGoods(tableBody, goods);

const deleteProduct = (arrGoods, id) => {
  const index = arrGoods.findIndex(obj => obj.id === id);
  arrGoods.splice(index, 1);
  console.log('arrGoods: ', arrGoods);
};

const deleteRow = (listRows, goods) => {
  listRows.addEventListener('click', ({target}) => {
    if (target.closest('.table__btn_del')) {
      const row = target.closest('.table__body-row');
      const id = parseInt(row.querySelector('.table__cell_name').dataset.id);
      const total = parseInt(row.querySelector('.table__cell_total').dataset.total);
      row.remove();
      deleteProduct(goods, id);

      totalPrice -= total;
      cmsTotalPrice.textContent =
        `$ ${(totalPrice).toFixed(2)}`;
    }
  });
};

deleteRow(tableBody, goods);

const formChange = (form) => {
  form.discount.addEventListener('change', () => {
    if (form.discount_count.disabled === true) {
      form.discount_count.disabled = false;
    } else {
      form.discount_count.disabled = true;
      form.discount_count.value = '';
    }
  });

  form.count.addEventListener('change', () => {
    if (form.count.value < 0) {
      form.count.value = 0;
    }

    modalForm.total.textContent =
      `$ ${(form.count.value * form.price.value).toFixed(2)}`;
  });

  form.price.addEventListener('change', () => {
    if (form.price.value < 0) {
      form.price.value = 0;
    }

    modalForm.total.textContent =
      `$ ${(form.count.value * form.price.value).toFixed(2)}`;
  });
};

formChange(modalForm);

const addProductData = (product) => {
  goods.push(product);
};

const addProductPage = (product, tableBody) => {
  tableBody.append(createRow(product));
};

const formControl = (form, id, tableBody, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    newProduct.id = id;
    console.log('newProduct: ', newProduct);

    addProductData(newProduct);
    addProductPage(newProduct, tableBody);

    form.total.textContent = `$ 0.00`;
    form.reset();
    closeModal();
  });
};

formControl(modalForm, vendorId, tableBody, closeModal);
