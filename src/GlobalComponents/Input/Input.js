import "./Input.css";

const Input = (props) => {
    return (
        <div  className={props.className}>
            <input
                className={props.classNameInput}
                value={props.value}
                onChange={props.onChange}
                type={props.type || 'text'}
                placeholder={props.placeholder}
                onClick ={props.onClick}
                checked={props.checked}
                onChange = {props.onChange}
            />
        </div>
    )
}

export default Input;