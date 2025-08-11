import React, { useState } from "react";
import "./App.css"

const createRow = ({num, row}) => {
    return (
        <>
            {Array.from({length: num}, (id, ind) => {return ind}).map(i => (
                <td key={i}>
                    {(i + 1)*(row + 1)}
                </td>
            ))}
        </>
    )
}

const createTable = ({num}) => {
    return (
        <>
            {Array.from({length: num}, (id, ind) => {return ind}).map(i => (
                <tr key={i}>
                    {createRow({num: num, row: i})}
                </tr>
            ))}
        </>
    )
}


export default function App() {
    const [size, setSize] = useState(5); // Default size

    return (
        <div>
            <label>
                Table Size:
                <input
                    type="number"
                    value={size}
                    min="1"
                    onChange={(e) => setSize(Number(e.target.value))}
                />
            </label>

            <table>
                <tbody>
                    {createTable({num: size})}
                </tbody>
            </table>
        </div>
    );
}
