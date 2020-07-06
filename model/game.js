class Game {
    constructor() {
        this.factory = new CardFactory();
        this.user = new Array();
        this.split = new Array();
        this.comp = new Array();
        this.isSplit = false;
        this.max = false;
    }

    drawUser(doSplit) {
        if(!doSplit) {
            this.user.push(this.factory.drawCard());
        } 
        
        else {

            if(this.isSplit) {
                this.user.push(this.factory.drawCard());
                this.split.push(this.factory.drawCard());
            } 
            
            else {
                this.split.push(this.user[0]);
                this.user = this.user.slice(1,2);
                this.isSplit = true; 
            }

        }
    }

    drawComp() {
        this.comp.push(this.factory.drawCard());
    }

    drawSplit() {
        this.user[0] = 18;
        this.user[1] = 18;
        this.drawComp();
    }

    clear() {
        this.factory.clearInPlay();
        this.user = new Array();
        this.split = new Array();
        this.comp = new Array();
        this.isSplit = false;
        this.max = false;
    }

    isSplittable() {
        if(this.isSplit) {
            return true;
        } else {
            let first = this.factory.getCard(this.user[0]).number;
            let secound = this.factory.getCard(this.user[1]).number;
            return (first == secound);
        }
    }

    hasAce() {
        let found = false;

        this.user.forEach(e => {

            if(this.factory.getCard(e).getData()[1] == 1) {
                found = true;
            }

        });

        return found;
    }

    getAllTotals() {
        let totals = new Array();
        let arrs = new Array("user", "split", "comp");

        arrs.forEach(e => {
            totals.push(this.getTotal(e));
        });

        return totals;
    }

    totalOf(arr, isComp) {
        let total = 0;
        arr.forEach(e => {

            if(!isComp && this.max && this.factory.getCard(e).getData()[1] == 1) {
                total = total + 11;
            }

            else if(this.factory.getCard(e).getData()[1] > 10) {
                total = total + 10;
            } 
            
            else {
                total = total + this.factory.getCard(e).getData()[1];
            }

        });

        return total;
    }

    getTotal(type) {
        let total = 0;

        switch(type) {
            case "user":
                total = this.totalOf(this.user, false);
                break;

            case "split":
                total = this.totalOf(this.split, false);
                break;
                
            case "comp":
                total = this.totalOf(this.comp, true);
                break;    
        }

        return total;
    }
}

