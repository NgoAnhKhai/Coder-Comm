import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const FTextField = ({ name, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error ? error.message : null}
          {...other}
        />
      )}
    />
  );
};
export default FTextField;
