const Button = ({contents, handleClick}) => {
    return <button className='btn' onClick={handleClick}>{contents}</button>;
}

export default Button;