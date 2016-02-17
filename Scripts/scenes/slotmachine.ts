// SLOT MACHINE SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _creditImage: createjs.Bitmap;
        private _betImage: createjs.Bitmap;
        private _bet1Button: objects.Button;
        private _bet10Button: objects.Button;
        private _bet100Button: objects.Button;
        private _spinButton: objects.Button;
        private _resetButton: objects.Button;
        private _quitButton: objects.Button;
        private _betLabel: objects.Label;
        private _jackpotLabel: objects.Label;
        private _creditLabel: objects.Label;
        private _reel1: createjs.Bitmap;
        private _reel2: createjs.Bitmap;
        private _reel3: createjs.Bitmap;

        private _grapes = 0;
        private _bananas = 0;
        private _oranges = 0;
        private _cherries = 0;
        private _bars = 0;
        private _bells = 0;
        private _sevens = 0;
        private _blanks = 0;
        private _bet = 15;
        private _jackpot = 10140;
        private _credit = 150;
        private _win = 0;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {               
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
        
            //add ResetButton to the scene
            this._resetButton = new objects.Button("Reset", 185, 0, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
        
            //add QuitButton to the scene
            this._quitButton = new objects.Button("Quit", 418, 0, false);
            this.addChild(this._quitButton);
            this._quitButton.on("click", this._quitButtonClick, this);
            
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 168, 382, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this); 
            
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 240, 382, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this); 
            
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 312, 382, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this); 
            
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 402, 382, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this); 
            
            // add Credit image to the scene
            this._creditImage = new createjs.Bitmap(assets.getResult("Credit"));
            this._creditImage.x = 180;
            this._creditImage.y = 293;
            this.addChild(this._creditImage);
            
            // add Bet image to the scene
            this._betImage = new createjs.Bitmap(assets.getResult("Bet"));
            this._betImage.x = 335;
            this._betImage.y = 293;
            this.addChild(this._betImage);
            
            // add jackpot label to the scene
            this._jackpotLabel = new objects.Label(153456, "25px Impact", "#000000", config.Screen.CENTER_X, 13);
            this.addChild(this._jackpotLabel);
            
            // add bet label to the scene
            this._betLabel = new objects.Label(100, "25px Impact", "#000000", 433, 305);
            this.addChild(this._betLabel);
            
            // add credit label to the scene
            this._creditLabel = new objects.Label(1000, "25px Impact", "#000000", 290, 305);
            this.addChild(this._creditLabel);
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // SLOT_MACHINE Scene updates here
        public update(): void {

        }
        
        //PRIVATE METHODS
        
        // function to generate reels
        private _createReel(image: string, position: number): void {
            if(position == 0) {
                this._reel1 = new createjs.Bitmap(assets.getResult(image));
                this.addChild(this._reel1);
                this._reel1.x = 216;
                this._reel1.y = 220;
            }
            else if(position == 1) {
                this._reel2 = new createjs.Bitmap(assets.getResult(image));
                this.addChild(this._reel2);
                this._reel2.x = 300;
                this._reel2.y = 220;
            }
            else if(position == 2) {
                this._reel3 = new createjs.Bitmap(assets.getResult(image));
                this.addChild(this._reel3);
                this._reel3.x = 383;
                this._reel3.y = 220;
            }
        }
        
        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }
        
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _reels(): string[] {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            
            // Clear reels before displaying new reel object 
            this._createReel("Blank", 0);
            this._createReel("Blank", 1);
            this._createReel("Blank", 2);

            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):  // 41.5% probability
                        betLine[spin] = "blank";
                        this._blanks++;
                        this._createReel("Blank", spin);
                        break;

                    case this._checkRange(outCome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        this._createReel("Grape", spin);
                        break;

                    case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "Banana";
                        this._bananas++;
                        this._createReel("Banana", spin);
                        break;

                    case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = "Orange";
                        this._oranges++;
                        this._createReel("Orange", spin);
                        break;

                    case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        this._createReel("Cherry", spin);
                        break;

                    case this._checkRange(outCome[spin], 60, 62): //  4.6% probability
                        betLine[spin] = "Bar";
                        this._bars++;
                        this._createReel("Bar", spin);
                        break;

                    case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                        betLine[spin] = "Bell";
                        this._bells++;
                        this._createReel("Bell", spin);
                        break;

                    case this._checkRange(outCome[spin], 65, 65): //  1.5% probability
                        betLine[spin] = "Seven";
                        this._sevens++;
                        this._createReel("Seven", spin);
                        break;
                }  
            }
            return betLine;
        }
        
        // function to reset fruit counts
        private _resetFruitTally(): void {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }

        // function to reset game
        private _resetGame(): void {
            //Clear reels
            this._createReel("Blank", 0);
            this._createReel("Blank", 1);
            this._createReel("Blank", 2);
            this._credit = 150;
            this._jackpot = 10140;
            this._win = 0;
            this._bet = 15;
            this._resetFruitTally();
        }
                
        // function to calculate winning amount
        private _calculateWinning(): void {
            // deduct amount from player's credit
            this._win = 0;
            
            // calculate winning amount
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this._win = this._bet * 10;
                }
                else if (this._bananas == 3) {
                    this._win = this._bet * 20;
                }
                else if (this._oranges == 3) {
                    this._win = this._bet * 30;
                }
                else if (this._cherries == 3) {
                    this._win = this._bet * 40;
                }
                else if (this._bars == 3) {
                    this._win = this._bet * 50;
                }
                else if (this._bells == 3) {
                    this._win = this._bet * 75;
                }
                else if (this._sevens == 3) {
                    this._win = this._bet * 100;
                }
                else if (this._grapes == 2) {
                    this._win = this._bet * 2;
                }
                else if (this._bananas == 2) {
                    this._win = this._bet * 2;
                }
                else if (this._oranges == 2) {
                    this._win = this._bet * 3;
                }
                else if (this._cherries == 2) {
                    this._win = this._bet * 4;
                }
                else if (this._bars == 2) {
                    this._win = this._bet * 5;
                }
                else if (this._bells == 2) {
                    this._win = this._bet * 10;
                }
                else if (this._sevens == 2) {
                    this._win = this._bet * 20;
                }
                else if (this._sevens == 1) {
                    this._win = this._bet * 5;
                }
                else {
                    this._win = this._bet * 1;
                }
                this._credit += this._win;
                this._resetFruitTally();
                //winNumber++;
                //showWinMessage();
            }
            else {
                //lossNumber++;
                //showLossMessage();
                this._jackpot += this._bet;
                this._credit -=  this._bet;
                this._resetFruitTally();
            }
            console.log("User Credit:" + this._credit);
            console.log("Bet Amount:" + this._bet);
            console.log("Winning Amount:" + this._win);
            console.log("Jackpot Amount:" + this._jackpot);
        }
        
        // determine eligibility of player
        private _determineEligibility(): void {
            if (this._credit <= 0) {
                if (confirm("You ran out of money? Do you want to play again?")) {
                    this._resetGame();
                }
            }
            else if (this._bet > this._credit) {
                alert("You don't have enough money to place that bet.");
            }
            else if (this._bet <= this._credit) {
                console.log(this._reels());
                this._calculateWinning();
            }
        }
                       
        //EVENT HANDLERS ++++++++++++++++++++
        private _resetButtonClick(event: createjs.MouseEvent): void {
            console.log("Reset game");
            this._resetGame();
        }

        private _quitButtonClick(event: createjs.MouseEvent): void {
            //switch to GAMEOVER scene
            scene = config.Scene.GAME_OVER;
            changeScene();
            console.log("start Game over scene");
        }
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 1 Credit");
        }

        private _bet10ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 10 Credit");
        }

        private _bet100ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 100 Credit");
        }

        private _spinButtonClick(event: createjs.MouseEvent): void {
            console.log("Spin those reels!");
            this._determineEligibility();
        }
    }
}