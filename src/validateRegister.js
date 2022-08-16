export function validateRegister(values) {
  const errorMessages = {};

  errorMessages.email = "";
  errorMessages.password = "";

  if (values.email.length === 0) {
    errorMessages.email += 'Pole nie może być puste. ';
  } else if ( !String(values.email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
    errorMessages.email += 'Podany email jest nieprawidłowy!. ';
  }

  if (values.password.length === 0) {
    errorMessages.password = 'Pole nie może być puste. ';
  } else if (values.password.length <= 5) {
    errorMessages.password = 'Podane hasło jest za krótkie!';
  } else if (values.password !==  values.password1) {
    errorMessages.password1 = 'Podane hasła muszą byś takie same!';
  }

  return Object.keys(errorMessages).length > 0
    ? errorMessages
    : null;
}
