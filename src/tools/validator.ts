export function emailValidator(email: string): boolean {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(
    email
  );
}

export function mobileNumberValidator(number: string): boolean {
  return /09\d{2}(\d{6}|-\d{3}-\d{3})$/.test(number);
}

export function naturalValidator(string: string): boolean {
  return /^[a-zA-Z]{2}[0-9]{14}$/.test(string);
}

export function barcodeValidator(string: string): boolean {
  return /^\/{1}[0-9A-Z.+-]{7}$/.test(string);
}

export function ubnValidator(string: string): boolean {
  return /^[0-9]{8}$/.test(string);
}
