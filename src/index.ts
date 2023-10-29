import './index.html';
import './index.scss';

import { validateForm } from './modules/formValidation';

document.addEventListener('DOMContentLoaded', () => {
  validateForm();
});
