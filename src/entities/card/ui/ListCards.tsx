import { type CardsProps } from "../model/cards.type";
export default function ListCards<T>({ data, renderItem }: CardsProps<T>) {

    const ItemsList = data.map(renderItem);

    return ItemsList
}