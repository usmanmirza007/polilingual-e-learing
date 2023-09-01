import qs from 'querystringify';
import { tronLog } from 'app-common';
import { Alert } from 'react-native';
import { SITE_URL } from 'app-config';
import { store } from '../index';
import { saveUserToken, setUser } from '../actions/user';
import { navigate } from '../actions/navigation';

// base_Url moved to src/config/index.js

let HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const callRequestWithTimeOut = async (request) => {
  const promise2 = new Promise((resolve) => {
    setTimeout(resolve, 15000, null);
  });

  // eslint-disable-next-line new-cap
  const resultRace = await new Promise.race([request, promise2]);

  return resultRace;
};

const onResponse = async (request, result) => {
  try {
    const body = await result.text();
    const newBody = JSON.parse(body);
    // tronLog(request, result, newBody);
    if (result.status === 401) {
      store.dispatch(saveUserToken(null));
      store.dispatch(setUser(null));

      Alert.alert('Not logged in', 'Please login to continue.', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Login',
          onPress: () => store.dispatch(navigate('LoginScreen')),
        },
      ]);

      return null;
    }
    // Response is json but not a successful response
    if (result.status !== 200 && result.status !== 201) {
      // const exception = {
      //   exception: newBody,
      //   type: 'object',
      // };
      // tronLog('result', newBody);
      return newBody;
    }

    // SUCCESS: Return valid response
    return newBody;
  } catch (e) {
    tronLog('3', result);
    if (e?.type === 'object') return null;
    // console.log(result.status, result._bodyText); // uncomment this line if unexpected error occured
    // SUCCESS: when response is {} and status 200 but parsing JSON failed. Still is success response
    if (result.status === 200) return null;
    // // FAILED: Throw unknown exceptions
    // const exception = {
    //   exception: result,
    //   type: 'raw',
    // };
    return null;
  }
};

const config = {
  post: async (endpoint: string, params: Object) => {
    const url = SITE_URL + endpoint;
    console.debug(url);
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: HEADERS,
    };
    const request = {
      url,
      options,
    };

    return callRequestWithTimeOut(
      fetch(url, options).then((result) => onResponse(request, result))
    );
  },

  get: async (endpoint, params = {}, randomVersion = true) => {
    const queryParam = { ...params };
    if (randomVersion) {
      queryParam.v = Math.floor(Math.random() * 999999999);
    }

    // eslint-disable-next-line new-cap, prettier/prettier
    const url = `${SITE_URL}${endpoint}${qs.stringify( { ...queryParam }, true )}`;

    console.debug(url);

    const options = {
      method: 'GET',
      headers: HEADERS,
    };

    const request = { url, options };

    return callRequestWithTimeOut(
      fetch(url, options).then((result) => onResponse(request, result))
    );
  },

  put: async (endpoint: string, params: Object) => {
    const url = SITE_URL + endpoint;
    const options = {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(params),
    };
    const request = {
      url,
      options,
    };
    return callRequestWithTimeOut(
      fetch(url, options).then((result) => onResponse(request, result))
    );
  },

  delete: async (endpoint: string, params: Object) => {
    const url = `${SITE_URL}${endpoint}${qs.stringify(params, true)}`;
    const options = {
      method: 'DELETE',
      headers: HEADERS,
    };
    const request = {
      url,
      options,
    };
    return callRequestWithTimeOut(
      fetch(url, options).then((result) => onResponse(request, result))
    );
  },

  multipartPost: async (endpoint: string, params: Object) => {
    const url = SITE_URL + endpoint;
    const options = {
      method: 'POST',
      body: params,
      headers: { ...HEADERS, 'Content-Type': 'multipart/form-data' },
    };

    const request = {
      url,
      options,
    };
    return fetch(url, options).then((result) => onResponse(request, result));
  },
};

const getApiUrl = () => SITE_URL;
const setToken = (_token: string) => {
  HEADERS = {
    ...HEADERS,
    Authorization: `Bearer ${_token}`,
  };
};

const setClientLocale = (locale = 'vi') => {
  HEADERS = {
    ...HEADERS,
    'x-client-locale': locale,
  };
};
export { config, getApiUrl, setToken, setClientLocale };
