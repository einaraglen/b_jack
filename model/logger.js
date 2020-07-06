class Logger {
    constructor(logger) {
        this.logger = logger;
    }

    log(gameResult, scoreChange, aceMax, split) {
        let div = document.createElement("div");
        div.setAttribute("class", "logfield");

        let result = document.createElement("p");
        result.setAttribute("class", "grayfield");
        result.innerHTML = gameResult;

        let winloss = document.createElement("p");
        winloss.setAttribute("class", "lightgrayfield");
        
        if(scoreChange > 0) {
            winloss.innerHTML = "+" + scoreChange;
        } else {
            winloss.innerHTML = scoreChange;
        }

        let maxfield = document.createElement("p");
        maxfield.setAttribute("class", "grayfield");
        maxfield.innerHTML = aceMax;

        let splitfield = document.createElement("p");
        splitfield.setAttribute("class", "lightgrayfield");
        splitfield.innerHTML = split;

        div.appendChild(result);
        div.appendChild(winloss);
        div.appendChild(maxfield);
        div.appendChild(splitfield);

        //this.logger.appendChild(div);
        //autoscrolls to bottom of div
        //this.logger.scrollTop = this.logger.scrollHeight;
    }
}