import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Todos.module.css'

const ToDoTitle = ({ id, title }) => {
	return (
		<div className={styles.toDoItem} id={id}>
			<Link
				to={`/task/${id}`}
				style={{ textDecoration: 'none', color: '#ccc' }}
			>
				{title}
			</Link>
		</div>
	)
}

export default ToDoTitle
