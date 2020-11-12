import React, {useContext,} from 'react';
import {userContext} from "../../../context/users";
import styles from './users.module.scss';
import {useHistory} from 'react-router-dom';

const users = ['Janek', 'Witek', 'Sławek', 'Portek', 'Adrian', 'Adam', 'Krzysiek', 'Maciek'];

const Users = () => {
  const history = useHistory();
  const {user, handleUser} = useContext(userContext);

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
      {user && <button className={styles.sheetLinkButton} onClick={() => {
        localStorage.setItem("user", user);
        history.push("/sheet");
      }}>Use Sheet</button>}
    </>
  )
}

export default Users;