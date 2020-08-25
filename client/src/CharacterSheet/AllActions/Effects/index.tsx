import React, { useContext, useState } from 'react';
import { characterContext } from '../../../context/Character';
import { Effect } from '../../../ts/interfaces';

const Effects = () => {
  const { character } = useContext(characterContext);
  const [details, setDetails] = useState<Effect | null>(null);

  const changeActivity = () => {
    //dispatch {!character.active}
  }

  const showDetails = (item: Effect) => () => {
    if (details)
      return setDetails(null);
    setDetails(item);
  };

  console.log(details);

  return (
    <div>
      {
        character.Effects.map((effect) =>
          <div className="c-atk" key={effect.id} onClick={showDetails(effect)}>
            <p>{effect.name}</p>
            <p>{effect.active}</p>
            <input type="checkbox" onChange={changeActivity} checked={effect.active} />
          </div>
        )
      }
      {details && (
        <div>
          <p>{details.description}</p>
          <button>DELETE</button>
        </div>
      )}
    </div>
  )
};

export default Effects;

//create custom hook