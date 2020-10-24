import React, {useContext} from 'react';
import {userContext} from "../../../context/users";

import styles from './users.module.scss';
import {history} from "../../../utils/history";
import {getCharacter} from "../../../utils/api";
import {toast} from "react-toastify";

const users = ['Test', 'Witek', 'Sławek', 'Portek', 'Adrian', 'Adam', 'Krzysiek', 'Maciek'];

const Users = () => {
  const {user, handleUser} = useContext(userContext);

  const handleSheet = async () => {
    const localUser = localStorage.getItem("user");
    const character = await getCharacter(user!);
    if (character === 201) return toast.success("Character is created");
    else if (character === 500 && user === localUser) history.push("/sheet");
    else if (typeof character === "string") {
      localStorage.setItem("user", user!);
      localStorage.setItem("character", character);
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
      {user && <button className={styles.sheetLinkButton} onClick={handleSheet}>Use Sheet {">"}</button>}
    </>
  )
}

export default Users;