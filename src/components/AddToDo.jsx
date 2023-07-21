import React from 'react'
import styles from './Todos.module.css'
const AddToDo = ({ isCreating, onSubmit, onChange, value }) => {
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					name='taskName'
					type='text'
					placeholder='Создайте новую задачу'
					value={value}
					onChange={onChange}
				/>
				<button
					disabled={isCreating}
					type='submit'
					className={styles.createButton}
				>
					Создать
				</button>
			</form>
		</div>
	)
}

export default AddToDo
