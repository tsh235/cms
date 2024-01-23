import {addProduct} from './handlers.js';
import elems from './const.js';

const {
  overlay,
  btnAddGoods,
  modalForm,
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

export const formChange = (form) => {
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
      `$ ${form.count.value * form.price.value}`;
  });

  form.price.addEventListener('change', () => {
    if (form.price.value < 0) {
      form.price.value = 0;
    }

    modalForm.total.textContent =
      `$ ${form.count.value * form.price.value}`;
  });
};

export const formControl = (form, id, tableBody, closeModal) => {
  form.total.textContent = `$ 0`;
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    newProduct.id = id;

    addProduct(newProduct, tableBody, newProduct.length);

    form.total.textContent = `$ 0`;
    form.reset();
    closeModal();
  });
};
