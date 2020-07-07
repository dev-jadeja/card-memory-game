import React, { useState, useEffect } from "react";
import axios from "../../../axios-score";
import Spinner from "../../../UI/Spinner/Spinner";

function ScoreBoard() {
	const [scoreList, setScoreList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get("/scores.json")
			.then((res) => {
				let fetchedScoreList = [];
				for (let key in res.data) {
					fetchedScoreList.push({
						key: key,
						...res.data[key],
					});
				}

				fetchedScoreList.sort((prev, next) => {
					return prev.moves > next.moves ? 1 : -1;
				});

				if (fetchedScoreList.length > 10)
					fetchedScoreList.splice(10, fetchedScoreList.length - 10);
				setScoreList(fetchedScoreList);
				console.log(fetchedScoreList);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	let list = (
		<ul>
			{scoreList.map((scoreCard) => {
				return (
					<li key={scoreCard.key}>
						<span>{scoreCard.moves} moves</span>
						<span>
							<i className="far fa-calendar-alt"></i>{" "}
							{scoreCard.date}
						</span>
					</li>
				);
			})}
		</ul>
	);

	if (loading) list = <Spinner />;

	return list;
}

export default ScoreBoard;
