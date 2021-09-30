export const state = () => ({
  jwtToken: null,
});

export const mutations = {
  updateJWTToken(state, token) {
    console.log('updateJWTToken');
    state.jwtToken = token;
    if (process.client) {
      const payload = parseJwt(token);
      setCookie('jwtToken', token, payload.exp * 1000);
    }
  },
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    console.log('nuxtServerInit');
    const jwtToken = getCookie(req.headers.cookie, 'jwtToken');
    if (jwtToken) {
      commit('updateJWTToken', jwtToken);
    }
  },
  recordLoginInfo(context, loginData) {
    console.log('recordLoginInfo');
    console.log(loginData);
    context.commit('updateJWTToken', loginData.token);
  },
};

export const getters = {
  userToken(state) {
    return state.jwtToken;
  },
};

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function setCookie(name, value, milliseconds) {
  var expires = "";
  if (milliseconds) {
    var date = new Date();
    date.setTime(milliseconds);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(cookie, name) {
  var nameEQ = name + "=";
  var ca = cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
