import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function queryProduct(params?: TableListParams) {
  return request('/api/item', {
    params,
  });
}

export async function removeProduct(params: { id: number[] }) {
  return request('/api/item', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addProduct(params: TableListItem) {
  return request('/api/add', {
    method: 'POST',
    data: {
      name: params.name
    }
  });
}

export async function updateProduct(params: TableListParams) {
  return request('/api/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function createOrder(params: { key: number[] }) {
  return request('/api/item', {
    method: 'POST',
    data: {
      ...params,
      method: 'create',
    },
  });
}
