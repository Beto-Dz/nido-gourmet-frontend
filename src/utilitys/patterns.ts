export const patterns = {
  onlyLetters: {
    html: "[A-Za-zÁÉÍÓÚáéíóúÑñs ]+",
    js: /^[A-Za-zÁÉÍÓÚáéíóúÑñs ]+$/,
  },
  onlyNumbers: {
    html: "\\d{6,}",
    js: /^\d{6,}$/,
  },
  email: {
    html: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}",
    js: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
  },
};
