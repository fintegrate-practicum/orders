// import { useState } from 'react';
// import axios from 'axios';

// const GetOrdersByUser = (id: string): [() => Promise<void>, any, boolean, any] => {
//     const url: string = `${process.env.URL}/api/orders/${id}`;

//     const [res, setRes] = useState<any>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<any>(null);

//     const get = async (): Promise<void> => {
//         setLoading(true);
//         try { 
//             const response = await axios.get(url);
//             setRes(response.data);
//         } catch (error) { 
//             setError(error);
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     return [get, res, loading, error];
// };
// export default GetOrdersByUser;
