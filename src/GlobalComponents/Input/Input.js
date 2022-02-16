import "./Input.css";

const Input = (props) => {
    return (
        <div className="Input">
            <input
                className={props.className}
                value={props.value}
                onChange={props.onChange}
                type={props.type || 'text'}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default Input;