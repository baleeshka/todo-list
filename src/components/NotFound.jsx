import React from 'react'
import styles from './Todos.module.css'

const NotFoundPage = () => {
	return (
		<div className={styles.toDoList}>
			<h1 className={styles.header}>404 - Страница не найдена</h1>
		</div>
	)
}

export default NotFoundPage
