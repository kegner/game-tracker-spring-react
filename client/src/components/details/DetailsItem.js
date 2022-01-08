import React from 'react'

const DetailsItem = (props) => {

  const { label, value, currency } = props;

  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  });

  let formattedValue = value;
  if (currency && value) {
    formattedValue = formatter.format(value);
  }

  return (
    <>
      <strong>{label}</strong><br />
      <span>{formattedValue}</span>
    </>
  )
}

export default DetailsItem
