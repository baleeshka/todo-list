import React, { useState } from 'react'
import AddToDo from './AddToDo'
import ToDo from './ToDo'
import styles from './Todos.module.css'
import {
	useRequestGetTodos,
	useRequestAddTodos,
	useRequestDeleteTodos,
	useRequestUpdateTodos,
} from '../hooks.js'
import SearchToDo from './SearchTodo'
import Button from './Button'

const ToDoList = () => {
	const [refreshTodos, setRefreshTodos] = useState(false)
	const [newTodos, setCreateNewTodos] = useState('')
	const [searchQuery, setSearchQuery] = useState('')
	const [isSorted, setIsSorted] = useState(false)

	const { todos, isLoading } = useRequestGetTodos()

	const { requestAddTodos, isCreating } = useRequestAddTodos(
		refreshTodos,
		setRefreshTodos
	)

	const { requestDeleteTodos, isDeleting } = useRequestDeleteTodos(
		refreshTodos,
		setRefreshTodos
	)

	const { requestUpdateTodos, isUpdating } = useRequestUpdateTodos(
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
			) : Object.entries(todos).length === 0 ? (
				<div className={styles.emptyListText}>Список задач пуст</div>
			) : (
				Object.entries(todos)
					.filter(([, { title }]) =>
						title.toLowerCase().includes(searchQuery.toLowerCase())
					)
					.sort(([, a], [, b]) =>
						isSorted ? a.title.localeCompare(b.title) : 0
					)
					.map(([id, { title }]) => (
						<ToDo
							key={id}
							id={id}
							title={title}
							isDeleting={isDeleting}
							requestDeleteTodos={requestDeleteTodos}
							isUpdating={isUpdating}
							requestUpdateTodos={requestUpdateTodos}
						/>
					))
			)}

			<hr />
		</div>
	)
}

export default ToDoList