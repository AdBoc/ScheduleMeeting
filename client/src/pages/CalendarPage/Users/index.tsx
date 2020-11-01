import React, {useContext, useState} from 'react';
import {userContext} from "../../../context/users";

import styles from './users.module.scss';
import {history} from "../../../utils/history";
import api from "../../../utils/api";
import {useDispatch} from "react-redux";
import {useIsMounted} from "../../../hooks/useIsMounted/useIsMounted";


const users = ['Test', 'Witek', 'Sławek', 'Portek', 'Adrian', 'Adam', 'Krzysiek', 'Maciek'];

const Users = () => {
  const {user, handleUser} = useContext(userContext);
  const isMounted = useIsMounted();
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const handleSheetLink = () => {
    setFetching(true);
    api.getCharacter(user!)
      .then(response => {
        if (!response && user === localStorage.getItem("user")) {
          history.push("/sheet");
        } else if (!!response && user === localStorage.getItem("user")) {
          // dispatch(setCharacter(JSON.parse(response).character)); TODO: dispatch every
          history.push("/sheet");
        }
      })
      .finally(() => {
        if (isMounted) setFetching(false);
      });
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
      {user && <div className={styles.sheetLinkButton} onClick={handleSheetLink}>
          <p>Use Sheet</p>
        {fetching && <div className={styles.spinner}/>}
      </div>}
    </>
  )
}

export default Users;