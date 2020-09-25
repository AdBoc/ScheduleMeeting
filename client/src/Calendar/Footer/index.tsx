import React from 'react';
import {history} from "../../Services/History";
import {apiService} from "../../Services/FetchAPI";

interface IProps {
  selectedPlayer: string | null;
}

const Footer: React.FC<IProps> = ({selectedPlayer}) => {

  const handleSheet = async () => {
    const currentUser = localStorage.getItem("user")
    if (currentUser !== selectedPlayer) {
      localStorage.setItem("user", `${selectedPlayer}`);
      const characterData = await apiService.getCharacter();
      if (characterData.character)
        localStorage.setItem("character", characterData.character);
    }
    history.push("/sheet");
  }

  return (
    <footer className="footer">
      <p className="footer__version">v 1.2</p>
      {selectedPlayer && <p onClick={handleSheet} className="sheet-link">Sheet</p>}
      <p>Source Code On:</p>
      <a href="https://github.com/AdBoc/ScheduleMeeting" target="_blank" rel="noopener noreferrer"><img className="footer__git-icon" alt="Github link"
                                                                                                        src={require('../../assets/GitHub-Mark.svg')}/></a>
    </footer>
  )
};

export default Footer;
