import React from 'react'

const Button = ({ onClick, children, style, disabled }) => {
	return (
		<button onClick={onClick} className={style} disabled={disabled}>
			{children}
		</button>
	)
}

export default Button
