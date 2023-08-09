import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRequestDeleteTodos, useRequestUpdateTodos } from '../hooks.js'
import Button from './Button'
import Form from './Form'
import Input from './Input'
import styles from './Todos.module.css'

const TodoPage = ({ refreshTodos, setRefreshTodos }) => {
	const { id } = useParams()
	const navigate = useNavigate()
	const location = useLocation()
	const titleFromProps = location.state && location.state.title

	const [editedValue, setEditedValue] = useState(titleFromProps || '')
	const [isEditing, setIsEditing] = useState(false)
	const [currentTitle, setCurrentTitle] = useState(titleFromProps || '')

	const { requestDeleteTodos } = useRequestDeleteTodos(
		refreshTodos,
		setRefreshTodos
	)
	const { requestUpdateTodos } = useRequestUpdateTodos(
		refreshTodos,
		setRefreshTodos
	)

	const onTodosChange = ({ target }) => {
		setEditedValue(target.value)
	}

	const onSubmit = event => {
		event.preventDefault()

		if (!editedValue) {
			return
		}

		sendFormData(editedValue)
		setIsEditing(false)
		setCurrentTitle(editedValue)
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
		setIsEditing(true)
	}

	const titleToShow = isEditing ? editedValue : currentTitle

	return (
		<>
			<div>
				{isEditing ? (
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
					<span>{titleToShow}</span>
				)}
			</div>

			<div className={styles.buttonContainer}>
				{isEditing ? null : (
					<Button onClick={handleUpdate} style={styles.editButton}>
						Edit
					</Button>
				)}
				<Button onClick={handleDelete} style={styles.deleteButton}>
					Delete
				</Button>
			</div>
		</>
	)
}

export default TodoPage
