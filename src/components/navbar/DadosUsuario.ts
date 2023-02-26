import jwtDecode from 'jwt-decode';
import Authorization from '../token/auth/index';

function DadosUsuario() {
  const tokencustomizado = Authorization();
  const decodedToken = jwtDecode<{ name: string, type: string }>(tokencustomizado);

    return decodedToken


}
export default DadosUsuario

