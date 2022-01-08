import React, { useState } from 'react'
import _ from 'lodash';

const FormItem = (props) => {

  const { id, type, label, value, onChange, currency, validClass, validClassSetter, isRequired } = props;

  const [inputId] = useState(_.uniqueId(id + "-"));

  let changeHandler = onChange;

  if (currency) {
    changeHandler = (e) => {
      // supports up to 999.99
      if (!e.target.value.match(/(?=.*)^(\d{1,3})?(\.\d{1,2})?$/)) {
        e.preventDefault();
        return false;
      }
      onChange(e);
    }
  }

  const blurHandler = () => {
    if (validClassSetter) {
      validClassSetter(!value ? "is-invalid" : "");
    }
  }
  
  return (
    <>
      <label htmlFor={inputId} className="form-label">
        {isRequired ? <span className="text-danger" aria-required="true">* </span> : ""}{label}
      </label>
      <input type={type} className={`form-control ${validClass}`} id={inputId} value={value}
        onChange={changeHandler} onBlur={blurHandler} />
    </>
  )
}

export default FormItem
