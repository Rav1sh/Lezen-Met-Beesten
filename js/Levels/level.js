"use strict";
class Level {
    constructor() {
        this.completed = false;
        this.currentLevel = 0;
        this.images = ["./images/aap2.jpg", "./images/vos.jpg", "./images/haai.png"];
        this.background = ["./images/jungle.jpeg", "./images/savanna.jpeg", "./images/ocean.jpeg", "./images/beach.jpeg", "./images/plains.jpeg", "./images/underground.jpeg", "./images/sky.jpeg", "./images/forest.jpeg", "./images/ice.jpeg", "./images/tundra.jpeg"];
        this.webserviceURL = '../webservice/index.php';
        this.answerA = document.getElementById("a");
        this.answerB = document.getElementById("b");
        this.answerC = document.getElementById("c");
        this.questionsDiv = document.getElementById("questions");
        let storedstring = localStorage.getItem('currentLevel');
        console.log(storedstring);
        this.currentLevel = Number(storedstring);
        this.fetchQuestions();
        document.body.style.backgroundImage = `url(${this.background[this.currentLevel]})`;
        let title = document.getElementById("title");
        let level = document.createElement("h1");
        level.classList.add("title");
        level.innerHTML = `Level ${this.currentLevel + 1}`;
        title === null || title === void 0 ? void 0 : title.appendChild(level);
        let fotodiv = document.getElementById("foto");
        let img = document.createElement('img');
        img.classList.add("foto");
        img.setAttribute('src', `${this.images[this.currentLevel]}`);
        fotodiv === null || fotodiv === void 0 ? void 0 : fotodiv.appendChild(img);
        console.log(img);
        switch (this.currentLevel) {
            case 0:
                this.answerA.setAttribute("value", "AA");
                this.answerB.setAttribute("value", "A");
                this.answerC.setAttribute("value", "OE");
                break;
            case 1:
                this.answerA.setAttribute("value", "E");
                this.answerB.setAttribute("value", "O");
                this.answerC.setAttribute("value", "I");
                break;
            case 2:
                this.answerA.setAttribute("value", "OO");
                this.answerB.setAttribute("value", "EE");
                this.answerC.setAttribute("value", "AA");
                break;
            default:
                break;
        }
        this.questionsDiv.addEventListener("click", (e) => this.correct(e));
        if (storedstring) {
            let storedData = JSON.parse(storedstring);
        }
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
    succesHandler(data) {
        let fetchedQuestions = data;
        console.log(fetchedQuestions);
    }
    errorHandler(data) {
        console.log(data);
    }
    correct(e) {
        const imggood = document.getElementById("good");
        const imgwrong = document.getElementById("wrong");
        console.log(e);
        let knop = e.target;
        console.log(knop.defaultValue);
        if (knop.defaultValue == "AA" || knop.defaultValue == "O") {
            console.log("Succes!!!");
            imggood.style.display = "block";
            imgwrong.style.display = "none";
            let string = localStorage.getItem("levelsComplete");
            if (Number(string) > this.currentLevel) {
                console.log("kleiner dan");
            }
            else {
                console.log("Groter dan");
                localStorage.setItem('levelsComplete', JSON.stringify(this.currentLevel + 1));
            }
            setTimeout(function () {
                location.href = "../";
            }, 3000);
        }
        else {
            console.log("Pech");
            imgwrong.style.display = "block";
            imggood.style.display = "none";
        }
    }
}
new Level();
//# sourceMappingURL=level.js.map