class Game {
    private levelContainer : HTMLElement | null
    private allLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    private background = ["./images/jungle.jpeg", "./images/savanna.jpeg", "./images/ocean.jpeg", "./images/beach.jpeg", "./images/plains.jpeg", "./images/underground.jpeg", "./images/sky.jpeg", "./images/forest.jpeg", "./images/ice.jpeg", "./images/tundra.jpeg"]
    private currentLevel : number = 0
    private tempNumber : any
    private webserviceURL : string = 'webservice/index.php'

    private animFrames : number = 4
    private frame : number = 0
    private frameWidth : number  = 400
    private tigerFPS : number  = 0

    
    constructor() {
        console.log("Page is Loading!!");
        window.addEventListener("load", (e:Event) => this.init())
    }

    init(){
        console.log("Page is Loaded");
        document.body.style.backgroundImage = "url(./images/background.jpeg)"

        //making variables of the div's 
        let main = document.getElementById("main")
        this.levelContainer = document.querySelector("#levelsDiv")
        //add event listener to check if a button is clicked
        main?.addEventListener("click", (e:MouseEvent) => this.level(e)) 

        let tigerdiv = document.getElementById("wavingTiger")
        tigerdiv?.addEventListener("click", (e:MouseEvent) => this.hulpPage(e))
    
        //Check if LocalStorage is available in the browser
        if (typeof window.localStorage === "undefined") {
            console.error('Local storage is not available in your browser');
            return;
        }
        
        this.fetchQuestions()
        this.checkProgress()
        this.levelsLoop()
        this.gameLoop()
    }

    fetchQuestions(){
        console.log("Fetching data");
        fetch(this.webserviceURL)
            .then((response) => {
                if (!response.ok) {
                   throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(data => console.log(data))
    }

    checkProgress(){
        let storedstring = localStorage.getItem('levelsComplete')
        if (storedstring){
            let storedData = JSON.parse(storedstring)
            this.currentLevel = Number(storedData)
        } else {
            this.currentLevel = 0
        }
    }
    levelsLoop(){
        //for loop for all levels
        for (let i = 0; i < this.allLevels.length; i++){
            this.createLevels(i)            
        }
    }

    createLevels(index:number){
        //Create div for the levels
        const levelDiv : any = document.createElement("button");
        //add card to the class list
        levelDiv.classList.add("levels")
    
        levelDiv.classList.add("locked")
        // levelDiv.classList.add(`${this.background[index]}`)
        //add a dataset with value from the For loop
        levelDiv.dataset.index = index + 1
        //add Text in levelDiv
        levelDiv.innerText = this.allLevels[index]
        if (this.currentLevel < index) {
            levelDiv.style.backgroundImage = `url("images/lock.png"), url("${this.background[index]}")`
        } else {
            levelDiv.style.backgroundImage = `url(" "), url("${this.background[index]}")`
        }
        //Append levelDiv to the levelContainer
        this.levelContainer?.appendChild(levelDiv)
    }

    level(e:any){
        //check if the level button is clicked
        let level = Number(e.target.dataset.index)
        if ( level <= this.currentLevel + 1) {
            //set the index of the button to a variable
            this.tempNumber = e.target.dataset.index -1
            //Make Current number the one that is clicked on
            localStorage.setItem('currentLevel', this.tempNumber.toString())
            //redirect to the page
            window.location.href = "Levels"
        } if (e.target.className.includes("play-button", "play-button-outside")) {
            //redirect to the page change 0
            localStorage.setItem('currentLevel', this.currentLevel.toString())
            window.location.href = "Levels"
        }
    }

    //redirect to hulp page
    hulpPage(e:MouseEvent){
        window.location.href = "tussenlevel.html"
    }

    gameLoop(){
        this.tigerUpdate()
        requestAnimationFrame(() => this.gameLoop())
    }

    tigerUpdate() {
        let tigerdiv = document.getElementById("wavingTiger")
        this.tigerFPS++
        if(this.tigerFPS % 20 == 0) this.frame++
        if(this.frame > this.animFrames) this.frame = 0
        let pos = 0 - (this.frame * this.frameWidth)
        tigerdiv!.style.backgroundPosition = `${pos}px 0px`

    }
}
new Game()