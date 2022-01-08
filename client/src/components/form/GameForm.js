import React, { useEffect, useState } from 'react'
import { createGame, updateGame } from '../../actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';
import FormItem from './FormItem';
import Spinner from '../layout/Spinner';

const GameForm = () => {

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [hoursToComplete, setHoursToComplete] = useState(0);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);

  const { selectedGame, saving } = useSelector(state => state.gameReducer);
  const { user } = useSelector(state => state.authenticationReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    setId(selectedGame.id || "");
    setTitle(selectedGame.title || "");
    setPlatform(selectedGame.platform || "");
    setStartDate(selectedGame.startDate || "");
    setEndDate(selectedGame.endDate || "");
    setStatus(selectedGame.status || "");
    setHoursToComplete(selectedGame.hoursToComplete || 0);
    setRating(selectedGame.rating || 0);
    setPrice(selectedGame.price || 0);
  }, [selectedGame]);

  const createNew = (e) => {
    e.preventDefault();
    const game = {
      title,
      platform,
      startDate,
      endDate,
      status,
      hoursToComplete,
      rating,
      price,
      userId: user.id
    };
    dispatch(createGame(game));
  }

  const update = (e) => {
    e.preventDefault();
    const game = {
      id,
      title,
      platform,
      startDate,
      endDate,
      status,
      hoursToComplete,
      rating,
      price,
      userId: user.id
    };
    dispatch(updateGame(game));
  }

  const setState = (e, setter) => {
    setter(e.target.value);
  }

  const spinner = saving ? <Spinner /> : <></>;

  return (
    <div className="position-relative">
      <div className="card">
        <form>
          <div className="card-header bg-dark text-white">
            Game Form
          </div>
          <div className="card-body">
            <input type="hidden" value={id} />
            <div className="row mb-2">
              <div className="col-3">
                <FormItem id="title" label="Title" value={title} type="text"
                  onChange={(e) => setState(e, setTitle)} />
              </div>
              <div className="col-3">
                <FormItem id="platform" label="Platform" value={platform} type="text"
                  onChange={(e) => setState(e, setPlatform)} />
              </div>
              <div className="col-3">
                <FormItem id="startDate" label="Start Date" value={startDate} type="date"
                  onChange={(e) => setState(e, setStartDate)} />
              </div>
              <div className="col-3">
                <FormItem id="endDate" label="End Date" value={endDate} type="date"
                  onChange={(e) => setState(e, setEndDate)} />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-3">
                <FormItem id="status" label="Status" value={status} type="text"
                  onChange={(e) => setState(e, setStatus)} />
              </div>
              <div className="col-3">
                <FormItem id="hoursToComplete" label="Hours to Complete" value={hoursToComplete} type="number"
                  onChange={(e) => setState(e, setHoursToComplete)} />
              </div>
              <div className="col-3">
                <FormItem id="rating" label="Rating" value={rating} type="number"
                  onChange={(e) => setState(e, setRating)} />
              </div>
              <div className="col-3">
                <FormItem id="price" label="Price" value={price} type="number" currency={true}
                  onChange={(e) => setState(e, setPrice)} />
              </div>
            </div>
          </div>
          <div className="card-footer bg-dark text-white">
            <div className="d-flex justify-content-end align-items-end">
              <button type="submit" className="btn btn-primary" disabled={title === ""} onClick={createNew}>
                Create New
              </button>
              <div className="mx-2"></div>
              <button type="submit" className="btn btn-primary" disabled={id === ""} onClick={update}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
      {spinner}
    </div>
  )
}

export default GameForm
