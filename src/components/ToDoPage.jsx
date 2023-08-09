import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRequestDeleteTodos, useRequestUpdateTodos } from '../hooks.js'
import Button from './Button'
import Form from './Form'
import Input from './Input'
import styles from './Todos.module.css'

const TodoPage = ({ todos, refreshTodos, setRefreshTodos }) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [editedValue, setEditedValue] = useState('')
	const [currentTodo, setCurrentTodo] = useState(null)

	const { requestDeleteTodos } = useRequestDeleteTodos(
		refreshTodos,
		setRefreshTodos
	)
	const { requestUpdateTodos } = useRequestUpdateTodos(
		refreshTodos,
		setRefreshTodos
	)

	useEffect(() => {
		const todo = todos.find(todo => todo.id === id)
		setCurrentTodo(todo)
	}, [id, todos])

	const onTodosChange = ({ target }) => {
		setEditedValue(target.value)
	}

	const onSubmit = event => {
		event.preventDefault()

		if (!editedValue) {
			return
		}

		sendFormData(editedValue)
	}

	const sendFormData = formData => {
		requestUpdateTodos(formData, id)
		setEditedValue('')
	}

	const handleDelete = () => {
		requestDeleteTodos(id)
		navigate('/')
	}

	const handleUpdate = () => {
		setEditedValue(currentTodo.title)
	}

	if (!currentTodo) {
		return <div>Loading...</div>
	}

	return (
		<>
			<div>
				{editedValue !== '' ? (
					<Form onSubmit={onSubmit}>
						<Input
							name='taskName'
							type='text'
							placeholder='Измените задачу'
							value={editedValue}
							onChange={onTodosChange}
						/>
						<Button type='submit' style={styles.createButton}>
							Save
						</Button>
					</Form>
				) : (
					<span>{currentTodo.title}</span>
				)}
			</div>

			<div className={styles.buttonContainer}>
				<Button onClick={handleUpdate} style={styles.editButton}>
					Edit
				</Button>
				<Button onClick={handleDelete} style={styles.deleteButton}>
					Delete
				</Button>
			</div>
		</>
	)
}

export default TodoPage
