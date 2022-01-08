import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteGame } from '../../actions/gameActions';

const DeleteButton = (props) => {

  const { id } = props;

  const dispatch = useDispatch();

  const deleteHandler = (e) => {
    e.stopPropagation();
    dispatch(deleteGame(id));
  }

  return (
    <button className="btn btn-danger" aria-label="Delete" onClick={deleteHandler}>
      <i className="bi bi-trash"></i>
    </button>
  )
}

export default DeleteButton
