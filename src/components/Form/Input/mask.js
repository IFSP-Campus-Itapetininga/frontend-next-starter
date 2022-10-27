const maskCpf = ({ evt, mask }) => {
  if (mask === 'cpf') {
    evt.currentTarget.maxLength = 14;
    let value = evt.currentTarget.value;

    value = value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');

    evt.currentTarget.value = value;
  }
};

const maskPhone = ({ evt, mask }) => {
  if (mask === 'phone') {
    evt.currentTarget.maxLength = 14;
    let value = evt.currentTarget.value;

    value = value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{4})/, '$1-$2');

    evt.currentTarget.value = value;
  }
};

const maskZipcode = ({ evt, mask }) => {
  if (mask === 'zipcode') {
    evt.currentTarget.maxLength = 9;
    let value = evt.currentTarget.value;

    value = value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');

    evt.currentTarget.value = value;
  }
};

const maskDate = ({ evt, mask }) => {
  if (mask === 'date') {
    evt.currentTarget.maxLength = 15;
    let value = evt.currentTarget.value;

    value = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1');

    evt.currentTarget.value = value;
  }
};
const maskMoney = ({ evt, mask }) => {
  if (mask === 'currency') {
    let value = evt.currentTarget.value;
    value = value
      .replace(/\D/g, '')
      .replace(/(\d)(\d{2})$/, '$1,$2')
      .replace(/(?=(\d{3})+(\D))\B/g, '.');

    evt.currentTarget.value = value;
  }
};

export const chooseMask = ({ evt, mask }) => {
  const masks = {
    cpf: maskCpf({ evt, mask }),
    phone: maskPhone({ evt, mask }),
    zipcode: maskZipcode({ evt, mask }),
    date: maskDate({ evt, mask }),
    currency: maskMoney({ evt, mask }),
  };

  return masks[mask];
};
