const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const sendRequest = (onSuccess, onError, route = '', method = Method.GET, body) =>{
  fetch (
    `${BASE_URL}${route}`,
    {
      method: method,
      body: body,
    },
  )
    .then((response) => {
      if (response.ok){
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch((err) => {
      onError(err);
    });
};

const loadData = (onSuccess, onError, route = '/data') => sendRequest(onSuccess, onError, route);

const uploadData = (onSuccess, onFail, body, route = '', method = Method.POST) => sendRequest(onSuccess, onFail, route, method, body);

export{loadData, uploadData};
