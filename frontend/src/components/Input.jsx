const Input = ({
  name,
  placeholder,
  type,
  className,
  label,
  register,
  errors,
  value,
  required = false,
  pattern = null, // For custom patterns like password
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label 
          htmlFor={name} 
          className="text-[var(--primary-text-color)] text-sm font-medium"
        >
          {label}
        </label>
      )}

      <input
        {...register(name, {
          required: required && `${label || placeholder} is required`, // Required field validation
          pattern: pattern && {
            value: pattern,
            message: "Password is too weak (Minimum 8 characters, 1 uppercase, 1 number, 1 special character)",
          }, // Password pattern validation
        })}
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        defaultValue={value}
        className={`text-[var(--primary-text-color)] p-2 bg-[var(--receiver-bubble-bg)] border border-[var(--primary-text-color)] rounded-md w-full focus:border-[var(--accent-color)] focus:outline-none transition duration-300 ${className}`}
      />

      {errors[name] && (
        <p className="text-red-500 text-[14px]">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default Input;
