import React, { useState } from "react"
import "./App.css"
import { useRef } from "react"

function Third() {
    const [drag, setDrag] = useState()
    const [fruitItems, setFruitItems] = React.useState([
        "Woldcup",
        "IPL",
        
    ])
    const [newFruitItem, setNewFruitItem] = useState("")
    const dragItem = useRef()
    const dragOverItem = useRef()
    const handleSort = () => {
        let _fruitItems = [...fruitItems]
        const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0]
        console.log(draggedItemContent)
        setDrag(draggedItemContent)
        _fruitItems.splice(dragOverItem.current, 0, draggedItemContent)

        dragItem.current = null
        dragOverItem.current = null
        setFruitItems(_fruitItems)
    }
    const handleNameChange = (e) => {
        setNewFruitItem(e.target.value)
    }
    const handleAddItem = () => {
        if (fruitItems.length == 8) {
            return;
        }
        const _fruitItems = [...fruitItems]
        _fruitItems.push(newFruitItem)
        setFruitItems(_fruitItems)
    }
    const deleteId = (id) => {

        const fruit = fruitItems;
        const g = fruit.splice(id, 1);
        setFruitItems(g)
    }
    return (
        <div className="app">
            <h2>GREEN</h2>
            <div className="input-group">
                <input
                    type="text"
                    name="fruitName"
                  
                    onChange={handleNameChange}
                />
                <button className="btn" onClick={handleAddItem}>
                    Add 
                </button>
            </div>

            <div className="list-container">
                {fruitItems.map((item, index) => (
                    <>
                        <div
                            key={index}
                            className="list-item"
                            draggable
                            onDragStart={(e) => (dragItem.current = index)}
                            onDragEnter={(e) => (dragOverItem.current = index)}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()}>
                            <div className="card text-white bg-success mb-3" style={{ maxWidth: "10rem" }}>
                                <div className="card-body d-flex justify-content-between">

                                    <p className="card-text">{item}</p>
                                    <p ><i className="fa fa-times" aria-hidden="true" onClick={() => {

                                    }}></i></p>
                                </div>
                            </div>

                        </div>
                    </>
                ))}
            </div>

        </div>
    )
}

export default Third