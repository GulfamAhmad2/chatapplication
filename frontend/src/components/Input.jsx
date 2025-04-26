import { useForm } from "react-hook-from";
const Input = ({ name, placeholder, type, className, label }) => {
  const {
    register,
    handleSubmit,
    formStat: { error },
  } = useForm();
  return <div>Input
  </div>;
};

export default Input;
