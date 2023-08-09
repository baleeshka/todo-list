import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useRequestAddTodos, useRequestGetTodos } from '../hooks.js'
import AddToDo from './AddToDo'
import Button from './Button'
import SearchToDo from './SearchTodo'
import TaskList from './TaskList'
import ToDoPage from './ToDoPage.jsx'
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
			<Routes>
				<Route
					path='/task/:id'
					element={
						<ToDoPage
							refreshTodos={refreshTodos}
							setRefreshTodos={setRefreshTodos}
						/>
					}
				/>
				<Route
					path='/'
					element={
						<TaskList
							isLoading={isLoading}
							todos={todos}
							searchQuery={searchQuery}
							isSorted={isSorted}
						/>
					}
				/>
			</Routes>
			<hr />
		</div>
	)
}

export default ToDoList
