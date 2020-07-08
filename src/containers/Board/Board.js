import React, { useState, useEffect } from "react";
import cardsGenerator from "../../supplementary/CardsGenerator";
import classes from "./Board.module.css";
import Card from "../../components/Card/Card";
import Dialog from "../Dialog/Dialog";

function Board() {
	const [cardList, setCardList] = useState(cardsGenerator());
	const [firstSelectedId, setFirstSelectedId] = useState(-1);
	const [secondSelectedId, setSecondSelectedId] = useState(-1);
	const [clickable, setClickable] = useState(true);
	const [score, setScore] = useState(0);
	const [cardsSolved, setCardsSolved] = useState(0);

	useEffect(() => {
		if (firstSelectedId === -1 || secondSelectedId === -1) return;
		if (
			cardList[firstSelectedId].identifier ===
			cardList[secondSelectedId].identifier
		) {
			const updatedCardList = cardList.map((card) => ({ ...card }));
			updatedCardList[firstSelectedId].solved = true;
			updatedCardList[secondSelectedId].solved = true;
			setCardList(updatedCardList);
			setCardsSolved(cardsSolved + 2);
			setFirstSelectedId(-1);
			setSecondSelectedId(-1);
		} else {
			setClickable(false);
			setTimeout(() => {
				setClickable(true);
			}, 1700);	
			setTimeout(() => {
				const updatedCardList = cardList.map((card) => ({ ...card }));
				updatedCardList[firstSelectedId].flipped = false;
				updatedCardList[secondSelectedId].flipped = false;
				setCardList(updatedCardList);
				setFirstSelectedId(-1);
				setSecondSelectedId(-1);
			}, 1000);	
		}
	}, [cardList, firstSelectedId, secondSelectedId, cardsSolved]);

	const cardClickedHandler = (id) => {
		if (
			cardList[id].solved === true ||
			!clickable ||
			cardList[id].flipped === true
		)
			return;
		setScore(score + 1);
		if (firstSelectedId === -1) setFirstSelectedId(id);
		else setSecondSelectedId(id);
		const updatedCardList = cardList.map((card) => ({ ...card }));
		updatedCardList[id].flipped = !updatedCardList[id].flipped;
		setCardList(updatedCardList);
	};

	const dialog = cardsSolved === 4 ? <Dialog score={score} /> : null;

	return (
		<React.Fragment>
			{dialog}
			<div className={classes.Body}>
				<div className={classes.Board}>
					{cardList.map((card) => (
						<Card
							isFlipped={card.flipped}
							isSolved={card.solved}
							color={card.color}
							clicked={() => cardClickedHandler(card.id)}
							key={card.id}
						/>
					))}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Board;
