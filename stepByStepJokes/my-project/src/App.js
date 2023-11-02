import './App.css';
import React, { useEffect, useState } from 'react';
// =============================================================
//   WRITE YOUR CODE BELOW
// =============================================================

// <Header />
const Header = (props) => {
  return(
    <header>
    <h1>Page of {props.numJokes} jokes</h1>
  </header>
  )
}
// <Card />
const Card = (props) => {

const flipJoke = (id, joke) => {
  const cardHTML = document.getElementById(id);
  cardHTML.innerHTML = joke.delivery;
}

  return(
    <div className='card'>
    <button className='remove-card' onClick={()=>props.deleteCard(props.id)}>Delete</button>
    <div className='img' onClick={()=>flipJoke(props.id, props.joke)}>
      <p id={props.id}>{props.jokeFront}</p>
    </div>
  </div>
  )
}

// <App />
function App() {
const [jokes, setJokes] = useState([]);

useEffect(() => {
  fetch('https://v2.jokeapi.dev/joke/Any?type=twopart&amount=10')
    .then(res => res.json())
    .then(data => setJokes(data.jokes));
},[]);

const handleDelete = (id) => {
  setJokes(jokes.filter(c => c.id !== id));
}

  return (
    <div className="App">
      <Header numJokes={jokes.length}/>
      <div className='container'>
        {jokes.map(joke => {
          return(
            <Card jokeFront={joke.setup} id={joke.id} deleteCard={handleDelete} joke={joke}/>
          )
        })}
      </div>
    </div>
  );
}

export default App;
