import Image from "next/image";

import { traits } from "@/traits/basic";
import { Controller, useForm } from "react-hook-form";
import { generateChildTrait } from "@/traits/logic";
import { useState } from "react";
import { capitalizeFirstLetter, traitExistsForAge } from "@/traits/helpers";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";

export default function Home() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<{
    parent1: typeof traits;
    parent2: typeof traits;
    own: typeof traits;
    age: string;
  }>({
    defaultValues: {
      parent1: [],
      parent2: [],
      own: [],
      age: "baby",
    },
  });
  const [result, setResult] = useState<null | string[]>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    const { parent1, parent2, own, age } = watch();
    const parentTraits = [...(parent1 || []), ...(parent2 || [])];
    const result = generateChildTrait(age, parentTraits, own);
    if (result) {
      setResult(result);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center  min-h-screen bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 p-10">
      <form
        className="bg-white p-4 sm:p-16 rounded-lg shadow-lg max-w-4xl w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-bold mb-10 text-center">
          Traits Generator for
          <span className="text-blue-600"> Sims 3</span>
        </h1>
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Choose the traits of the parents and the age of the child
        </h2>
        <div className="flex flex-col items-center gap-8">
          <div className="flex w-full gap-8 sm:flex-row flex-col">
            <div className="flex flex-col w-full">
              <Controller
                name="parent1"
                control={control}
                render={({ field: { value, onChange, ...rest } }) => {
                  return (
                    <Autocomplete
                      {...rest}
                      onChange={(_, value) => {
                        onChange(value);
                      }}
                      multiple
                      disableCloseOnSelect
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            icon={
                              <Image
                                alt={option.label}
                                src={option.iconUrl}
                                width={25}
                                height={25}
                              />
                            }
                            label={option.label}
                            {...getTagProps({ index })}
                            className="px-1 m-1"
                            key={option.label}
                          />
                        ))
                      }
                      options={traits}
                      renderOption={(props, option) => (
                        <MenuItem
                          {...props}
                          className="flex gap-2 items-center"
                        >
                          <Image
                            alt={option.label}
                            width={25}
                            height={25}
                            src={option.iconUrl}
                          />
                          {option.label}
                        </MenuItem>
                      )}
                      getOptionLabel={(option) => option.label}
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="First parent"
                          variant="standard"
                        />
                      )}
                    />
                  );
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Controller
                name="parent2"
                control={control}
                render={({ field: { value, onChange, ...rest } }) => {
                  return (
                    <Autocomplete
                      {...rest}
                      onChange={(_, value) => {
                        onChange(value);
                      }}
                      multiple
                      disableCloseOnSelect
                      options={traits}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            icon={
                              <Image
                                alt={option.label}
                                src={option.iconUrl}
                                width={25}
                                height={25}
                              />
                            }
                            label={option.label}
                            {...getTagProps({ index })}
                            className="px-1 m-1"
                            key={option.label}
                          />
                        ))
                      }
                      renderOption={(props, option) => (
                        <MenuItem
                          {...props}
                          className="flex gap-2 items-center"
                        >
                          <Image
                            alt={option.label}
                            width={25}
                            height={25}
                            src={option.iconUrl}
                          />
                          {option.label}
                        </MenuItem>
                      )}
                      getOptionLabel={(option) => option.label}
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Second parent"
                          variant="standard"
                        />
                      )}
                    />
                  );
                }}
              />
            </div>
          </div>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                className="flex justify-center flex-col sm:flex-row"
                onChange={(event) => {
                  field.onChange(event);
                  if (event.target.value === "baby") {
                    setValue("own", []);
                  }
                  trigger("own");
                }}
              >
                <FormControlLabel
                  value="baby"
                  control={<Radio />}
                  label="Baby"
                />
                <FormControlLabel
                  value="child"
                  control={<Radio />}
                  label="Child"
                />
                <FormControlLabel
                  value="teen"
                  control={<Radio />}
                  label="Teen"
                />
                <FormControlLabel
                  value="adult"
                  control={<Radio />}
                  label="Adult"
                />
              </RadioGroup>
            )}
          />

          <Controller
            name="own"
            control={control}
            rules={{
              validate: (value) => {
                switch (watch("age")) {
                  case "baby":
                    if (value.length !== 0) {
                      return "Baby can't have traits";
                    }
                    return true;
                  case "child":
                    if (value.length === 0) {
                      return "Please choose at least one trait";
                    }
                    if (value.length > 2) {
                      return "The child can have up to 2 traits";
                    }
                    return true;
                  case "teen":
                    if (value.length === 0) {
                      return "Please choose at least one trait";
                    }
                    if (value.length > 3) {
                      return "The teen can have up to 3 traits";
                    }
                    return true;
                  case "adult":
                    if (value.length === 0) {
                      return "Please choose at least one trait";
                    }
                    if (value.length > 4) {
                      return "The adult can have up to 4 traits";
                    }
                    return true;
                }
              },
            }}
            render={({ field: { value, onChange, ...rest } }) => {
              return (
                <Autocomplete
                  {...rest}
                  value={value}
                  onChange={(_, value) => {
                    onChange(value);
                  }}
                  disabled={watch("age") === "baby"}
                  multiple
                  disableCloseOnSelect
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        icon={
                          <Image
                            alt={option.label}
                            src={option.iconUrl}
                            width={25}
                            height={25}
                          />
                        }
                        label={option.label}
                        {...getTagProps({ index })}
                        className="px-1 m-1"
                        key={option.label}
                      />
                    ))
                  }
                  options={traits.filter((trait) =>
                    traitExistsForAge(watch("age"), trait.requiredAge)
                  )}
                  renderOption={(props, option) => (
                    <MenuItem {...props} className="flex gap-2 items-center">
                      <Image
                        alt={option.label}
                        width={25}
                        height={25}
                        src={option.iconUrl}
                      />
                      {option.label}
                    </MenuItem>
                  )}
                  getOptionLabel={(option) => option.label}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={capitalizeFirstLetter(watch("age"))}
                      error={!!errors.own}
                      helperText={errors.own?.message}
                      variant="standard"
                    />
                  )}
                />
              );
            }}
          />
        </div>
        <div className="flex justify-center mt-10">
          <Button
            className="bg-black py-2 px-4 font-semibold rounded-md text-white hover:bg-slate-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate"}
          </Button>
        </div>

        {result && (
          <div className="flex flex-col space-y-2 mt-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Generated traits:
            </h2>
            <div className="flex justify-center gap-8 items-center flex-col sm:flex-row">
              {result.map((trait) => (
                <div
                  className="flex flex-row items-center space-x-2 border border-gray-300 rounded-md py-2 px-4 w-[250px] justify-center"
                  key={trait}
                >
                  <Image
                    alt={traits.find((t) => t.label === trait)?.label!}
                    src={traits.find((t) => t.label === trait)?.iconUrl!}
                    width={25}
                    height={25}
                  />
                  <span className="text-lg font-semibold m-0">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </main>
  );
}
