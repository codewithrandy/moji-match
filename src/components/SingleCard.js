import './SingleCard.css'

export const SingleCard = ({card, handleChoice, flipped, disabled, playClick, audioOn}) => {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
            if (audioOn) {
                playClick()
            }
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className=" front" alt="card front" />
                <img src="https://randymckown.com/portfolio/moji-match/img/cover.png" className="back" alt="card-back" onClick={handleClick}/>
            </div>
        </div>
    )
}