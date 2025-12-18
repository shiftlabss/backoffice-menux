export const maskCNPJ = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskPhone = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
    .substring(0, 15);
};

export const maskCurrency = (value) => {
  let rawValue = value.replace(/\D/g, '');
  let numericValue = (Number(rawValue) / 100).toFixed(2);
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numericValue);
};

export const unmaskPrice = (maskedValue) => {
  if (typeof maskedValue !== 'string') return maskedValue;
  return parseFloat(maskedValue.replace(/[^\d,]/g, '').replace(',', '.'));
}
