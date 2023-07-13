import React from 'react'

const ToDo = ({ id, title }) => {
	return (
		<div id={id}>
			{id}) {title}
			<hr />
		</div>
	)
}

export default ToDo
