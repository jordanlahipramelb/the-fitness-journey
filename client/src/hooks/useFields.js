import { useState } from "react";

const useFields = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState([]);

  //   handle setting form data
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData, //keep previous data
      [name]: value, // update the target name by the value
    }));
  };

  //   sets form data back to blank
  const resetFormData = () => {
    setFormData(initialState);
  };

  return [formData, handleChange, resetFormData];
};

export default useFields;
