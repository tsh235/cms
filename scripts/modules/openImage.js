export const openImage = (listRows) => {
  listRows.addEventListener('click', ({target}) => {
    if (target.closest('.table__btn_pic')) {
      const imageUrl = target.dataset.pic;
      const windowWidth = 800;
      const windowHeight = 600;
      const windowFeatures = `width=${windowWidth}, height=${windowHeight}`;

      const newWindow = window.open('about:blank', '', windowFeatures);
      newWindow.moveTo(screen.width / 2 - windowWidth / 2,
          screen.height / 2 - windowHeight / 2);

      newWindow.focus();

      newWindow.document.write(`
        <img src="${imageUrl}" alt="Изображение"/>
      `);
    }
  });
};
