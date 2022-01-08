import React from 'react'
import { useSelector } from 'react-redux';
import DetailsItem from './DetailsItem';

const GameDetails = () => {

  const { selectedGame } = useSelector(state => state.gameReducer);

  return (
    <div className="card">
      <div className="card-header bg-dark text-white">
        Game Details
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-3">
            <DetailsItem label="Title" value={selectedGame.title} />
          </div>
          <div className="col-3">
            <DetailsItem label="Platform" value={selectedGame.platform} />
          </div>
          <div className="col-3">
            <DetailsItem label="Start Date" value={selectedGame.startDate} />
          </div>
          <div className="col-3">
            <DetailsItem label="End Date" value={selectedGame.endDate} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-3">
            <DetailsItem label="Status" value={selectedGame.status} />
          </div>
          <div className="col-3">
            <DetailsItem label="Hours to Complete" value={selectedGame.hoursToComplete} />
          </div>
          <div className="col-3">
            <DetailsItem label="Rating" value={selectedGame.rating} />
          </div>
          <div className="col-3">
            <DetailsItem label="Price" value={selectedGame.price} currency={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetails
