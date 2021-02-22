import { stringify } from 'query-string';
import {
  Identifier,
  Pagination,
  Sort,
  Filter,
  fetchUtils,
  DataProvider,
} from 'ra-core';

export {
  default as tokenAuthProvider,
  fetchJsonWithAuthToken,
} from './tokenAuthProvider';

const getPaginationQuery = (pagination: Pagination) => {
  return {
    page: pagination.page,
    page_size: pagination.perPage,
  };
};

const getFilterQuery = (filter: Filter) => {
  const { q: search, ...otherSearchParams } = filter;
  return {
    ...otherSearchParams,
    search,
  };
};

export const getOrderingQuery = (sort: Sort) => {
  const { field, order } = sort;
  return {
    ordering: `${order === 'ASC' ? '' : '-'}${field}`,
  };
};

export default (
  apiUrl: String,
  httpClient: Function = fetchUtils.fetchJson
): DataProvider => {
  const getOneJson = (resource: String, id: Identifier) =>
    httpClient(`${apiUrl}/${resource}/${id}/`).then(
      (response: Response) => response.json
    );

  return {
    getList: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
        ...getPaginationQuery(params.pagination),
        ...getOrderingQuery(params.sort),
      };
      const url = `${apiUrl}/${resource}/?${stringify(query)}`;

      const { json } = await httpClient(url);

      return {
        data: json.results,
        total: json.count,
      };
    },

    getOne: async (resource, params) => {
      const data = await getOneJson(resource, params.id);
      return {
        data,
      };
    },

    getMany: (resource, params) => {
      return Promise.all(
        params.ids.map(id => getOneJson(resource, id))
      ).then(data => ({ data }));
    },

    getManyReference: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
        ...getPaginationQuery(params.pagination),
        ...getOrderingQuery(params.sort),
        [params.target]: params.id,
      };
      const url = `${apiUrl}/${resource}/?${stringify(query)}`;

      const { json } = await httpClient(url);
      return {
        data: json.results,
        total: json.count,
      };
    },

    update: async (resource, params) => {

      /// encode base64 images
      var newPictures = [];
      for( let item in params.data ) {
        if(item === 'image') {
             if(params.data.image.rawFile instanceof File) {
                newPictures.push(params.data[item]);
             } else {
                delete params.data[item];
             }
        }
      }
      //console.log(newPictures);
      await Promise.all(newPictures.map(convertFileToBase64))
      .then(base64Pictures => {
          base64Pictures.map(picture64 => {
              params.data.image = picture64;
          })
        }
      )
      ////////////////

      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}/`, {
        method: 'PATCH',
        body: JSON.stringify(params.data),
      });
      return { data: json };

    },


    updateMany: (resource, params) =>
      Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/${resource}/${id}/`, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
          })
        )
      ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

    create: async (resource, params) => {
      const { json } = await httpClient(`${apiUrl}/${resource}/`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      });
      return {
        data: { ...json },
      };
    },

    delete: (resource, params) =>
      httpClient(`${apiUrl}/${resource}/${params.id}/`, {
        method: 'DELETE',
      }).then(() => ({ data: params.previousData })),

    deleteMany: (resource, params) =>
      Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/${resource}/${id}/`, {
            method: 'DELETE',
          })
        )
      )
      .then(responses => ({ data: responses.map(() => 'json.id') })),
  };
};


const convertFileToBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });