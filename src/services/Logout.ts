import Cookies from 'js-cookie';

const logout = () => {
  Cookies.remove('token');
  Cookies.remove('refreshtoken');
  window.location.href = '/login';
};

export default logout  