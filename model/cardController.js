class CardController {
    constructor() {
        //consts
        this.userCardField = document.querySelector("#userCards");
        this.splitCardField = document.querySelector("#splitCards");
        this.compCardField = document.querySelector("#compCards");

        this.userScore = document.querySelector("#userScore");
        this.compScore = document.querySelector("#compScore");

        this.max = document.querySelector("#max");
        this.min = document.querySelector("#min");

        this.PATH = "view/resources/";

        //variables
        this.stack = this.getStack();
    }

    split() {
        this.userCardField.style = "margin-top: 2%; height: 35%";
        this.splitCardField.style = "opacity: 1; height: 35%; display: block";
    }

    unsplit() {
        this.userCardField.style = "margin-top: 10%; height: 35%";
        this.splitCardField.style = "opacity: 0; height: 25%; display: none";
    }

    getStack() {  
        let stack = new Array();

        for(var i=0; i<4; i++) {

            for(var j=1; j<14; j++) {
                stack.push(new Card(i, j));
            }

        }

        return stack;
    }

    getOutcome(totals) {
        let best = null;

        let userTotal = totals[0];
        let splitTotal = totals[1];
        let compTotal = totals[2];
        
        if(userTotal > splitTotal || splitTotal > 21) {
            best = userTotal;
        } 
        
        else {
            best = splitTotal;
        }

        let winner = null;

        if(best == compTotal) {
            winner = "draw";
        }

        if(best > compTotal) {
            winner = "user";
        }

        if(compTotal > 21) {
            winner = "user";
        } 

        if(compTotal > best) {
            winner = "comp";
        }

        if(compTotal > 21) {
            winner = "user";
        }

        if(best > 21) {
            winner = "comp";
        }
         
        return winner;
    }

    showAceButtons(total) {
        this.max.style = "display: inline-block";
        this.min.style = "display: inline-block";

        this.max.innerHTML = "max (" + (total + 10) + ")";
        this.min.innerHTML = "min (" + total + ")";
    }

    hideAceButtons() {
        this.max.style = "display: none";
        this.min.style = "display: none";
    }

    displayAllCards(arr1, arr2) {
        let currentStack = this.stack;
        this.displayCards(arr1, this.userCardField, currentStack, false);
        this.displayCards(arr2, this.splitCardField, currentStack, false);
    }

    displayBacksideCards() {
        let img = document.createElement("img");
        img.setAttribute("src", this.PATH + "backside.png");
        img.setAttribute("class", "cards");
        this.compCardField.appendChild(img);
    }

    displayCompCards(comp, first) {
        let currentStack = this.stack;
        this.displayCards(comp, this.compCardField, currentStack, first);
    }

    displayCards(arr, elm, stack, first) {
        let faces = new Array("hearts", "spades", "clubs", "diamonds");
        elm.innerHTML = "";

        arr.forEach(e => {
            let card = stack[e];
            let img = document.createElement("img");
            
            img.setAttribute("src", this.PATH + card.number +  faces[card.face] + ".png");

            img.setAttribute("class", "cards");
            elm.appendChild(img);
        });

        if(first) {this.displayBacksideCards();}
    }

    updateScore(totals, doSplit) {
        let userTotal = totals[0];
        let splitTotal = totals[1];
        let compTotal = totals[2];

        if(!doSplit) {
            this.userScore.innerHTML = userTotal;
        } 
        
        else {
            this.userScore.innerHTML = userTotal + " | " + splitTotal;
        }
        
        this.compScore.innerHTML = compTotal;
    }
}