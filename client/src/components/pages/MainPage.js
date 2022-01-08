import React from 'react'
import GameDetails from '../details/GameDetails'
import GameForm from '../form/GameForm'
import GameTable from '../table/GameTable'

const MainPage = () => {
  return (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <GameForm />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-6">
          <GameTable />
        </div>
        <div className="col-6">
          <GameDetails />
        </div>
      </div>
    </>
  )
}

export default MainPage
