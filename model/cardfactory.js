class CardFactory {
    constructor() {
        this.stack = this.createStack();
        this.inPlay = new Array();
    }
    createStack = function() {  
        let stack = new Array();

        for(var i=0; i<4; i++) {
            for(var j=1; j<14; j++) {
                stack.push(new Card(i, j));
            }
        }

        return stack;
    }
    drawCard() {
        let unique = false;

        while(!unique) {
            let index = Math.floor(Math.random()*52);

            if(this.inPlay.length == 52) {
                unique = true;
            } 
            
            else if(this.inPlay.length == 0 || !this.inPlay.includes(index)) {
                this.inPlay.push(index);
                unique = true;
                
                return index;
            }

        }
    }
    getCard(index) {
        return this.stack[index];
    }
    clearInPlay() {
        this.inPlay = new Array();
    }
}