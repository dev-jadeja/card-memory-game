class Card {
    constructor(flipped, text, solved, identifier) {
        this.flipped = flipped;
        this.text = text;
        this.solved = solved;
        this.identifier = identifier;
        this.id = 0;
    }
}

export default Card;