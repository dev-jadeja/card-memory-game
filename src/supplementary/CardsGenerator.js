import cards from "./CardsList";

const shuffle = (array) => {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		array[currentIndex].id = randomIndex;
		array[randomIndex].id = currentIndex;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
};

const cardsGenerator = () => {
	let shuffledCardList = [];

	let id = -1;

	for (let card of cards) {
		shuffledCardList.push({ ...card });
		id++;
		shuffledCardList[shuffledCardList.length - 1].id = id;
		shuffledCardList.push({ ...card });
		id++;
		shuffledCardList[shuffledCardList.length - 1].id = id;
	}
	shuffle(shuffledCardList);
	return shuffledCardList;
};

export default cardsGenerator;
