class BetController{
    constructor(score) {
        //consts
        this.scoreTxt = document.querySelector("#scoreTxt");
        this.amountTxt = document.querySelector("#amount");

        this.betTop = document.querySelector("#betTop");
        this.betMid = document.querySelector("#betMid");
        this.betBot = document.querySelector("#betBot");

        //variables
        this.bet = 0;
        this.allowBet = true;
        this.opacity = ["opacity: 1", "opacity: .3"];
        this.score = score;
        this.oldScore = 0;
    }

    incrementBet(increment) {
        if(this.allowBet) {

            if((this.score - (this.bet + increment)) < 0) {
                this.allowBet = false;
            } 
            
            else {
                this.hasBet = true;
                this.bet += increment;
                this.amountTxt.innerHTML = this.bet;
                this.allowBet = true;
            }

        }
    }

    bettingAvailable(available) {
        let index = 0;
        this.allowBet = available;

        if(!available) {index = 1;}

        this.betTop.style = this.opacity[index];
        this.betMid.style = this.opacity[index];
        this.betBot.style = this.opacity[index];
    }

    handleOutcome(result) {
        let current = this.score;

        if(result === "user") {
            current += this.bet;
        } 
        
        else if(result === "comp") {
            current -= this.bet;
        }

        //this.updateScore(current);

        return current;
    }

    updateScore(value) {
        this.oldScore = this.score;
        this.score = value;
        this.scoreTxt.innerHTML = value;
        
        return (this.score - this.oldScore);
    }

    reset() {
        this.bet = 0;
        this.allowBet = true;
    }
}