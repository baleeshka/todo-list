import React, { useEffect, useState } from 'react'
import ToDo from './ToDo'
import styles from './Todos.module.css'

const ToDoList = () => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)

		setTimeout(() => {
			fetch('https://jsonplaceholder.typicode.com/todos')
				.then(loadedData => loadedData.json())
				.then(loadedTodos => {
					setTodos(loadedTodos)
				})
				.finally(() => setIsLoading(false))
		}, 2000)
	}, [])

	return (
		<div className={styles.toDoList}>
			<div className={styles.header}>Список дел:</div>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				todos.map(({ id, title }) => (
					<ToDo key={id} className={styles.todo} id={id} title={title} />
				))
			)}
		</div>
	)
}

export default ToDoList
