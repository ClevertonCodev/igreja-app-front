import jwtDecode from 'jwt-decode';
import Authorization from '../components/token/auth/Authorization';

function UserData() {
  const tokencustomizado = Authorization();
  const decodedToken = jwtDecode<{ name: string, type: string }>(tokencustomizado);

    return decodedToken

}
export default UserData

