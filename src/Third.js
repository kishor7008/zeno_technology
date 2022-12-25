import { useEffect, useState, useRef } from "react";
export default function Third() {
	const [drag, setDrag] = useState()
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
			return JSON.parse(savedTodos);
		} else {
			return [];
		}
	});
	const [todo, setTodo] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [currentTodo, setCurrentTodo] = useState({});
	const dragItem = useRef()
	const dragOverItem = useRef()
	const handleSort = () => {

		let itemList = [...todos]

		const draggedItemContent = itemList.splice(dragItem.current, 1)[0]
		console.log(draggedItemContent)
		setDrag(draggedItemContent)
		itemList.splice(dragOverItem.current, 0, draggedItemContent)

		dragItem.current = null
		dragOverItem.current = null
		setTodos(itemList)
	}
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	function handleInputChange(e) {
		setTodo(e.target.value);
	}
	function handleEditInputChange(e) {
		setCurrentTodo({ ...currentTodo, text: e.target.value });
		console.log(currentTodo);
	}

	function handleFormSubmit(e) {
		e.preventDefault();

		if (todo !== "") {
			setTodos([
				...todos,
				{
					id: todos.length + 1,
					text: todo.trim()
				}
			]);
		}

		setTodo("");
	}

	function handleEditFormSubmit(e) {
		e.preventDefault();

		handleUpdateTodo(currentTodo.id, currentTodo);
	}

	function handleDeleteClick(id) {
		const removeItem = todos.filter((todo) => {
			return todo.id !== id;
		});
		setTodos(removeItem);
	}
	function handleUpdateTodo(id, updatedTodo) {
		const updatedItem = todos.map((todo) => {
			return todo.id === id ? updatedTodo : todo;
		}); setIsEditing(false);
		setTodos(updatedItem);
	}

	function handleEditClick(todo) {
		setIsEditing(true);
		setCurrentTodo({ ...todo });
	}






	return (
		<div className="App">
			{isEditing ? (
				<form onSubmit={handleEditFormSubmit}>
					<h2>Edit Todo</h2>
					
					<input
						name="editTodo"
						type="text"
						placeholder="Edit todo"
						value={currentTodo.text}
						onChange={handleEditInputChange}
					/>
					<button type="submit">Update</button>
					<button onClick={() => setIsEditing(false)}>Cancel</button>
				</form>
			) : (
				<form onSubmit={handleFormSubmit}>
					<div><button className="bg-success">GREEN</button></div>

					
					<input
						name="todo"
						type="text"
						// placeholder="Create a new todo"
						value={todo}
						onChange={handleInputChange}
                        style={{width:"150px"}}

					/>
					<button type="submit">Add</button>
				</form>
			)}

			<ul className="todo-list">
				{todos.map((todo, index) => (
					<>
					
					<div class="card text-white bg-success mb-3 d-flex" style={{maxWidth: "10rem"}}>
                <div class="card-body d-flex justify-content-between">
              <p class="card-text" draggable
							onDragStart={(e) => (dragItem.current = index)}
							onDragEnter={(e) => (dragOverItem.current = index)}
							onDragEnd={handleSort}
							onDragOver={(e) => e.preventDefault()}>{todo.text}</p>
							<div class="d-flex ">
					<p onClick={() => handleEditClick(todo)} style={{marginRight:"20px"}}><i class="fas fa-edit"></i></p>
						<p onClick={() => handleDeleteClick(todo.id)}><i class="fa-solid fa-xmark"></i></p>
						</div>
					
               </div>
</div>
					</>
				))}
			</ul>
		</div>
	);
}