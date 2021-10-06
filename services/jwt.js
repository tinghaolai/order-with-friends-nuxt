import { eraseCookie } from '~/services/cookie'
import axios from "axios";

export function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function ifJWTExpired(token) {
  const payload = parseJwt(token);

  return Date.now() > payload.exp * 1000;
}

export function removeJWT() {
  eraseCookie('jwtToken');
}

export function tokenRefresh(refreshToken, apiUrl) {
  return new Promise((resolve, reject) => {
    axios.post(apiUrl + '/v1/tokenRefresh', {
        refreshToken: refreshToken,
      }
    ).then(response => {
      if (response.data.status === 0) {
        resolve(response.data.data);
      } else {
        reject();
      }
    }).catch(error => {
        reject();
    });
  });
}
