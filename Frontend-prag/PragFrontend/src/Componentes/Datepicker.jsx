import { useState, useEffect } from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (props.initialValues && props.initialValues[props.name]) {
            setSelectedDate(new Date(props.initialValues[props.name]));
            helpers.setValue(new Date(props.initialValues[props.name])); // se setea el valor en Formik también
        }
    }, [props.initialValues, props.name]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        helpers.setValue(date);
    };
    return (
        <div className="input-container" style={{ marginBottom: "20px" }}>
            <label
                htmlFor={`field-${props.name}`}
                className="input-label custom-label"
            >
                {label}
            </label>
            <div className="">
                <DatePicker
                    {...field}
                    {...props}
                    selected={selectedDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={handleDateChange}
                    className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
                />
            </div>
            {meta.touched && meta.error ? (
                <small className="message">{meta.error}</small>
            ) : null}
        </div>
    );
};

export default DatePickerField;
