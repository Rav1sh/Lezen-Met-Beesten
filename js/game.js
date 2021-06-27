"use strict";
class Game {
    constructor() {
        this.allLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.background = ["./images/jungle.jpeg", "./images/savanna.jpeg", "./images/ocean.jpeg", "./images/beach.jpeg", "./images/plains.jpeg", "./images/underground.jpeg", "./images/sky.jpeg", "./images/forest.jpeg", "./images/ice.jpeg", "./images/tundra.jpeg"];
        this.currentLevel = 0;
        this.webserviceURL = 'webservice/index.php';
        this.animFrames = 4;
        this.frame = 0;
        this.frameWidth = 400;
        this.tigerFPS = 0;
        console.log("Page is Loading!!");
        window.addEventListener("load", (e) => this.init());
    }
    init() {
        console.log("Page is Loaded");
        document.body.style.backgroundImage = "url(./images/background.jpeg)";
        let main = document.getElementById("main");
        this.levelContainer = document.querySelector("#levelsDiv");
        main === null || main === void 0 ? void 0 : main.addEventListener("click", (e) => this.level(e));
        let tigerdiv = document.getElementById("wavingTiger");
        tigerdiv === null || tigerdiv === void 0 ? void 0 : tigerdiv.addEventListener("click", (e) => this.hulpPage(e));
        if (typeof window.localStorage === "undefined") {
            console.error('Local storage is not available in your browser');
            return;
        }
        this.fetchQuestions();
        this.checkProgress();
        this.levelsLoop();
        this.gameLoop();
    }
    fetchQuestions() {
        console.log("Fetching data");
        fetch(this.webserviceURL)
            .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
            .then(data => console.log(data))
            .catch(data => console.log(data));
    }
    checkProgress() {
        let storedstring = localStorage.getItem('levelsComplete');
        if (storedstring) {
            let storedData = JSON.parse(storedstring);
            this.currentLevel = Number(storedData);
        }
        else {
            this.currentLevel = 0;
        }
    }
    levelsLoop() {
        for (let i = 0; i < this.allLevels.length; i++) {
            this.createLevels(i);
        }
    }
    createLevels(index) {
        var _a;
        const levelDiv = document.createElement("button");
        levelDiv.classList.add("levels");
        levelDiv.classList.add("locked");
        levelDiv.dataset.index = index + 1;
        levelDiv.innerText = this.allLevels[index];
        if (this.currentLevel < index) {
            levelDiv.style.backgroundImage = `url("images/lock.png"), url("${this.background[index]}")`;
        }
        else {
            levelDiv.style.backgroundImage = `url(" "), url("${this.background[index]}")`;
        }
        (_a = this.levelContainer) === null || _a === void 0 ? void 0 : _a.appendChild(levelDiv);
    }
    level(e) {
        let level = Number(e.target.dataset.index);
        if (level <= this.currentLevel + 1) {
            this.tempNumber = e.target.dataset.index - 1;
            localStorage.setItem('currentLevel', this.tempNumber.toString());
            window.location.href = "Levels";
        }
        if (e.target.className.includes("play-button", "play-button-outside")) {
            localStorage.setItem('currentLevel', this.currentLevel.toString());
            window.location.href = "Levels";
        }
    }
    hulpPage(e) {
        window.location.href = "tussenlevel.html";
    }
    gameLoop() {
        this.tigerUpdate();
        requestAnimationFrame(() => this.gameLoop());
    }
    tigerUpdate() {
        let tigerdiv = document.getElementById("wavingTiger");
        this.tigerFPS++;
        if (this.tigerFPS % 20 == 0)
            this.frame++;
        if (this.frame > this.animFrames)
            this.frame = 0;
        let pos = 0 - (this.frame * this.frameWidth);
        tigerdiv.style.backgroundPosition = `${pos}px 0px`;
    }
}
new Game();
//# sourceMappingURL=game.js.map