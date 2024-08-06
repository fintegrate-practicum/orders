import axios from 'axios';
import * as dotenv from 'dotenv';
import { join } from 'path';
// Specify the path to your .env file relative to the current file
const envPath = join(__dirname, '..', '..', 'infrastructure', '.env');
// Load environment variables from the specified .env file
dotenv.config({ path: envPath });
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
