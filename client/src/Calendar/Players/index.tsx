import React, {useContext} from 'react';
import {playerContext, users} from "../../context/SelectedUser";

const Players: React.FC = () => {
  const {user, handleUser} = useContext(playerContext)

  return (
    <div className="person-container">
      {users.map((users, index) =>
        <button key={index} className={`person-container__person${user && users === user ? "--active" : ""}`} value={users}
                onClick={handleUser}>{users}</button>
      )}
    </div>
  )
}

export default Players;