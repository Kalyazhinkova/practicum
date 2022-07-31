import { initialCards } from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
const elements = document.querySelector('.elements');

const allPopup = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_profile');
const addPopup = document.querySelector('.popup_add');
const cardPopup = document.querySelector('.popup_big');
const popupImageName1 = document.querySelector('.popup__image-name');
const popupImage2 = document.querySelector('.popup__image');

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const closeButtons = document.querySelectorAll('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.querySelector('#profile-form');
const nameInput = document.querySelector('#name'); //поле ввода имя
const jobInput = document.querySelector('#description'); //поле ввода описание

const addForm = document.querySelector('#add-form');
const namePicture = document.querySelector('#image-name'); //поле ввода названия картинки
const linkImage = document.querySelector('#image-link'); //поле ввода ссылки 

const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__item-error_active'
};

const formEditProfile = new FormValidator(formConfig, profileForm);
const formAddContent = new FormValidator(formConfig, addForm);

formEditProfile.enableValidation();
formAddContent.enableValidation();


function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keyup', closePopupEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keyup', closePopupEscape);
}

function closePopupEscape (evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_open');
    closePopup(popup);
  }
}

function handleCardClick(name,link) {
  popupImageName1.textContent = name;
  popupImage2.src = link;
  popupImage2.alt = name + `. Фотография`;
  openPopup(cardPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addElement();
  closePopup(addPopup);
  evt.target.reset();
}

function createCard (item) {
  const card = new Card(item,'#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function addElement() {
  const item = {name:namePicture.value, link:linkImage.value};
  elements.prepend(createCard(item));
}

initialCards.forEach((item)=>{
  elements.prepend(createCard(item));
});

buttonEdit.addEventListener('click', () => 
{
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  formEditProfile.checkValidityPopup();
  openPopup(profilePopup);});

buttonAdd.addEventListener('click', () => {
  formAddContent.checkValidityPopup();
  openPopup(addPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

allPopup.forEach((popup) => {
  popup.addEventListener('mousedown', function(evt) {
    if(evt.target === evt.currentTarget) {
          closePopup(evt.currentTarget);
        }
  });
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);




