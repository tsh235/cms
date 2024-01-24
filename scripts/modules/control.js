import {addProduct} from './handlers.js';
import elems from './const.js';

const {
  overlay,
  btnAddGoods,
  modalForm,
  fileImage,
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

  const modalLabelFile = document.querySelector('.modal__label_file');
  const errorText = document.createElement('p');
  const image = document.createElement('img');
  errorText.textContent = '';

  fileImage.addEventListener('change', () => {
    if (fileImage.files.length > 0) {
      const src = URL.createObjectURL(fileImage.files[0]);

      if (fileImage.files[0].size > 1048576) {
        image.remove();
        errorText.style.cssText = `
          grid-area: .;
          color: #D80101;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        `;
        errorText.textContent = 'Изображение не должно превышать размер 1 Мб';
        modalLabelFile.insertAdjacentElement('beforebegin', errorText);
      } else {
        errorText.textContent = '';
        image.style.cssText = `
          width: 200px;
          height: 200px;
          object-fit: contain;
          object-position: center;
          grid-column: 1/-1;
          justify-self: center;
        `;
        image.src = src;
        modalLabelFile.insertAdjacentElement('afterend', image);
      }
    }
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
