const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

const avatarInput = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview-img');
const housePreviewContainer = document.querySelector('.ad-form__photo');
const housePreviewInput = document.querySelector('.ad-form__input');
const housePreviewImg = document.querySelector('.ad-form__photo-preview');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

housePreviewInput.addEventListener('change', () => {
  const files = Array.from(housePreviewInput.files);

  files.forEach((file) => {
    const fileName = file.name.toLowerCase();
    const cloneImg = housePreviewImg.cloneNode(true);

    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      cloneImg.src = URL.createObjectURL(file);
    }

    cloneImg.classList.remove('hidden');
    housePreviewContainer.insertAdjacentElement('beforeend', cloneImg);
  });
});

const clearAvatarPreview = () => {
  avatarInput.value = '';
  avatarPreview.src = DEFAULT_AVATAR_SRC;
};

const clearPhotoPreview = () => {
  const housePreviewImgs = Array.from(housePreviewContainer.children);
  housePreviewInput.value = '';

  housePreviewImgs.forEach((img) => img.remove());
};

export {clearAvatarPreview};
export {clearPhotoPreview};
