
import './App.css';
import { useState } from 'react';

class DiceNum{
  constructor(id,num){
    this.id = id;
    this.num = num;
  }
}

function App() {

  const compare = () => {
    for (let i = 1; i <= 6; i++) {
      let allEqual = true;
      diceNums.forEach(element => {
        if(element.num !== i){
          allEqual = false;
        }
      });
      if(allEqual){
        return true;
      }
    }
    return false;
  }
  const createRandomDie = (id) => new DiceNum(id, Math.floor(Math.random() * 6) + 1);
  const [diceNums, setDiceNums] = useState([...Array(10)].map((_, id) => createRandomDie(id)));

  const [selected, setSelected] = useState([]);

  const [counter, setCounter] = useState(1);

  const handleSelect = (diceNum) =>{
    if(!selected.includes(diceNum)){
      setSelected([diceNum,...selected]);
    }
    else{
      setSelected(selected.filter((item) => item.id !== diceNum.id));
    }
  }

  const handleRoll = () => {
    setDiceNums(currDiceNums => 
      currDiceNums.map((die) => (selected.includes(die)) ? die : createRandomDie(die.id)));
    
    setCounter(currCounter => currCounter + 1)
  }

  return (
    <div className="app-container">
      <h1 className='main-header'>Tenzies</h1>
      <p className='instructions-p'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <p className='counter-p'>Rolls Count: <b>{counter}</b></p>
      <div className='dice-container'>
      {diceNums.map((die) => (
          <button
            key={die.id}
            className={`dice ${selected.includes(die) ? 'clicked' : ''}`}
            onClick={() => handleSelect(die)}
          >
            {die.num}
          </button>
        ))}
      </div>
      {(selected.length === diceNums.length && compare()) ? 
      (<button className='roll-button' onClick={() => window.location.reload()}>New Game</button>) :
      (<button className='roll-button' onClick={handleRoll}>Roll</button>)}
    </div>
  );
}

export default App;
