
const Button = ({className, type, disabled, children}) => {
  return (
    <button
      className={`w-full cursor-pointer  font-semibold rounded-lg transition-all ${className}`}
      disabled={disabled}
      type={type || "submit"}
    >
      {children}
    </button>
  );
};

export default Button;
