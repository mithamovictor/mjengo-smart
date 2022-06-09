import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { AuthHeader } from './authHeader'

const headers = AuthHeader();
const USER = 'mjengoSmartUser';

class AuthService {
	login(username, password) {
		return axios.post( '/api/authenticate', { username, password }, { headers })
      .then(response=>{
        const data = JSON.stringify(response?.data)
        if (localStorage.getItem(USER))
          localStorage.removeItem(USER);
        if(response?.data?.token)
          localStorage.setItem(USER, data)
        return response.data
      }).catch(err=>{ return err; });
	}

	logout() {
    if (localStorage.getItem(USER))
      localStorage.removeItem(USER);
		window.location.reload();
		return {};
	}

	register(firstName, middleName, lastName, email, password) {
		return axios.post('/api/register', { firstName, middleName, lastName, email, password }, { headers })
      .then(response=>{
        if (localStorage.getItem(USER))
          localStorage.removeItem(USER);
        const data =  response.data;
        return data;
      }).catch(err=>{ return err; })
	}

	getCurrentUser() {
		return localStorage.getItem('user')
            ? jwt_decode(JSON.parse(localStorage.getItem(USER))?.token)?.sub
            : '';
	}
}


export default new AuthService()
