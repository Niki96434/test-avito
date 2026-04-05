import { useEffect, useState } from "react"
import { getItem } from "../entities/card/api/getItem"
import { SingleItem } from "../entities/card/model/cards.type";
import { useParams } from "react-router-dom";
import ItemView from "../entities/card/ui/ItemView";
export default function ItemViewPage() {

    const params = useParams();

    const [item, setItem] = useState<SingleItem | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const item = await getItem(Number(params.id));
            console.log(item);
            setItem(item);
        }
        loadData();
    }, [params.id])
    if (item === null) {
        return <div>Загрузка...</div>
    }
    return <ItemView data={item} />
}