import React from 'react'

const Spinner = () => {
  return (
    <div className="position-absolute top-50 start-50">
      <div className="center">
        <div className="spinner-border" role="status" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Spinner
