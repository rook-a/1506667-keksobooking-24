const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

const avatarInputContainer = document.querySelector('.ad-form-header__input');
const avatarPreviewContainer = document.querySelector('.ad-form-header__preview-img');
const housePreviewContainer = document.querySelector('.ad-form__photo');
const housePreviewInputContainer = document.querySelector('.ad-form__input');
const housePreviewImageContainer = document.querySelector('.ad-form__photo-preview');

avatarInputContainer.addEventListener('change', () => {
  const file = avatarInputContainer.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    avatarPreviewContainer.src = URL.createObjectURL(file);
  }
});

housePreviewInputContainer.addEventListener('change', () => {
  const files = Array.from(housePreviewInputContainer.files);

  files.forEach((file) => {
    const fileName = file.name.toLowerCase();
    const cloneImg = housePreviewImageContainer.cloneNode(true);

    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      cloneImg.src = URL.createObjectURL(file);
    }

    cloneImg.classList.remove('hidden');
    housePreviewContainer.insertAdjacentElement('beforeend', cloneImg);
  });
});

const clearAvatarPreview = () => {
  avatarInputContainer.value = '';
  avatarPreviewContainer.src = DEFAULT_AVATAR_SRC;
};

const clearPhotoPreview = () => {
  const housePreviewImages = Array.from(housePreviewContainer.children);
  housePreviewInputContainer.value = '';

  housePreviewImages.forEach((img) => img.remove());
};

export {clearAvatarPreview};
export {clearPhotoPreview};
