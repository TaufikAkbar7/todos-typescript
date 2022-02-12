import axios from "axios";

export const URL = 'https://jsonplaceholder.typicode.com'

export const fetchTodos = async () => {
    try {
        return await axios.get(`${URL}/users/1/todos`)
    } catch (error) {
        return {}
    }
}