import api from 'services';

export const getProducts = async () => {
  try {
    const response = await api.get('/inventory/item');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }

};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/inventory/item/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }
}

export const getVendors = async () => {
  try {
    const response = await api.get('/vendor');
    return response.data;
  } catch (error) {
    throw new Error('Houve um problema com a chamada');
  }
};


export const getVendorHasItem = async (id) => {
  try {
    const response = await api.get(`/inventory/item/vendor/vendorhasitem/${id}`)
    return response.data;
  } catch(error) {
    throw new Error('Houve um problema com a chamada');
  }
}

export const getItemHasVendor = async (id) => {
  try {
    const response = await api.get(`/inventory/item/vendor/itemhasvendor/${id}`);
    return response.data;
  } catch(error) {
    throw new Error('Houve um problema com a chamada');
  }
}

export const getAllTransactions = async () => {
  try {
    const response = await api.get('/inventory/transactions/')
    return response.data;
  } catch(error) {
    throw new Error('Houve um problema com a chamada')
  }
}