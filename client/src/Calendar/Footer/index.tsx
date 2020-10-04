import React, {useContext} from 'react';

import {apiService} from "../../Services/FetchAPI";
import {history} from "../../Services/History";
import {playerContext} from "../../context/SelectedUser";
import {toast} from 'react-toastify';

const Footer: React.FC = () => {
  const {user} = useContext(playerContext)

  const handleSelectedUser = async () => {
    const localUser = localStorage.getItem("user");
    if (localUser !== user) {
      const character = await apiService.getCharacter(user!);
      if (character > 400 && character < 600) return toast.error("Connection Error");
      if (character === 201) {
        localStorage.setItem("user", `${user}`);
        return toast.success("Character has been created");
      }
      localStorage.setItem("character", character);
      localStorage.setItem("user", `${user}`);
    }
    history.push("/sheet");
  }

  return (
    <footer className="footer">
      <p className="footer__version">v 1.4</p>
      {user && <button onClick={handleSelectedUser} className="sheet-link">Sheet</button>}
      <p>Source Code On:</p>
      <a href="https://github.com/AdBoc/ScheduleMeeting" target="_blank" rel="noopener noreferrer"><img className="footer__git-icon" alt="Github link"
                                                                                                        src={require('../../assets/GitHub-Mark.svg')}/></a>
    </footer>
  )
};

export default Footer;
