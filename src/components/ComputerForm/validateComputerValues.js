function isBlank(text) {
  return text.trim().length === 0;
}

export default function validateComputerValues(values) {
  const errorMessages = {};

  if (isBlank(values.company)) {
    errorMessages.company = 'Proszę wpisać wartość';
  }

  return Object.keys(errorMessages).length > 0
    ? errorMessages
    : null;
}
