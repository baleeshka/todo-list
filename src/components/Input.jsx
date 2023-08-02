import React from 'react'

const Input = ({ type, value, onChange, placeholder, disabled, style }) => {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			className={style}
		/>
	)
}

export default Input
