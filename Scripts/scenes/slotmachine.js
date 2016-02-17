var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// SLOT MACHINE SCENE
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
        //function to generate reels
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
                console.log(outCome);
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
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("Reset game");
            //Clear reels
            this._createReel("Blank", 0);
            this._createReel("Blank", 1);
            this._createReel("Blank", 2);
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