import React, { useState, useEffect } from "react";
import cardsGenerator from "../../supplementary/CardsGenerator";
import classes from "./Board.module.css";
import Card from "../../components/Card/Card";
import Dialog from "../Dialog/Dialog";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../UI/Spinner/Spinner";

function Board(props) {
	const [cardList, setCardList] = useState(null);
	const [firstSelectedId, setFirstSelectedId] = useState(-1);
	const [secondSelectedId, setSecondSelectedId] = useState(-1);
	const [clickable, setClickable] = useState(true);
	const [score, setScore] = useState(0);
	const [cardsSolved, setCardsSolved] = useState(0);
	const [type, setType] = useState(null);

	useEffect(() => {
		props.prepAfterFinished();
		const path = props.location.pathname;
		if (path[path.length - 1] === "1") {
			setCardList(cardsGenerator("color"));
			setType("color");
		} else {
			setCardList(cardsGenerator("card"));
			setType("card");
		}
		setCardList(cardsGenerator());
	}, []);

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
				const updatedCardList = cardList.map((card) => ({ ...card }));
				updatedCardList[firstSelectedId].flipped = false;
				updatedCardList[secondSelectedId].flipped = false;
				setFirstSelectedId(-1);
				setSecondSelectedId(-1);
				setCardList(updatedCardList);
				setTimeout(() => {
					setClickable(true);
				}, 720);
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

	const dialog = cardsSolved === 24 ? <Dialog score={score} type={type} /> : null;

	let board = <Spinner />;
	if (cardList !== null && type !== null) {
		board = (
			<div className={classes.Body}>
				<div className={classes.Board}>
					{cardList.map((card) => (
						<Card
							type={type}
							link={card.link}
							isFlipped={card.flipped}
							isSolved={card.solved}
							color={card.color}
							clicked={() => cardClickedHandler(card.id)}
							key={card.id}
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<React.Fragment>
			{dialog}
			{board}
		</React.Fragment>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		prepAfterFinished: () => dispatch(actions.setBackToHome()),
	};
};

export default connect(null, mapDispatchToProps)(Board);
