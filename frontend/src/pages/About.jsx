import { useState } from "react";
import Back from "../components/back";

export default function About({}) {

    const [data, setData] = useState([
        {id: 1, name: 'item 1'},
        {id: 2, name: 'item 2'},
        {id: 3, name: 'item 3'},

    ])
    const [selectedIds, setSelectedIds] = useState([]);

    const handleChange = (e) => {
        const id = parseInt(e.target.value, 10);

        if (e.target.checked) {
            setSelectedIds([...selectedIds, id]);
        }else{
            selectedIds(selectedIds.filter( (selectedId) => selectedId !== id));
        }

    };
    const handleDelete = () => {
        const newData = data.filter( (item) => !selectedIds.includes(item.id));
        setData(newData);
        selectedIds([]);
    }
    return(
        <div className="">
            <Back href={"home"} title={"About"}/>
            <ul>
                {
                    data.map((item) => (
                        <li key={item.id}>
                            <input type="checkbox"
                                value={item.id} checked={selectedIds.includes(item.id)}
                                onChange={handleChange}
                            />
                            {item.name}
                        </li>
                    ))
                }
            </ul>
            <button onClick={handleDelete} disabled={selectedIds.length === 0}>
                delete
            </button>
        </div>
    );
}