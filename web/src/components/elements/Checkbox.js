import React, { useState } from 'react'
import { Field } from 'formik'
import { FormBlock, StyledCheckbox, FormLabel } from './Form'
import { motion } from 'framer-motion'
import { nanoid } from 'nanoid' // using nanoid because it's faster and smaller than uuid

const Checkbox = ({ name, errors, touched, state, children }) => {
  const [htmlforId] = useState(`${name}-${nanoid(10)}`)
  return (
    <FormBlock>
      <StyledCheckbox>
        <Field
          type="checkbox"
          // error={errors[name] && touched[name]} // this creates error but still works if its removed
          id={htmlforId}
          name={name}
        />
        {children && (
          <FormLabel htmlFor={htmlforId}>
            <svg
              tabIndex="-1"
              className="icon"
              viewBox="0 0 100 100"
              overflow="visible"
              style={{ position: 'relative', display: 'inline-block' }}
            >
              <circle cx="50" cy="50" r="50" fill="white" />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={errors[name] && touched[name] ? 'red' : 'none'}
                strokeWidth="10"
                animate={
                  errors[name] && touched[name] ? { scale: 1 } : { scale: 0 }
                }
              />
              <motion.circle
                cx="50"
                cy="50"
                r="25"
                className="icon-selected"
                style={{ originX: 0.5, originY: 0.5 }}
                animate={state ? { scale: 1 } : { scale: 0 }}
              />
            </svg>
            {children}
          </FormLabel>
        )}
      </StyledCheckbox>
      {/* {errors[name] && (
        <FormFeedBack>
          <ErrorMessage name={name} />
        </FormFeedBack>
      )} */}
    </FormBlock>
  )
}

export default Checkbox
