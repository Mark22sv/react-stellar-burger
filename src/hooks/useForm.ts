import { useState, SyntheticEvent } from "react";

export function useForm<T extends {[key: string]: string | number}>(inputValues: T) {
    const [values, setValues] = useState<T>(inputValues);

    const onChange = (event: SyntheticEvent<HTMLInputElement>) => {
      const {value, name} = event.target as HTMLInputElement;
      setValues({...values, [name]: value});
    };
    return {values, onChange, setValues};
  }

  