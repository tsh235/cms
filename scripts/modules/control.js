import {addProduct} from './addProduct.js';
import elems from './elements.js';

const {
  overlay,
  btnAddGoods,
} = elems;

overlay.classList.remove('active');

export const modalControl = (form) => {
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
      form.total.textContent = `$ 0`;
      form.reset();
    }
  });

  return {
    vendorId,
    closeModal,
  };
};

export const formControl = (form, id, tableBody, closeModal) => {
  form.total.textContent = `$ 0`;
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    newProduct.id = id;
    console.log('newProduct: ', newProduct);

    addProduct(newProduct, tableBody, newProduct.length);

    form.total.textContent = `$ 0`;
    form.reset();
    closeModal();
  });
};
