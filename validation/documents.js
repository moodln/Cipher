const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateDocumentInput(data) {
  let errors = {};

  data.body = validBody(data.body) ? data.body : '';

  if (Validator.isEmpty(data.body)) {
    errors.body = 'you cannot save a blank document';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};