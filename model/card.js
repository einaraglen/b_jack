class Card{
    constructor(face, number) {
        this.face = face;
        this.number = number;
    }

    getData() {
        let data = [this.face, this.number];
        
        return data;
    }
    equals(card) {
        return (this.face == card.face && this.number == card.number);
    }
}