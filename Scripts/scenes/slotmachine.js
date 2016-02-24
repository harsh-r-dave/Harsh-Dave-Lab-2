// SLOT MACHINE SCENE
// GAME LOGIC (_reels & _calculateWinning) CREDIT: Tom Tsiliopoulos, Professor, Centennial College
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
            this._bet = 10;
            this._jackpot = 10000;
            this._credit = 1000;
            this._win = 0;
            this._totalWin = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
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
            // add win image to the scene
            this._winImage = new createjs.Bitmap(assets.getResult("Win"));
            this._winImage.x = 172;
            this._winImage.y = 97;
            this.addChild(this._winImage);
            // add total image to the scene
            this._totalWinImage = new createjs.Bitmap(assets.getResult("Total"));
            this._totalWinImage.x = 330;
            this._totalWinImage.y = 95;
            this.addChild(this._totalWinImage);
            // define win variable to prevent run time error
            this._win = 0;
            // add win label to the scene
            this._winLabel = new objects.Label("$" + this._win.toString(), "25px Impact", "#000000", 270, 110);
            this.addChild(this._winLabel);
            // define totalWin variable to prevent run time error
            this._totalWin = 0;
            // add totalWin label to the scene
            this._totalWinLabel = new objects.Label("$" + this._totalWin.toString(), "25px Impact", "#000000", 420, 110);
            this.addChild(this._totalWinLabel);
            // define jackpot variable to prevent run time error
            this._jackpot = 10000;
            // add jackpot label to the scene
            this._jackpotLabel = new objects.Label("$" + this._jackpot.toString(), "25px Impact", "#000000", config.Screen.CENTER_X, 13);
            this.addChild(this._jackpotLabel);
            // define bet variable to prevent run time error
            this._bet = 10;
            // add bet label to the scene
            this._betLabel = new objects.Label("$" + this._bet.toString(), "25px Impact", "#000000", 433, 305);
            this.addChild(this._betLabel);
            // define credit variable to prevent run time error
            this._credit = 1000;
            // add credit label to the scene
            this._creditLabel = new objects.Label("$" + this._credit.toString(), "25px Impact", "#000000", 290, 305);
            this.addChild(this._creditLabel);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
            // remove previous element to prevent over writing
            this.removeChild(this._jackpotLabel);
            this.removeChild(this._betLabel);
            this.removeChild(this._creditLabel);
            this.removeChild(this._winLabel);
            this.removeChild(this._totalWinLabel);
            // update win label
            this._winLabel = new objects.Label("$" + this._win.toString(), "25px Impact", "#000000", 270, 110);
            this.addChild(this._winLabel);
            // udpate totalWin label
            this._totalWinLabel = new objects.Label("$" + this._totalWin.toString(), "25px Impact", "#000000", 420, 110);
            this.addChild(this._totalWinLabel);
            // update jackpot label
            this._jackpotLabel = new objects.Label("$" + this._jackpot.toString(), "25px Impact", "#000000", config.Screen.CENTER_X, 13);
            this.addChild(this._jackpotLabel);
            // update bet label
            this._betLabel = new objects.Label("$" + this._bet.toString(), "25px Impact", "#000000", 433, 305);
            this.addChild(this._betLabel);
            // update credit label
            this._creditLabel = new objects.Label("$" + this._credit.toString(), "25px Impact", "#000000", 290, 305);
            this.addChild(this._creditLabel);
        };
        //PRIVATE METHODS
        // function to generate reels
        SlotMachine.prototype._createReel = function (image, position) {
            if (position == 0) {
                this._reel1 = new createjs.Bitmap(assets.getResult(image));
                this.addChild(this._reel1);
                this._reel1.x = 216;
                this._reel1.y = 220;
            }
            else if (position == 1) {
                this._reel2 = new createjs.Bitmap(assets.getResult(image));
                this.addChild(this._reel2);
                this._reel2.x = 300;
                this._reel2.y = 220;
            }
            else if (position == 2) {
                this._reel3 = new createjs.Bitmap(assets.getResult(image));
                this.addChild(this._reel3);
                this._reel3.x = 383;
                this._reel3.y = 220;
            }
        };
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            // Clear reels before displaying new reel object 
            this._createReel("Blank", 0);
            this._createReel("Blank", 1);
            this._createReel("Blank", 2);
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "blank";
                        this._blanks++;
                        this._createReel("Blank", spin);
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        this._createReel("Grape", spin);
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Banana";
                        this._bananas++;
                        this._createReel("Banana", spin);
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Orange";
                        this._oranges++;
                        this._createReel("Orange", spin);
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        this._createReel("Cherry", spin);
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Bar";
                        this._bars++;
                        this._createReel("Bar", spin);
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Bell";
                        this._bells++;
                        this._createReel("Bell", spin);
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Seven";
                        this._sevens++;
                        this._createReel("Seven", spin);
                        break;
                }
            }
            return betLine;
        };
        // function to reset fruit counts
        SlotMachine.prototype._resetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        // function to reset game
        SlotMachine.prototype._resetGame = function () {
            //Clear reels
            this._createReel("Blank", 0);
            this._createReel("Blank", 1);
            this._createReel("Blank", 2);
            // initialize default value to variables
            this._credit = 1000;
            this._jackpot = 10000;
            this._win = 0;
            this._bet = 10;
            this._totalWin = 0;
            this._resetFruitTally();
            this.update();
        };
        // function to calculate winning amount
        SlotMachine.prototype._calculateWinning = function () {
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
                this._totalWin += this._win;
                this._resetFruitTally();
                this.update();
            }
            else {
                this._jackpot += this._bet;
                this._credit -= this._bet;
                this._resetFruitTally();
                this.update();
            }
            console.log("User Credit:" + this._credit);
            console.log("Bet Amount:" + this._bet);
            console.log("Winning Amount:" + this._win);
            console.log("Total Winning:" + this._totalWin);
            console.log("Jackpot Amount:" + this._jackpot);
        };
        // determine eligibility of player
        SlotMachine.prototype._determineEligibility = function () {
            if (this._credit <= 0) {
                // show error message box
                this._ranOutMoney = new createjs.Bitmap(assets.getResult("RanOutMoney"));
                this.addChild(this._ranOutMoney);
                this._ranOutMoney.x = 166;
                this._ranOutMoney.y = 190;
                // add control buttons
                this._okButton = new objects.Button("Ok", 220, 243, false);
                this.addChild(this._okButton);
                this._okButton.on("click", this._okButtonClick, this); // ok button event listener
                this._cancelButton = new objects.Button("Cancel", 350, 243, false);
                this.addChild(this._cancelButton);
                this._cancelButton.on("click", this._cancelButtonClick, this); // cancel button event listener
                // disable spin and reset button
                this._resetButton.visible = false;
                this._spinButton.visible = false;
            }
            else if (this._bet > this._credit) {
                // show error message box
                this._notEnoughMoney = new createjs.Bitmap(assets.getResult("NotEnoughMoney"));
                this.addChild(this._notEnoughMoney);
                this._notEnoughMoney.x = 166;
                this._notEnoughMoney.y = 190;
                // add control button
                this._closeButton = new objects.Button("Close", 290, 245, false);
                this.addChild(this._closeButton);
                this._closeButton.on("click", this._closeButtonClick, this); // close button event listener
                // disable spin and reset button
                this._resetButton.visible = false;
                this._spinButton.visible = false;
            }
            else if (this._bet <= this._credit) {
                console.log(this._reels());
                this._calculateWinning();
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // RESET button event handler
        SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("Reset game");
            this.update();
            this._resetGame();
        };
        //QUIT button event handler
        SlotMachine.prototype._quitButtonClick = function (event) {
            // show message box
            this._quitMessage = new createjs.Bitmap(assets.getResult("QuitMessage"));
            this._quitMessage.x = 166;
            this._quitMessage.y = 190;
            this.addChild(this._quitMessage);
            // add controls
            this._yesButton = new objects.Button("Yes", 220, 235, false);
            this.addChild(this._yesButton);
            this._yesButton.on("click", this._yesButtonClick, this); // yes button event listener
            this._noButton = new objects.Button("No", 350, 235, false);
            this.addChild(this._noButton);
            this._noButton.on("click", this._noButtonClick, this); // no button event listener
            // disable spin and reset button
            this._resetButton.visible = false;
            this._spinButton.visible = false;
            // disable RanOutMoney message box
            this.removeChild(this._okButton);
            this.removeChild(this._cancelButton);
            this.removeChild(this._ranOutMoney);
            // disable NotEnoughMoney message box
            this.removeChild(this._closeButton);
            this.removeChild(this._notEnoughMoney);
        };
        // BET1BUTTON button event handler
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            console.log("Bet 1 Credit");
            this.update();
            this._bet = 1;
        };
        // BET10BUTTON button event handler
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
            this.update();
            this._bet = 10;
        };
        // BET100BUTTON button event handler
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
            this.update();
            this._bet = 100;
        };
        //SPIN button event handler
        SlotMachine.prototype._spinButtonClick = function (event) {
            console.log("Spin those reels!");
            this.update();
            this._determineEligibility();
        };
        // OK button event handler (RanOutMoney dialog)
        SlotMachine.prototype._okButtonClick = function (event) {
            console.log("OK button clicked");
            // reset game
            this._resetGame();
            // enable spin and reset buttons
            this._resetButton.visible = true;
            this._spinButton.visible = true;
            // disable message box
            this.removeChild(this._okButton);
            this.removeChild(this._cancelButton);
            this.removeChild(this._ranOutMoney);
        };
        // CANCEL button event handler (RanOutMoney dialog)
        SlotMachine.prototype._cancelButtonClick = function (event) {
            console.log("CANCEL button clicked");
            // enable spin and reset button
            this._resetButton.visible = true;
            this._spinButton.visible = true;
            // disable message box
            this.removeChild(this._okButton);
            this.removeChild(this._cancelButton);
            this.removeChild(this._ranOutMoney);
        };
        //CLOSE button event handler (NotEnoughMoney dialog)
        SlotMachine.prototype._closeButtonClick = function (event) {
            console.log("CLOSE button clicked");
            // enable spin and reset button
            this._resetButton.visible = true;
            this._spinButton.visible = true;
            // disable message box
            this.removeChild(this._closeButton);
            this.removeChild(this._notEnoughMoney);
        };
        //YES button event handler (QUIT dialog)
        SlotMachine.prototype._yesButtonClick = function (event) {
            console.log("YES button clicked");
            //switch to GAMEOVER scene
            scene = config.Scene.GAME_OVER;
            changeScene();
            console.log("start Game over scene");
        };
        // NO button event handler (QUIT dialog)
        SlotMachine.prototype._noButtonClick = function (event) {
            console.log("NO button clicked");
            // enable spin and reset button
            this._resetButton.visible = true;
            this._spinButton.visible = true;
            // disable messagebox
            this.removeChild(this._yesButton);
            this.removeChild(this._noButton);
            this.removeChild(this._quitMessage);
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map