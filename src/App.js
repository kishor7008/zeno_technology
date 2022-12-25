import React, { useState } from "react"
import "./App.css"
import { useRef } from "react"
import Second from "./Second"
import Third from "./Third"
import Four from "./Four"
function App() {
	const [drag, setDrag] = useState()
	const [fruitItems, setFruitItems] = React.useState([
		"Ball",
		"Bat",
		"tennis",
	])
	const [newFruitItem, setNewFruitItem] = useState("")

	//save reference for dragItem and dragOverItem
	const dragItem = useRef()
	const dragOverItem = useRef()

	//const handle drag sorting
	const handleSort = () => {
		//duplicate items
		let _fruitItems = [...fruitItems]

		//remove and save the dragged item content
		const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0]
		console.log(draggedItemContent)
		setDrag(draggedItemContent)
		//switch the position
		_fruitItems.splice(dragOverItem.current, 0, draggedItemContent)

		//reset the position ref
		dragItem.current = null
		dragOverItem.current = null

		//update the actual array
		setFruitItems(_fruitItems)
	}

	//handle name change
	const handleNameChange = (e) => {
		setNewFruitItem(e.target.value)
	}

	//handle new item addition
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
		console.log(fruit)
		setFruitItems(fruit)
	}
	return (
		<div className="d-flex  justify-content-between">
		<div className="app  ">
			<div>
			<h2>RED</h2>
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

			{/** List container //TODO break into component */}
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
							{/* <i className="fa-solid fa-bars"></i> */}
							<div className="card text-white bg-danger mb-3" style={{ maxWidth: "10rem" }}>
								<div className="card-body d-flex justify-content-between">

									<p className="card-text">{item}</p>
									<p ><i className="fa fa-times" aria-hidden="true" onClick={() => {
                                    deleteId(index)
									}}></i></p>
								</div>
							</div>

						</div>
					</>
				))}
			</div>
			
		</div>
		</div>
		<Second/>
			<Third/>
			<Four/>
		</div>
	)
}

export default App