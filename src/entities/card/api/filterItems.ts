import axios from "axios";
import { FilterState, SingleItem } from "../model/cards.type";

export async function filterItems(filterState: FilterState, inputValue: string): Promise<SingleItem[] | []> {
    try {
        const param = new URLSearchParams();

        if (filterState.needsRevision) {
            param.append('needsRevision', filterState.needsRevision.toString());
        }
        if (filterState.category) {
            param.append('categories', filterState.category);
        }

        if (inputValue) {
            param.append('q', inputValue);
        }

        if (filterState.sortColumn) {
            param.append('sortColumn', filterState.sortColumn)
        }

        if (filterState.sortDirection) {
            param.append('sortDirection', filterState.sortDirection)
        }

        param.append('limit', '32');
        const response = await axios.get(`http://127.0.0.1:8080/items?${param}`);
        if (response.data.items) {
            return response.data.items
        } else {
            return []
        }

    } catch (err) {
        console.log(err);
        return []
    }

}