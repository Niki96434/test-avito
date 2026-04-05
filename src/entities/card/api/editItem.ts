import axios from "axios";
import { type ItemUpdateIn } from "../model/cards.type";

export async function editItem(id: number, data: ItemUpdateIn) {
    try {
        const response = await axios.put(`http://127.0.0.1:8080/items/${id}`, data);
        if (response.status === 200) {
            return response
        } else {
            return null
        }
    } catch (err) {
        console.log(err);
        return null
    }
}