import api from 'services';

export const getProducts = async () => {
  const response = await api.get('/inventory/item');

  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/inventory/item/${id}`);
  return response.data;
}

export const getVendors = async () => {
  const response = await api.get('/vendor');

  return response.data;
};


export const getVendorHasItem = async (id) => {
  const response = await api.get(`/inventory/item/vendor/vendorhasitem/${id}`)
  return response.data;
}

export const getItemHasVendor = async (id) => {
  const response = await api.get(`/inventory/item/vendor/itemhasvendor/${id}`);
  return response.data;
}