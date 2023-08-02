import React from 'react'
import Input from './Input'
const SearchToDo = ({ ...props }) => {
	return (
		<div>
			<Input type='text' placeholder='Поиск задачи' {...props} />
		</div>
	)
}

export default SearchToDo
