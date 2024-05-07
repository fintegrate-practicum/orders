import axios from 'axios';
import process from 'process';
import { useState } from 'react';
export const DeleteOrder = async (id: string): Promise<any> => {
    const url: string = `${process.env.URL}/api/orders/${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
}
export const GetAllOrders = (): [() => Promise<void>, any, boolean, any] => {
    const url: string = `${process.env.URL}/api/orders`;
    const [res, setRes] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const get = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setRes(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return [get, res, loading, error];
};
export const GetOrdersByUser = (id: string): [() => Promise<void>, any, boolean, any] => {
    const url: string = `${process.env.URL}/api/orders/${id}`;
    const [res, setRes] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const get = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setRes(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return [get, res, loading, error];
};
export const AddAnOrder = async (order: any): Promise<any> => {
    const url: string = `${process.env.URL}/api/orders`;
    try {
        const response = await axios.post(url, order);
        return response.data;
    } catch (error) {
        console.error("Error adding order:", error);
        throw error;
    }
};
export const UpdateOrder = async (id: string, order: any): Promise<any> => {
    const url: string = `${process.env.URL}/api/orders/${id}`;
    try {
        const response = await axios.put(url, order);
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
};