import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../actions/gameActions';
import Spinner from '../layout/Spinner';
import paginate from '../../utils/paginate';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

const GameTable = () => {

  const itemsPerPage = 5;

  const [pageIndex, setPageIndex] = useState(0);
  const [gamesPages, setGamesPages] = useState([[]]);

  const { games, loading } = useSelector(state => state.gameReducer);
  const { user } = useSelector(state => state.authenticationReducer)
  const previousCount = useRef(0);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGames(user.id));
  }, [user.id, dispatch]);

  useEffect(() => {
    if (previousCount.current === 0) {
      previousCount.current = games.length;
    } else {
      if (previousCount.current < games.length) { // add a game
        setPageIndex(Math.floor(Math.max(games.length - 1, 0) / itemsPerPage));
      } else if (previousCount.current > games.length) { // delete a game
        setPageIndex(index => Math.min(Math.floor(Math.max(games.length - 1, 0) / itemsPerPage), index));
      }
      previousCount.current = games.length;
    }
    setGamesPages(paginate(games, itemsPerPage));
  }, [games]);

  const spinner = loading ? <Spinner /> : <></>;

  return (
    <div className="card">
      <div className="card-header bg-dark text-white">
        Game Table
      </div>
      <div className="card-body p-0">
        <table className="table table-hover table-sm">
          <caption className="visually-hidden">Game Table</caption>
          <thead>
            <tr>
              <th scope="col" className="text-center">Title</th>
              <th scope="col" className="text-center">Status</th>
              <th scope="col" className="text-center">Rating</th>
              <th scope="col" className="text-center">Delete</th>
            </tr>
          </thead>
          <TableBody gamesPages={gamesPages} pageIndex={pageIndex} />
          <TableFooter gamesPages={gamesPages} pageIndex={pageIndex}
              setPageIndex={setPageIndex} itemsPerPage={itemsPerPage} />
        </table>
      </div>
      {spinner}
    </div>
  )
}

export default GameTable
