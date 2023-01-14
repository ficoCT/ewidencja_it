export function validateLogin(values) {
  const errorMessages = {};

  if (values.email.length === 0) {
    errorMessages.email += 'Pole nie może być puste!';
  } else if ( !String(values.email)
      .toLowerCase()
      .match(
          '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.'+
              '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
      )) {
    errorMessages.email += 'Podany email jest nieprawidłowy!';
  }

  if (values.password.length <= 5) {
    errorMessages.password = 'Podane hasło jest za krótkie!';
  }

  return Object.keys(errorMessages).length > 0
    ? errorMessages
    : null;
}
