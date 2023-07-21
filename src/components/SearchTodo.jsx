import React from 'react'
const SearchToDo = ({ ...props }) => {
	return (
		<div>
			<input type='text' placeholder='Поиск задачи' {...props} />
		</div>
	)
}

export default SearchToDo
