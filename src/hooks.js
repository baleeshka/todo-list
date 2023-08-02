import React, { useEffect, useState } from 'react'
import { ref, onValue, push, update, remove } from 'firebase/database'
import { db } from '../src/firebase'

export const useRequestGetTodos = () => {
	const [todos, setTodos] = useState({})

	const [isLoading, setIsLoading] = useState(true)

	const todosDbRef = ref(db, 'todos')

	useEffect(() => {
		return onValue(todosDbRef, snapshot => {
			const loadedTodos = snapshot.val() || {}

			setTodos(loadedTodos)
			setIsLoading(false)
		})
	}, [])
	return { todos, isLoading }
}

export const useRequestAddTodos = () => {
	const [isCreating, setIsCreating] = useState(false)

	const requestAddTodos = title => {
		setIsCreating(true)

		const todosDbRef = ref(db, 'todos')

		push(todosDbRef, {
			title: title,
		})
			.then(response => {
				console.log('Задача добавлена, ответ сервера:', response)
			})
			.finally(() => setIsCreating(false))
	}
	return { requestAddTodos, isCreating }
}
export const useRequestDeleteTodos = () => {
	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodos = id => {
		setIsDeleting(true)

		const todosDbRef = ref(db, `todos/${id}`)

		remove(todosDbRef)
			.then(response => {
				console.log('Задача удалена, ответ сервера: ', response)
			})
			.finally(() => setIsDeleting(false))
	}
	return { requestDeleteTodos, isDeleting }
}

export const useRequestUpdateTodos = () => {
	const [isUpdating, setIsUpdating] = useState(false)

	const requestUpdateTodos = (title, id) => {
		setIsUpdating(true)

		const todosDbRef = ref(db, `todos/${id}`)

		update(todosDbRef, {
			title: title,
		})
			.then(response => {
				console.log('Задача обновлена, ответ сервера:', response)
			})
			.finally(() => setIsUpdating(false))
	}

	return { requestUpdateTodos, isUpdating }
}
