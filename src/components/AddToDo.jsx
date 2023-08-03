import React from 'react'
import Button from './Button'
import Form from './Form'
import Input from './Input'
import styles from './Todos.module.css'

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
				<Button disabled={isCreating} type='submit' style={styles.createButton}>
					Создать
				</Button>
			</Form>
		</div>
	)
}

export default AddToDo
