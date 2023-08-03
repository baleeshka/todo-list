import { Route, Routes } from 'react-router-dom'
import ToDo from './components/ToDo'
import ToDoList from './components/ToDoList'

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<ToDoList />} />
				<Route path='todos/:id' element={<ToDo />} />
				<Route path='/' />
			</Routes>
		</div>
	)
}

export default App
