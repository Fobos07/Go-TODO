import axios from 'axios';

const API_URL = 'http://localhost:8080'; // URL вашего бэкенда

export const getTodos = async () => {
    return await axios.get(`${API_URL}/todos`);
};

export const createTodo = async (todo) => {
    return await axios.post(`${API_URL}/todos/create`, todo);
};

export const updateTodo = async (todo) => {
    return await axios.put(`${API_URL}/todos/update`, todo);
};

export const deleteTodo = async (id) => {
    return await axios.delete(`${API_URL}/todos/delete`, { params: { id } });
};
