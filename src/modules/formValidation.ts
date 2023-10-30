import IMask from 'imask';
import { ApiResponse } from 'types';

import { sendFormData } from './apiRequest';

// Setup mask for phone input

const mask = '+{375} (00) 000-00-00';

const phoneInput = document.getElementById('phone') as HTMLInputElement;

const phoneMask = IMask(phoneInput, {
  mask,
  lazy: true,
  placeholderChar: '_',
});

// ------------------------

const form = document.forms[0];
const submitBtn = form?.querySelector('.form__btn') as HTMLButtonElement;
const inputErrorClassName = 'form__input--error';
const isValid = () => Array.from(form!.elements).every((el) => !el.classList.contains(inputErrorClassName));

function setInputMessage(el: HTMLInputElement | HTMLTextAreaElement, message: string = '') {
  message !== '' ? el.classList.add(inputErrorClassName) : el.classList.remove(inputErrorClassName);

  const messageContainer = el.parentElement;

  if (messageContainer) {
    const inputMessage = messageContainer.querySelector('.form__input-message');

    if (inputMessage) inputMessage.textContent = message;
  }

  if (isValid()) {
    submitBtn.disabled = false;
  }
}

function setFormMessage(type?: string, message: string = '') {
  const formMessage = form?.querySelector('.form__message');

  if (formMessage) {
    formMessage.textContent = message;

    formMessage.className = 'form__message';

    if (type) formMessage.classList.add(`form__message--${type}`);
  }
}

export function validateForm() {
  form?.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const inputList = Array.from(target.elements);

    inputList.forEach((el) => {
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        const { value, type, id, validity } = el;

        let message = '';

        if (!value.length) message = 'Field must be filled';

        if (type === 'email' && validity.typeMismatch) message = 'Incorrect email';

        if (id === 'phone' && phoneMask.unmaskedValue.length && phoneMask.unmaskedValue.length !== 12) {
          message = 'Incorrect phone number';
        }

        setInputMessage(el, message);

        el.addEventListener('input', () => {
          setFormMessage();
          setInputMessage(el);
        });
      }
    });

    if (isValid()) {
      void sendFormData(form)
        .then((response) => {
          if (response.ok) {
            form.reset();
          }
          void (response.json() as Promise<ApiResponse>).then((data) => setFormMessage(data.status, data.message));
        })
        .catch((error) => console.warn(error));
    } else {
      submitBtn.disabled = true;
      setFormMessage('error', 'Fields are empty or contain incorrect data');
    }
  });
}
