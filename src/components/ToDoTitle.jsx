import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Todos.module.css'

const ToDoTitle = ({ id, title }) => {
	return (
		<div className={styles.toDoItem}>
			<Link to={`todos/${id}`} className={styles.link} id={id}>
				{title}
			</Link>
		</div>
	)
}

export default ToDoTitle
