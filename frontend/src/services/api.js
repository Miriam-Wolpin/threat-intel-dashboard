import axios from 'axios';

export async function fetchIntel(ip) {
  const response = await axios.get(`http://localhost:3001/api/intel`, {
    params: { ip }
  });
  return response.data;
}
