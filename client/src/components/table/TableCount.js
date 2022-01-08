import React from 'react'
import { useSelector } from 'react-redux';

const TableCount = (props) => {

  const { pageIndex, itemsPerPage } = props;

  const { games } = useSelector(state => state.gameReducer);

  return (
    <>
      {"Showing " + ((pageIndex * itemsPerPage) + (games.length > 0 ? 1 : 0)) +
      " to " + Math.min(games.length, (pageIndex + 1) * itemsPerPage) +
      " of " + games.length}
    </>
  )
}

export default TableCount
