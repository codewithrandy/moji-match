import './App.css'
import clickAudio from './audio/click.m4a'
import matchAudio from './audio/match.wav'
import winnerAudio from './audio/winner.wav'

import { useState, useEffect } from 'react'
import { SingleCard } from './components/SingleCard'

const cardImages = [
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-1.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-2.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-3.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-4.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-5.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-6.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-7.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-8.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-9.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-10.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-11.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-12.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-13.png", matched: false },
  { "src": "https://randymckown.com/portfolio/moji-match/img/card-14.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [audioOn, setAudioOn] = useState(true)
  const [matches, setMatches] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
      setMatches(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const playClick = () => {
    new Audio(clickAudio).play()
  }
  const playMatch = () => {
    new Audio(matchAudio).play()
  }
  const playWinner = () => {
    new Audio(winnerAudio).play()
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    if (choiceTwo !== null) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setMatches(prevMatches => prevMatches + 1)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              if (audioOn) {
                if (matches === 13) {
                  playWinner()
                } else {
                  playMatch()
                }
              }
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  const setAudio = () => {
    audioOn ? setAudioOn(false) : setAudioOn(true)
  }

  return (
    <div className="App">
      <h1>Moji Match</h1>
      <div className='menubar'>
          <p className='score'>Player Turns: {turns}</p>
        <div>
          <button onClick={shuffleCards}>New Game</button>
          <button onClick={setAudio}>{(audioOn) ? "Audio On" : "Audio Off"}</button>
        </div>
      </div>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={ card === choiceOne || card === choiceTwo || card.matched }
            disabled={disabled}
            playClick={playClick}
            audioOn={audioOn}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
