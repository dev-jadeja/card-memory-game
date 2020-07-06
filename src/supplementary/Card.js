class Card {
    constructor(flipped, color, solved, identifier) {
        this.flipped = flipped;
        this.color = color;
        this.solved = solved;
        this.identifier = identifier;
        this.id = 0;
    }
}

export default Card;