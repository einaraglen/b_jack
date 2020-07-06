class DevTool {
    constructor() {
        this.devtool = document.querySelector("#devtool");
        this.commandField = document.querySelector("#field");
        this.logField = document.querySelector("#lines");

        this.consoleToggle = false;
        this.doSplit = false;

        this.commands = new Array("help", "quit", "reset", "clear", "split");
    }

    commit() {
        if(this.consoleToggle) {
            this.handleCommand(this.commandField.value);
        }

        this.logField.scrollTop = this.logField.scrollHeight;
    }

    handleCommand(str) {
        switch(str) {

            case "quit":
                this.quit();
                break;
                
            case "help":
                this.help();
                break;
                
            case "reset":
                this.reset();
                break;

            case "split":
                this.split();
                break; 
                
            case "clear":
                this.commandField.value = "";
                this.logField.innerHTML = "";
                break;   

            case "easteregg":
                this.commandField.value = "";
                this.newLine("this is a easter egg");
                break;
            
            default:
                this.newLine("your input '" + str + "' is not a command, type help for more"); 
                break;    
            
        }
    }

    split() {
        this.commandField.value = "";
        if(!this.doSplit) {
            this.newLine("split is set to true");
            this.doSplit = true;
        }

        else {
            this.newLine("split is set to false");
            this.doSplit = false;
        }
    }

    quit() {
        this.commandField.value = "";
        this.toggleConsole();
    }

    help() {
        this.commandField.value = "";

        this.newLine("following are commands :");
        this.newLine("blank");

        this.commands.forEach(e => {
            this.newLine(e);
        });

        this.newLine("blank");
        this.newLine("- - - - - -");
    }

    reset() {
        this.commandField.value = "";

        localStorage.setItem("score", "1000");
        location.reload();
    }

    toggleConsole() {
        if(!this.consoleToggle) {
            this.devtool.style = "display: block";
            this.consoleToggle = true;
            this.commandField.focus();
        } 
        
        else {
            this.devtool.style = "display: none";
            this.consoleToggle = false;
        }
    }

    newLine(str) {
        let div = document.createElement("div");
        let p = document.createElement("p");

        //hack code, should be rewritten
        if(str === "blank") {
            p.innerHTML = "blank";
            p.style = "opacity: 0";
        }

        else {
            p.innerHTML = str;
        }

        div.setAttribute("class", "line");

        div.appendChild(p);
        this.logField.appendChild(div);
    }
}