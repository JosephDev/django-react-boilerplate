import { encodeParamsToURI } from 'sugar';

async function getApi(url, data) {
  try {
    if (data) {
      url = encodeParamsToURI(url, data);
    }
    const _res = await fetch(url,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const _data = await _res.json();
    return { state: true, response: _data };
  } catch (error) {
    return { state: false, response: error };
  }
}

async function dataPostApi(_type, url, data) {
  try {
    const _res = await fetch(url,
      {
        method: _type,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const _data = await _res.json();

    return { state: true, response: _data };
  } catch (error) {
    return { state: false, response: error };
  }
}

async function postApi(url, data) {
  return dataPostApi('POST', url, data);
}

async function putApi(url, data) {
  return dataPostApi('PUT', url, data);
}

async function patchApi(url, data) {
  return dataPostApi('PATCH', url, data);
}

function deleteApi(url, data) {
  return dataPostApi('DELETE', url, data);
}

const get = getApi;
const post = postApi;
const put = putApi;
const patch = patchApi;
const del = deleteApi;

export {
  get,
  post,
  put,
  patch,
  del,
};
