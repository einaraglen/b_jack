function main() {
    //setup elms lil edit lmao
    const drawBtn = document.querySelector("#draw");
    const holdBtn = document.querySelector("#hold");
    const splitBtn = document.querySelector("#split");

    const betTop = document.querySelector("#betTop");
    const betMid = document.querySelector("#betMid");
    const betBot = document.querySelector("#betBot");

    const max = document.querySelector("#max");
    const min = document.querySelector("#min");

    this.logDiv = document.querySelector("#log");

    //checks for local data available, creates instance.
    if(localStorage.getItem("score") === null) {
        localStorage.setItem("score", "1000");
    }

    let score = parseInt(localStorage.getItem("score"));
    scoreTxt.innerHTML = score;

    //setup model
    const opacity = new Array("opacity: .3", "opacity: 1");
    const game = new Game();
    const betController = new BetController(score);
    const cardController = new CardController();
    const logger = new Logger(logDiv);
    const devTool = new DevTool();

    //const stack = getCards();
    let start = true;
    let doSplit = false;
  
    let allowSplitPress = false;
    let allowHoldPress = false;
    let allowDrawPress = true;

    let roundOver = false;
    let loggToggle = false;

    //exstras
    let result = "";
    //logDiv.scrollTop = logDiv.scrollHeight;
    checkForGameOver();

    //setup events
    drawBtn.addEventListener("click", drawEvent);
    holdBtn.addEventListener("click", holdEvent);
    splitBtn.addEventListener("click", splitEvent);

    betTop.onclick = function() {betController.incrementBet(25)}
    betMid.onclick = function() {betController.incrementBet(50)}
    betBot.onclick = function() {betController.incrementBet(100)}

    max.onclick = function() {aceEvent(true)}
    min.onclick = function() {aceEvent(false)}

    document.onkeydown = function(e) {        
        if(e.keyCode == 45) {
            devTool.toggleConsole();
        }

        if(e.keyCode == 13) {
            devTool.commit();
        }
    }

    //program
    function drawEvent() {
        if(allowDrawPress) {

            if(!roundOver) {

                if(start) {

                    firstRound();
                }
                
                else {
                    allowSplit(false);
                    game.drawUser(doSplit);
                }

            } 
            
            else {
                reset();
            }

            if(userBest() || userIsAbove()) {
                holdEvent();
            }
    
            update();
        }
    }

    function reset() {
        score = betController.handleOutcome(result);
        let old = betController.updateScore(score);
        localStorage.setItem("score", score);

        logger.log(result, old, game.max, doSplit);

        game.clear();
        betController.reset();
        checkForGameOver();
        betController.bettingAvailable(true);
        cardController.displayCompCards(game.comp, false);
        cardController.unsplit();

        start = true;
        doSplit = false;
        roundOver = false;
        result = "";
        drawBtn.innerHTML = "start";
        allowHold(false);
        allowSplit(false);
    }

    function checkForGameOver() {
        if(score == 0) {
            allowDraw(false);
        } 
        
        else {
            betController.incrementBet(25);
        }
    }

    function update() {
        cardController.updateScore(game.getAllTotals(), doSplit);
        cardController.displayAllCards(game.user, game.split);
    }

    function holdEvent() {
        if(allowHoldPress) {
            
            while(game.getTotal("comp") <= 16) {
                game.drawComp(); 
                cardController.displayCompCards(game.comp, false);
                cardController.updateScore(game.getAllTotals(), doSplit);
            }

            allowHold(false);
            allowSplit(false);

            result = cardController.getOutcome(game.getAllTotals());

            roundOver = true;
            drawBtn.innerHTML = "next";
        }
    }

    function splitEvent() {
        if(allowSplitPress) {
            doSplit = true;
            game.drawUser(doSplit);
            cardController.split();
            update();
            allowSplit(false);
        }
    }

    function aceEvent(max) {
        game.max = max;
        allowDraw(true);
        allowHold(true);

        cardController.hideAceButtons();
        cardController.updateScore(game.getAllTotals(), doSplit);

        if(userBest() || userIsAbove()) {
            holdEvent();
            allowHold(false);
        }
    }

    function handleAce() {
        cardController.showAceButtons(game.getTotal("user"));
        allowDraw(false);
        allowHold(false);
    }

    function userIsAbove() {
        return (game.getTotal("user") > 21) || (game.getTotal("split") > 21);
    }

    function userBest() {
        return (game.getTotal("user") == 21) || (game.getTotal("split") == 21)
    }

    function firstRound() {
        start = false;
        drawBtn.innerHTML = "draw";

        if(devTool.doSplit) {
            game.drawSplit();
        } 

        else {

            for(let i=0;i<3;i++) {

                if(i<2) {
                    game.drawUser(doSplit);
                } 
                
                else {
                    game.drawComp();
                }
                
            }

        }

        cardController.displayCompCards(game.comp, true);
        betController.bettingAvailable(false);

        allowHold(true);
        if(game.isSplittable()) {allowSplit(true);}
        if(game.hasAce()) {handleAce();}
    }

    function allowDraw(available) {
        let index = 0;
        allowDrawPress = available;
        if(available) {index = 1}
        drawBtn.style = opacity[index];
    }

    function allowHold(available) {
        let index = 0;
        allowHoldPress = available;
        if(available) {index = 1}
        holdBtn.style = opacity[index];
    }

    function allowSplit(available) {
        let index = 0;
        allowSplitPress = available;
        if(available) {index = 1}
        splitBtn.style = opacity[index];
    }    
}