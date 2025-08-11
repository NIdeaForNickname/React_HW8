import React, {useEffect, useState} from "react";
import { createPortal } from "react-dom";
import "./App.css"

const Modal = ({isOpen, onClose, modalContainer}) => {
    if (!isOpen || !modalContainer) return null;

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Limit reached</h2>
                <p className="modal-text">Multiplication table size should not exceed 20</p>
                <button className="modal-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>,
        modalContainer
    )
}

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

function CreateTable({num}) {
    console.log(num)
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
    const [size, setSize] = useState(5);
    const [showPortal, setShowPortal] = useState(false);
    const [modalContainer, setModalContainer] = useState(null);

    useEffect(() => {
        const div = document.createElement("div");
        div.id = "modal-root"
        document.body.appendChild(div);
        setModalContainer(div);

        return () => {
            document.body.removeChild(div);
        }
    }, [])

    return (
        <div>
            <label>
                Table Size:
                <input
                    type="number"
                    value={size}
                    min="1"
                    onChange={(e) => {
                        const newVal = Number(e.target.value);
                        if (newVal > 20) setShowPortal(true);
                        else setSize(newVal);
                    }}
                />
                <Modal
                    isOpen={showPortal}
                    onClose ={() => setShowPortal(false)}
                    modalContainer={modalContainer}
                />

            </label>


            <table>
                <tbody>
                    <CreateTable num={size} />
                </tbody>
            </table>
        </div>
    );
}
