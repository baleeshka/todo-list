import React from 'react'
import styles from './Todos.module.css'
import Button from './Button'
import Input from './Input'
import Form from './Form'
const AddToDo = ({ isCreating, onSubmit, onChange, value }) => {
	return (
		<div>
			<Form onSubmit={onSubmit}>
				<Input
					name='taskName'
					type='text'
					placeholder='Создайте новую задачу'
					value={value}
					onChange={onChange}
				/>
				<Button
					disabled={isCreating}
					onClick={onSubmit}
					style={styles.createButton}
				>
					Создать
				</Button>
			</Form>
		</div>
	)
}

export default AddToDo
