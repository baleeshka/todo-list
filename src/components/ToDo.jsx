import React, { useState } from 'react'
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
					<form onSubmit={onSubmit}>
						<input
							name='taskName'
							type='text'
							placeholder='Измените задачу'
							value={editedValue}
							onChange={onTodosChange}
						/>
						<button
							disabled={isUpdating}
							type='submit'
							className={styles.createButton}
						>
							<i className='fas fa-save'></i>
						</button>
					</form>
				) : (
					<span>{title}</span>
				)}
			</div>

			<div className={styles.buttonContainer}>
				<button
					disabled={isUpdating}
					onClick={handleUpdate}
					className={styles.editButton}
				>
					<i className='fas fa-pencil-alt'></i>
				</button>
				<button
					disabled={isDeleting}
					onClick={handleDelete}
					className={styles.deleteButton}
				>
					<i className='fas fa-trash'></i>
				</button>
			</div>
		</div>
	)
}

export default ToDo
