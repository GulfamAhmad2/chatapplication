
const Button = ({className, type, disabled, children, onClick}) => {
  return (
    <button
      className={`w-full cursor-pointer  font-semibold rounded-lg transition-all ${className}`}
      disabled={disabled}
      type={type || "submit"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
