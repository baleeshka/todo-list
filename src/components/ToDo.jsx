import React, { useState } from 'react'
import { useRequestDeleteTodos, useRequestUpdateTodos } from '../hooks.js'
import Button from './Button'
import Form from './Form'
import Input from './Input'
import styles from './Todos.module.css'

const ToDo = ({ id, title }) => {
	const [editedValue, setEditedValue] = useState('')

	const { requestDeleteTodos, isDeleting } = useRequestDeleteTodos(
		refreshTodos,
		setRefreshTodos
	)

	const { requestUpdateTodos, isUpdating } = useRequestUpdateTodos(
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
	}

	const sendFormData = formData => {
		requestUpdateTodos(formData, id)
		setEditedValue('')
	}

	const handleDelete = () => {
		requestDeleteTodos(id)
	}

	const handleUpdate = () => {
		setEditedValue(title)
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
						<Button
							isUpdating={isUpdating}
							type='submit'
							style={styles.createButton}
						>
							<i className='fas fa-save'></i>
						</Button>
					</Form>
				) : (
					<span>{title}</span>
				)}
			</div>

			<div className={styles.buttonContainer}>
				<Button
					isUpdating={isUpdating}
					onClick={handleUpdate}
					style={styles.editButton}
				>
					<i className='fas fa-pencil-alt'></i>
				</Button>
				<Button
					isDeleting={isDeleting}
					onClick={handleDelete}
					style={styles.deleteButton}
				>
					<i className='fas fa-trash'></i>
				</Button>
			</div>
		</>
	)
}

export default ToDo
