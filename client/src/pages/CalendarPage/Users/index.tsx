import React, {useContext} from 'react';
import {userContext} from "../../../context/users";

import styles from './users.module.scss';
import {history} from "../../../utils/history";
import api from "../../../utils/api";
import {useDispatch} from "react-redux";
import {setCharacter} from "../../../redux/actions";

const users = ['Test', 'Witek', 'Sławek', 'Portek', 'Adrian', 'Adam', 'Krzysiek', 'Maciek'];

const Users = () => {
  const {user, handleUser} = useContext(userContext);
  const dispatch = useDispatch();

  const handleSheetLink = async () => {
    const response = await api.getCharacter(user!);
    if (!response && user === localStorage.getItem("user")) {
      history.push("/sheet");
    } else if (!!response && user === localStorage.getItem("user")) {
      console.log(response);
      dispatch(setCharacter(JSON.parse(response).character));
      history.push("/sheet");
    }
  }

  return (
    <>
      <div className={styles.users}>
        {users.map(person =>
          <button
            key={person}
            className={`${user === person ? styles.userActive : styles.userBasic}`}
            value={person}
            onClick={handleUser}>
            {person}
          </button>
        )}
      </div>
      {user && <button className={styles.sheetLinkButton} onClick={handleSheetLink}>Use Sheet {">"}</button>}
    </>
  )
}

export default Users;