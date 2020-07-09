class Card {
    constructor(flipped, color, solved, identifier, link) {
        this.flipped = flipped;
        this.color = color;
        this.solved = solved;
        this.identifier = identifier;
        this.id = 0;
        this.link = link;
    }
}

export default Card;