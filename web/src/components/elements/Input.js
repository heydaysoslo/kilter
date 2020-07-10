import React from 'react'
import { Field } from 'formik'
import { FormBlock, StyledInput } from './Form'

const Input = ({
  name,
  placeholder,
  noLabel = false,
  type = 'text',
  errors,
  touched
}) => {
  const upperCaseName = `${name.slice(0, 1).toUpperCase()}${name.slice(
    1,
    name.length
  )}`
  return (
    <FormBlock>
      {!noLabel && (
        <label htmlFor={name} className="Form__label">
          {upperCaseName}
        </label>
      )}
      <StyledInput
        as={Field}
        error={errors[name] && touched[name]}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder && placeholder}
      />
      {/* {errors[name] && (
        <FormFeedBack>
          <ErrorMessage name={name} />
        </FormFeedBack>
      )} */}
    </FormBlock>
  )
}

export default Input
