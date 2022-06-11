import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { AuthHeader } from './authHeader'

const headers = AuthHeader();
const USER = 'mjengoSmartUser';

class AuthService {
	login(email, password) {
		return axios.post(
      '/api/authenticate',
      { email, password },
      { headers }
    );
	}

	logout() {
    localStorage.removeItem(USER);
		return {};
	}

	register(firstName, middleName, lastName, email, password) {
		return axios.post(
      '/api/register',
      { firstName, middleName, lastName, email, password, role: 1 },
      { headers }
    );
	}

  verifyToken(tokenVal) {
    let token;
    if (tokenVal=== undefined)
      token = ""
    else
      token = tokenVal
    return axios.post(
      '/api/verifyToken',
      { token },
      { headers }
    );
  }

	getCurrentUser() {
		return localStorage.getItem(USER)
      ? jwt_decode(JSON.parse(localStorage.getItem(USER))?.token)
      : '';
	}
}


export default new AuthService()
