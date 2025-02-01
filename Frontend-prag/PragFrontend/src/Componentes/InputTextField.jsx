import { useField } from "formik";

const InputTextField = ({ label, type, placeholder, autoComplete, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<div className="input-container" style={{ marginBottom: "20px" }}>
			<label
				htmlFor={`field-${props.name}`}
				className="input-label custom-label"
			>
				{label}
			</label>
			<input
				type={type}
				className={`form-control custom-input ${meta.touched && meta.error ? 'is-invalid' : ''}`}
				id={`field-${props.name}`}
				placeholder={placeholder}
				autoComplete={autoComplete}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<small className="message">{meta.error}</small>
			) : null}
		</div>
	);
};

export default InputTextField;


