import axios from "axios";
import Token from "../components/token/Token";

export async function refreshToken(): Promise<string> {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/v1/refresh',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': Token(),
      }
    });
    if(response){
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    document.cookie = 'token=' + response.data.token;
    return response.data.token
  } catch (error) {
    return 'erro'
  }
}
