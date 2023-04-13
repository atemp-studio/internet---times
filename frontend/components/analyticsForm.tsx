import { useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  data: string;
  createdAt: string;
};

export const AnalyticsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormInputs) => {
    try {
      data.createdAt = new Date().toISOString();
      await fetch('/api/createAnalytic', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      reset(); // reset the form fields
      setSubmitted(true); // set submitted state to true
      setTimeout(() => setSubmitted(false), 3000); // clear submitted state after 3 seconds
    } catch (err: any) {
      setError("Error submitting your data :/"); // set error message
    }
  };

  return (
    <form className="analytics-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      {errors.name && <span>This field is required</span>}
      <input id="name" type="text" {...register("name", { required: true })} />

      <label htmlFor="data">Data</label>
      {errors.data && <span>This field is required</span>}
      <textarea id="data" {...register("data", { required: true })} />

      <button type="submit">Submit</button>

      {submitted && <p>Submitted!</p>}
      {error && <p>{error}</p>}
    </form>
  );
};
