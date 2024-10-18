import { FormProvider as RHFormProvider } from "react-hook-form";

const FormProvider = ({ children, onsubmit, methods }) => {
  return (
    <RHFormProvider {...methods}>
      <form onSubmit={onsubmit}> {children} </form>
    </RHFormProvider>
  );
};
export default FormProvider;
