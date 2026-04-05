import axios from "axios";

export async function getItem(id: number) {
    try {
        const response = await axios.get(`http://127.0.0.1:8080/items/${id}`);
        if (response !== null) {
            return response.data
        } else {
            return []
        }
    } catch (err) {
        console.log(err);
        return null
    }

}