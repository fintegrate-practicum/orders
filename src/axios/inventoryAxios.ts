import axios from 'axios';

const inventoryServiceURL = process.env.VITE_DOCKER_INVENTORY_SERVER_URL;
if (!inventoryServiceURL) {
  throw new Error(
    'VITE_INVENTORY_SERVICE_URL is not defined in the environment variables',
  );
}
const axiosInstance = axios.create({
  baseURL: inventoryServiceURL,
});
export default axiosInstance;
