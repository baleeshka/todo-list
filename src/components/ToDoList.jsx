import React, { useState } from 'react'
import { useRequestAddTodos, useRequestGetTodos } from '../hooks.js'
import AddToDo from './AddToDo'
import Button from './Button'
import SearchToDo from './SearchTodo'
import styles from './Todos.module.css'
import ToDoTitle from './ToDoTitle.jsx'

const ToDoList = () => {
	const [refreshTodos, setRefreshTodos] = useState(false)
	const [newTodos, setCreateNewTodos] = useState('')
	const [searchQuery, setSearchQuery] = useState('')
	const [isSorted, setIsSorted] = useState(false)

	const { todos, isLoading } = useRequestGetTodos(refreshTodos)

	const { requestAddTodos, isCreating } = useRequestAddTodos(
		refreshTodos,
		setRefreshTodos
	)

	const onSubmit = event => {
		event.preventDefault()

		if (!newTodos) {
			return
		}

		sendFormData(newTodos)
		setCreateNewTodos('')
	}

	const sendFormData = formData => {
		requestAddTodos(formData)
	}

	const onNewTodosChange = ({ target }) => {
		setCreateNewTodos(target.value)
	}

	return (
		<div className={styles.toDoList}>
			<div className={styles.actionsContainer}>
				<AddToDo
					onSubmit={onSubmit}
					isCreating={isCreating}
					value={newTodos}
					onChange={onNewTodosChange}
				/>
				<SearchToDo
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
				<Button
					onClick={() => setIsSorted(!isSorted)}
					style={styles.sortButton}
				>
					{isSorted ? (
						<i className='fas fa-sort-alpha-down'></i>
					) : (
						<i className='fas fa-sort'></i>
					)}
				</Button>
			</div>
			<div className={styles.header}>Задачи:</div>
			<hr />
			{isLoading ? (
				<div className={styles.loader}></div>
			) : todos.length === 0 ? (
				<div className={styles.emptyListText}>Список задач пуст</div>
			) : (
				todos
					.filter(({ title }) =>
						title.toLowerCase().includes(searchQuery.toLowerCase())
					)
					.sort((a, b) => (isSorted ? a.title.localeCompare(b.title) : 0))
					.map(({ id, title }) => <ToDoTitle id={id} key={id} title={title} />)
			)}

			<hr />
		</div>
	)
}

export default ToDoList
