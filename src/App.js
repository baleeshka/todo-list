import React, { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import NotFoundPage from './components/NotFound'
import ToDoList from './components/ToDoList'
import ToDoPage from './components/ToDoPage'

const AppRoutes = () => {
	const [refreshTodos, setRefreshTodos] = useState(false)
	return (
		<Routes>
			<Route
				path='/'
				element={
					<ToDoList
						refreshTodos={refreshTodos}
						setRefreshTodos={setRefreshTodos}
					/>
				}
			/>
			<Route
				path='/task/:id'
				element={
					<ToDoPage
						refreshTodos={refreshTodos}
						setRefreshTodos={setRefreshTodos}
					/>
				}
			/>
			<Route path='/404' element={<NotFoundPage />} />
			<Route path='/task' element={<NotFoundPage />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	)
}

export default AppRoutes
