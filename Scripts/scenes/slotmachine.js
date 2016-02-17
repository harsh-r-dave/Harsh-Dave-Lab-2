var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
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
            this._bet = 1;
            this._jackpot = 10140;
            this._credit = 150;
            this._displayImage = [0, 0, 0];
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
            // add jackpot label to the scene
            this._jackpotLabel = new objects.Label(153456, "25px Consolas", "#000000", config.Screen.CENTER_X, 11);
            this.addChild(this._jackpotLabel);
            // add bet label to the scene
            this._betLabel = new objects.Label(100, "25px Consolas", "#000000", 433, 303);
            this.addChild(this._betLabel);
            // add credit label to the scene
            this._creditLabel = new objects.Label(1000, "25px Consolas", "#000000", 290, 303);
            this.addChild(this._creditLabel);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            // Clear the reel before displaying new reel object
            this._reel1 = new createjs.Bitmap(assets.getResult("Blank"));
            this.addChild(this._reel1);
            this._reel1.x = 216;
            this._reel1.y = 220;
            this._reel2 = new createjs.Bitmap(assets.getResult("Blank"));
            this.addChild(this._reel2);
            this._reel2.x = 300;
            this._reel2.y = 220;
            this._reel3 = new createjs.Bitmap(assets.getResult("Blank"));
            this.addChild(this._reel3);
            this._reel3.x = 383;
            this._reel3.y = 220;
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                console.log(outCome);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "blank";
                        this._blanks++;
                        if (spin == 0) {
                            this._reel1 = new createjs.Bitmap(assets.getResult("Blank"));
                            this.addChild(this._reel1);
                            this._reel1.x = 216;
                            this._reel1.y = 220;
                        }
                        else if (spin == 1) {
                            this._reel2 = new createjs.Bitmap(assets.getResult("Blank"));
                            this.addChild(this._reel2);
                            this._reel2.x = 300;
                            this._reel2.y = 220;
                        }
                        else {
                            this._reel3 = new createjs.Bitmap(assets.getResult("Blank"));
                            this.addChild(this._reel3);
                            this._reel3.x = 383;
                            this._reel3.y = 220;
                        }
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        if (spin == 0) {
                            this._reel1 = new createjs.Bitmap(assets.getResult("Grape"));
                            this.addChild(this._reel1);
                            this._reel1.x = 216;
                            this._reel1.y = 220;
                        }
                        else if (spin == 1) {
                            this._reel2 = new createjs.Bitmap(assets.getResult("Grape"));
                            this.addChild(this._reel2);
                            this._reel2.x = 300;
                            this._reel2.y = 220;
                        }
                        else {
                            this._reel3 = new createjs.Bitmap(assets.getResult("Grape"));
                            this.addChild(this._reel3);
                            this._reel3.x = 383;
                            this._reel3.y = 220;
                        }
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Banana";
                        this._bananas++;
                        if (spin == 0) {
                            this._reel1 = new createjs.Bitmap(assets.getResult("Banana"));
                            this.addChild(this._reel1);
                            this._reel1.x = 216;
                            this._reel1.y = 220;
                        }
                        else if (spin == 1) {
                            this._reel2 = new createjs.Bitmap(assets.getResult("Banana"));
                            this.addChild(this._reel2);
                            this._reel2.x = 300;
                            this._reel2.y = 220;
                        }
                        else {
                            this._reel3 = new createjs.Bitmap(assets.getResult("Banana"));
                            this.addChild(this._reel3);
                            this._reel3.x = 383;
                            this._reel3.y = 220;
                        }
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Orange";
                        this._oranges++;
                        if (spin == 0) {
                            this._reel1 = new createjs.Bitmap(assets.getResult("Orange"));
                            this.addChild(this._reel1);
                            this._reel1.x = 216;
                            this._reel1.y = 220;
                        }
                        else if (spin == 1) {
                            this._reel2 = new createjs.Bitmap(assets.getResult("Orange"));
                            this.addChild(this._reel2);
                            this._reel2.x = 300;
                            this._reel2.y = 220;
                        }
                        else {
                            this._reel3 = new createjs.Bitmap(assets.getResult("Orange"));
                            this.addChild(this._reel3);
                            this._reel3.x = 383;
                            this._reel3.y = 220;
                        }
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        if (spin == 0) {
                            this._reel1 = new createjs.Bitmap(assets.getResult("Cherry"));
                            this.addChild(this._reel1);
                            this._reel1.x = 216;
                            this._reel1.y = 220;
                        }
                        else if (spin == 1) {
                            this._reel2 = new createjs.Bitmap(assets.getResult("Cherry"));
                            this.addChild(this._reel2);
                            this._reel2.x = 300;
                            this._reel2.y = 220;
                        }
                        else {
                            this._reel3 = new createjs.Bitmap(assets.getResult("Cherry"));
                            this.addChild(this._reel3);
                            this._reel3.x = 383;
                            this._reel3.y = 220;
                        }
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Bar";
                        this._bars++;
                        if (spin == 0) {
                            this._reel1 = new createjs.Bitmap(assets.getResult("Bar"));
                            this.addChild(this._reel1);
                            this._reel1.x = 216;
                            this._reel1.y = 220;
                        }
                        else if (spin == 1) {
                            this._reel2 = new createjs.Bitmap(assets.getResult("Bar"));
                            this.addChild(this._reel2);
                            this._reel2.x = 300;
                            this._reel2.y = 220;
                        }
                        else {
                            this._reel3 = new createjs.Bitmap(assets.getResult("Bar"));
                            this.addChild(this._reel3);
                            this._reel3.x = 383;
                            this._reel3.y = 220;
                        }
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Bell";
                        this._bells++;
                        if (spin == 0) {
                            this._reel1 = new createjs.Bitmap(assets.getResult("Bell"));
                            this.addChild(this._reel1);
                            this._reel1.x = 216;
                            this._reel1.y = 220;
                        }
                        else if (spin == 1) {
                            this._reel2 = new createjs.Bitmap(assets.getResult("Bell"));
                            this.addChild(this._reel2);
                            this._reel2.x = 300;
                            this._reel2.y = 220;
                        }
                        else {
                            this._reel3 = new createjs.Bitmap(assets.getResult("Bell"));
                            this.addChild(this._reel3);
                            this._reel3.x = 383;
                            this._reel3.y = 220;
                        }
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Seven";
                        this._sevens++;
                        if (spin == 0) {
                            this._reel1 = new createjs.Bitmap(assets.getResult("Seven"));
                            this.addChild(this._reel1);
                            this._reel1.x = 216;
                            this._reel1.y = 220;
                        }
                        else if (spin == 1) {
                            this._reel2 = new createjs.Bitmap(assets.getResult("Seven"));
                            this.addChild(this._reel2);
                            this._reel2.x = 300;
                            this._reel2.y = 220;
                        }
                        else {
                            this._reel3 = new createjs.Bitmap(assets.getResult("Seven"));
                            this.addChild(this._reel3);
                            this._reel3.x = 383;
                            this._reel3.y = 220;
                        }
                        break;
                }
            }
            return betLine;
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("Reset game");
        };
        SlotMachine.prototype._quitButtonClick = function (event) {
            //switch to GAMEOVER scene
            scene = config.Scene.GAME_OVER;
            changeScene();
            console.log("start Game over scene");
        };
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            console.log("Bet 1 Credit");
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            console.log("Spin those reels!");
            console.log(this._reels());
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map