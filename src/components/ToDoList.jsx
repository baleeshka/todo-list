import React, { useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import {
	useRequestAddTodos,
	useRequestDeleteTodos,
	useRequestGetTodos,
	useRequestUpdateTodos,
} from '../hooks.js'
import AddToDo from './AddToDo'
import Button from './Button'
import SearchToDo from './SearchTodo'
import ToDo from './ToDo.jsx'
import styles from './Todos.module.css'

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
		<Router>
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
				<Switch>
					<Route
						path='/task/:id'
						render={props => (
							<ToDo
								{...props}
								todos={todos}
								refreshTodos={refreshTodos}
								setRefreshTodos={setRefreshTodos}
							/>
						)}
					/>
					<Route
						path='/'
						render={() => (
							<TaskList
								todos={todos}
								searchQuery={searchQuery}
								isSorted={isSorted}
							/>
						)}
					/>
				</Switch>
				<hr />
			</div>
		</Router>
	)
}

export default ToDoList
