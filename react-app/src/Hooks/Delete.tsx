import axios from "axios";
import process from "process";

const DeleteOrder = async (id: string): Promise<any> => {
    const url: string = `${process.env.URL}/api/orders/${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;          
    }
}
export default DeleteOrder;