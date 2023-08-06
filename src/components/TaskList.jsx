import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Todos.module.css'

const TaskList = ({
	todos,
	searchQuery,
	isSorted,
	isLoading,
	isDeleting,
	requestDeleteTodos,
	isUpdating,
	requestUpdateTodos,
}) => {
	const filteredAndSortedTodos = todos
		.filter(({ title }) =>
			title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => (isSorted ? a.title.localeCompare(b.title) : 0))
	return (
		<div>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : filteredAndSortedTodos.length === 0 ? (
				<div className={styles.emptyListText}>Список задач пуст</div>
			) : (
				filteredAndSortedTodos.map(({ id, title }) => (
					<div className={styles.toDoItem}>
						<Link key={id} to={`todos/${id}`} className={styles.link} id={id}>
							{title}
						</Link>
					</div>
				))
			)}
		</div>
	)
}

export default TaskList
