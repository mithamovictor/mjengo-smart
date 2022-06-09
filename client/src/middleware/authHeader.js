const USER = 'mjengoSmartUser';

/**
 * Set Headers for axios
 * @returns headers
 */
export const AuthHeader = () => {
  const user = JSON.parse(localStorage.getItem(USER));
  if (user && user?.token)
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.token}`
    };
  else
    return {
			'Content-Type': 'application/json'
    };
}

