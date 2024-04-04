import axios from "axios";

const UpdateOrder = async (id: string, order: any): Promise<any> => {
    const url: string = `${process.env.URL}/api/orders/${id}`;
    try {
        const response = await axios.put(url, order);
        return response.data; 
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
};

export default UpdateOrder;