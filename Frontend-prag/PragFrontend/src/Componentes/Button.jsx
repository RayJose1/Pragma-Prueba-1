const Button = ({type, design, children, disabled, onClick, style}) => (    
	<button
		type={type}
		className={`btn ${design}`}
		onClick={onClick}
		disabled={disabled}
		style={style}
	>
		{children}
        
	</button>
)

export default Button;
