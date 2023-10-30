import './index.html';
import './index.scss';

import { validateForm } from './modules/formValidation';
import { controlModal } from './modules/modalWindow';

document.addEventListener('DOMContentLoaded', () => {
  validateForm();
  controlModal();
});
