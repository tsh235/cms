import {addProductData} from './addProduct.js';
import consts from './const.js';

const {
  overlay,
  modalForm,
  btnAddGoods,
} = consts;

overlay.classList.remove('active');
modalForm.total.textContent = `$ 0.00`;

export const modalControl = () => {
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

export const formControl = (form, id, tableBody, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    console.log('newProduct: ', newProduct);
    newProduct.id = id;

    addProductData(newProduct, tableBody, newProduct.length);

    form.total.textContent = `$ 0`;
    form.reset();
    closeModal();
  });
};
