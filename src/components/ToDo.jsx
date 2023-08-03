import React, { useState } from 'react'
import Button from './Button'
import Form from './Form'
import Input from './Input'
import styles from './Todos.module.css'

const ToDo = ({
	id,
	title,
	isDeleting,
	requestDeleteTodos,
	isUpdating,
	requestUpdateTodos,
}) => {
	const [editedValue, setEditedValue] = useState('')

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
		<div className={styles.toDoItem} id={id}>
			<div className={styles.toDoContent}>
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
							disabled={isUpdating}
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
					disabled={isUpdating}
					onClick={handleUpdate}
					style={styles.editButton}
				>
					<i className='fas fa-pencil-alt'></i>
				</Button>
				<Button
					disabled={isDeleting}
					onClick={handleDelete}
					style={styles.deleteButton}
				>
					<i className='fas fa-trash'></i>
				</Button>
			</div>
		</div>
	)
}

export default ToDo
