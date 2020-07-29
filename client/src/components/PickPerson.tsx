import React from 'react';

interface IProps {
  handleClick: (arg: string | null) => () => void
}

const PickPerson: React.FC<IProps> = ({handleClick}) => {
  return (
    <div className="person-container">
      <p className="person witek" onClick={handleClick('--blue')}>Witek</p>
      <p className="person slawek" onClick={handleClick('--red')}>Sławek</p>
      <p className="person potek" onClick={handleClick('--pink')}>Potrek</p>
      <p className="person janek" onClick={handleClick('--yellow')}>Janek</p>
      <p className="person adrian" onClick={handleClick('--green')}>Adrian</p>
      <p className="person adam" onClick={handleClick('--brown')}>Adam</p>
      <p className="person krzysiek" onClick={handleClick('--grey')}>Krzysiek</p>
      <p className="person maciek" onClick={handleClick('--purple')}>Maciek</p>
    </div>
  )
}

export default PickPerson