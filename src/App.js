import React, {useState, useEffect, useRef, useCallback} from 'react';
import './App.css';
import Card from './components/Card';
import Header from './components/Header';

function App() {
  let resetTime = useRef(null);
  
  // mainDeck consist of fetched photos from picsum.photos
  const [mainDeck, setMainDeck] = useState({});

  // Playing deck
  const [deck, setDeck] = useState([]);

  // Includes each playing card in pairs
  const [pairs, setPairs] = useState([]);

  // Includes selected playing cards in each turn
  const [selected, setSelected] = useState([]);

  const [message, setMessage] = useState("");

  const startGame = () => {
    setMainDeck({});
    setDeck([]);
    setPairs([]);
    setSelected([]);
    setMessage("");
    fetchCards();
  };
  
  const fetchCards = useCallback(() => {
    let _deck = {};

    // Fetch 15 cards randomly from picsum.photos
    for (let i=0; i <= 14; i++) { 
      _deck = {..._deck, [`card${i}`]: `https://picsum.photos/200/300?random=${i}`};
    }
    
    // Picked Pairing cards plus one additional randomly picked card will make our playing deck of 15 Cards.
    let pickedCards = pairingCards(Object.keys(_deck)).sort(() => Math.floor(Math.random()*3)-1);
    pickedCards.push(Object.keys(_deck).sort(() => Math.floor(Math.random()*3)-1)[0])
    
    // Participating deck of playing cards, i.e. 7 pairs and the 15th one. 
    setDeck(Object.values(pickedCards));
    
    // Maintain main deck for url lookup
    setMainDeck(_deck);
  }, [])

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const pairingCards = (deck) => {
    // Pick 7 pairs = 14 cards to play with. 
    return deck.slice(0, 7).reduce((acc, item) => {
      acc.push(item, item);
      return acc;
    }, []);
  }

  const validateMatch = useCallback(() => {
    if (selected.length < 2) {
      return;
    }
    
    let _pairs = pairs;

    const matchSelected = selected.map((id) => {
      return deck[id];
    });

    if (matchSelected[0] === matchSelected[1]) {
      _pairs = _pairs.concat(selected);
    }

    setSelected([]);
    setPairs(_pairs);
    resetTime.current = null;

    if (_pairs.length === 14) {
      setMessage('Welldone, All available pairs matched!!! Click Start Over to play again.');
    }
  }, [deck, pairs, selected]);

  useEffect(() => {
    if (selected.length > 1) {
      resetTime.current = setTimeout(() => {
        validateMatch();
      }, 1500);
    }
  }, [selected.length, validateMatch]);

  const clickHandler = (id) => {
    //  Return early, just in case if cards have been selected in this turn or the timer is ON.
    if (selected.includes(id) || resetTime.current) {
      return;
    }
    setSelected(selected.concat(id));
  }

  return (
    <div className="App">
      <Header startGame={startGame} />
      {message && <h3>{message}</h3>}
      <div className="card-grid">
        {deck.map((card, index) => 
          <Card
              key={index} 
              id={index} 
              imgUrl={mainDeck[card]}
              isSelected={selected.includes(index)} 
              handleClick={() => clickHandler(index)}
              didMatch={pairs.includes(index)}
            />
          )
        }
      </div>
    </div>
  );
}

export default App;
