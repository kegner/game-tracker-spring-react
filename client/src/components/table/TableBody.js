import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectGame } from '../../actions/gameActions';
import DeleteButton from './DeleteButton';

const TableBody = (props) => {

  const { gamesPages, pageIndex } = props;

  const { selectedGame } = useSelector(state => state.gameReducer);

  const dispatch = useDispatch();

  const rowClickHandler = (game) => {
    dispatch(selectGame(game));
  }

  return (
    <tbody>
      {gamesPages[pageIndex].map(game => {
        const activeClass = selectedGame.id === game.id ? "table-active" : "";
        return <tr key={game.id} className={activeClass} onClick={() => rowClickHandler(game)}>
          <td className="text-center">{game.title}</td>
          <td className="text-center">{game.status}</td>
          <td className="text-center">{game.rating}</td>
          <td className="text-center"><DeleteButton id={game.id} /></td>
        </tr>
      })}
    </tbody>
  )
}

export default TableBody
