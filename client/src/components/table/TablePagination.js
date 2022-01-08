import React from 'react'

const TablePagination = (props) => {

  const { pageIndex, setPageIndex, gamesPages } = props;

  const pageButtonHandler = (index) => {
    setPageIndex(index);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination my-1">
        <li className="page-item">
          <button className="page-link"
            onClick={() => pageButtonHandler(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            Previous
          </button>
        </li>
        {gamesPages.map((_, index) => {
          const activeClass = index === pageIndex ? " active" : "";
          return <li key={index} className={`page-item ${activeClass}`}>
            <button className="page-link"
              onClick={() => pageButtonHandler(index)}
            >
              {index + 1}
            </button>
          </li>
        })}
        <li className="page-item">
          <button className="page-link"
            onClick={() => pageButtonHandler(pageIndex + 1)}
            disabled={pageIndex === gamesPages.length - 1}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default TablePagination
