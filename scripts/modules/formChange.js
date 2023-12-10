import consts from './const.js';

const {
  modalForm,
} = consts;

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
