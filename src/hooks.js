import React, { useEffect, useState } from 'react'
export const useRequestGetTodos = refreshTodos => {
	const [todos, setTodos] = useState([])

	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		setIsLoading(true)

		setTimeout(() => {
			fetch('http://localhost:3001/todos')
				.then(loadedData => loadedData.json())
				.then(loadedTodos => {
					setTodos(loadedTodos)
				})
				.finally(() => setIsLoading(false))
		}, 2000)
	}, [refreshTodos])
	return { todos, isLoading }
}

export const useRequestAddTodos = (refreshTodos, setRefreshTodos) => {
	const [isCreating, setIsCreating] = useState(false)

	const requestAddTodos = title => {
		setIsCreating(true)

		fetch('http://localhost:3001/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title,
			}),
		})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача добавлена, ответ сервера:', response)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsCreating(false))
	}
	return { requestAddTodos, isCreating }
}
export const useRequestDeleteTodos = (refreshTodos, setRefreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodos = id => {
		setIsDeleting(true)

		fetch(`http://localhost:3001/todos/${id}`, {
			method: 'DELETE',
		})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача удалена, ответ сервера: ', response)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsDeleting(false))
	}
	return { requestDeleteTodos, isDeleting }
}

export const useRequestUpdateTodos = (refreshTodos, setRefreshTodos) => {
	const [isUpdating, setIsUpdating] = useState(false)

	const requestUpdateTodos = (title,id) => {
		setIsUpdating(true)

		fetch(`http://localhost:3001/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title }),
		})
			.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача обновлена, ответ сервера:', response)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsUpdating(false))
	}

	return { requestUpdateTodos, isUpdating }
}
