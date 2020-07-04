import React, { useState, useEffect } from "react";
import cardsGenerator from "../../supplementary/CardsGenerator";
import classes from "./Board.module.css";
import Card from "../../components/Card/Card";

function Board() {
	const [cardList, setCardList] = useState(cardsGenerator());
	const [firstSelectedId, setFirstSelectedId] = useState(-1);
	const [secondSelectedId, setSecondSelectedId] = useState(-1);

	const cardClickedHandler = (id) => {
		if (cardList[id].solved === true) return;
		if (firstSelectedId === -1) setFirstSelectedId(id);
		else setSecondSelectedId(id);
		const updatedCardList = cardList.map((card) => ({ ...card }));
		updatedCardList[id].flipped = !updatedCardList[id].flipped;
		setCardList(updatedCardList);
	};

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
			setFirstSelectedId(-1);
			setSecondSelectedId(-1);
		} else {
			setTimeout(() => {
				const updatedCardList = cardList.map((card) => ({ ...card }));
				updatedCardList[firstSelectedId].flipped = false;
				updatedCardList[secondSelectedId].flipped = false;
				setCardList(updatedCardList);
				setFirstSelectedId(-1);
				setSecondSelectedId(-1);
			}, 1000);
		}
	}, [cardList, firstSelectedId, secondSelectedId]);

	return (
		<div className={classes.Board}>
			{cardList.map((card) => (
				<Card
					isFlipped={card.flipped}
					isSolved={card.solved}
					content={card.text}
					clicked={() => cardClickedHandler(card.id)}
					key={card.id}
				/>
			))}
		</div>
	);
}

export default Board;
