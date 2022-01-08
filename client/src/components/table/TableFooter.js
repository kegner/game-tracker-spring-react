import React from 'react'
import TableCount from './TableCount';
import TablePagination from './TablePagination';

const TableFooter = (props) => {

  const { gamesPages, pageIndex, setPageIndex, itemsPerPage } = props;

  return (
    <tfoot>
      <tr>
        <td colSpan="4" className="border-0">
          <div className="d-flex">
            <div className="align-self-center ms-1">
              <TableCount pageIndex={pageIndex} itemsPerPage={itemsPerPage} />
            </div>
            <div className="ms-auto">
              <TablePagination pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                gamesPages={gamesPages} />
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}

export default TableFooter
