// SLOT MACHINE SCENE
// GAME LOGIC (_reels & _calculateWinning) CREDIT: Tom Tsiliopoulos, Professor, Centennial College

module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _bet1Button: objects.Button;
        private _bet10Button: objects.Button;
        private _bet100Button: objects.Button;
        private _spinButton: objects.Button;
        private _resetButton: objects.Button;
        private _quitButton: objects.Button;
        private _betLabel: objects.Label;       //bet label
        private _jackpotLabel: objects.Label;   //jackpot label
        private _creditLabel: objects.Label;    //credit label
        private _winLabel: objects.Label;       //win label
        private _totalWinLabel: objects.Label;  //totalWin label
        private _reel1: createjs.Bitmap;
        private _reel2: createjs.Bitmap;
        private _reel3: createjs.Bitmap;
        private _notEnoughMoney: createjs.Bitmap;       // error message
        private _ranOutMoney: createjs.Bitmap;          // error message
        private _okButton: objects.Button;              // error message
        private _closeButton: objects.Button;           // error message
        private _cancelButton: objects.Button;          // error message
        private _quitMessage: createjs.Bitmap;          // exit confirmation
        private _yesButton: objects.Button;             // exit confirmation
        private _noButton: objects.Button;              // exit confirmation
        private _jackpotMessage: createjs.Bitmap;       // jackpot message
        private _jackpotCloseButton: objects.Button;    // jackpot close button
        private _jackpotPayLabel: objects.Label;        // jackpot pay label

        private _grapes = 0;
        private _bananas = 0;
        private _oranges = 0;
        private _cherries = 0;
        private _bars = 0;
        private _bells = 0;
        private _sevens = 0;
        private _blanks = 0;
        private _bet = 10;
        private _jackpot = 10000;
        private _credit = 1000;
        private _win = 0;
        private _totalWin = 0;
        private _jackpotTry = 0;
        private _jackpotWin = 0;
        private _jackpotPay = 0;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            // reset the game
            this._resetGame();
            
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
        
            //add ResetButton to the scene
            this._resetButton = new objects.Button("Reset", 109, 42, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
        
            //add QuitButton to the scene
            this._quitButton = new objects.Button("Quit", 420, 42, false);
            this.addChild(this._quitButton);
            this._quitButton.on("click", this._quitButtonClick, this);
            
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 434, 383, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this); 
            
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 534, 383, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this); 
            
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 434, 429, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this); 
            
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 534, 429, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this); 
            
            // add win label to the scene
            this._winLabel = new objects.Label(this._win.toString(), "25px Quantico", "#ff0000", 235, 413);
            this.addChild(this._winLabel);
            
            // add totalWin label to the scene
            this._totalWinLabel = new objects.Label(this._totalWin.toString(), "25px Quantico", "#ff0000", 347, 413);
            this.addChild(this._totalWinLabel);
          
            // add jackpot label to the scene
            this._jackpotLabel = new objects.Label(this._jackpot.toString(), "25px Quantico", "#ff0000", 281, 93);
            this.addChild(this._jackpotLabel);
            
            // add bet label to the scene
            this._betLabel = new objects.Label(this._bet.toString(), "25px Quantico", "#ff0000", 150, 413);
            this.addChild(this._betLabel);
            
            // add credit label to the scene
            this._creditLabel = new objects.Label(this._credit.toString(), "25px Quantico", "#ff0000", 52, 413);
            this.addChild(this._creditLabel);
            
            // Setup Background
            this._setupBackground("WhiteBackground");
           
            // FadeIn
            this._fadeIn(500);
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // SLOT_MACHINE Scene updates here
        public update(): void {
            // remove previous element to prevent over writing
            this.removeChild(this._jackpotLabel);
            this.removeChild(this._betLabel);
            this.removeChild(this._creditLabel);
            this.removeChild(this._winLabel);
            this.removeChild(this._totalWinLabel);
            
            // update win label
            this._winLabel = new objects.Label(this._win.toString(), "25px Quantico", "#ff0000", 235, 413);
            this.addChild(this._winLabel);
            
            // udpate totalWin label
            this._totalWinLabel = new objects.Label(this._totalWin.toString(), "25px Quantico", "#ff0000", 347, 413);
            this.addChild(this._totalWinLabel);
            
            // update jackpot label
            this._jackpotLabel = new objects.Label(this._jackpot.toString(), "25px Quantico", "#ff0000", 281, 93);
            this.addChild(this._jackpotLabel);
            
            // update bet label
            this._betLabel = new objects.Label(this._bet.toString(), "25px Quantico", "#ff0000", 150, 413);
            this.addChild(this._betLabel);
            
            // update credit label
            this._creditLabel = new objects.Label(this._credit.toString(), "25px Quantico", "#ff0000", 52, 413);
            this.addChild(this._creditLabel);
        }
        
        //PRIVATE METHODS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
        // display JACKPOT WIN dialog box
        private _displayJackpotWinMessage(): void {
            // create jackpot message window
            this._jackpotMessage = new createjs.Bitmap(assets.getResult("JackpotMessage"));
            this._jackpotMessage.x = 98;
            this._jackpotMessage.y = 144;
            this._jackpotMessage.alpha = 0.9;
            this.addChild(this._jackpotMessage);
            // create jackpot pay label
            this._jackpotPayLabel = new objects.Label(this._jackpotPay.toString(), "50px Quantico", "#000000", 270, 243);
            this.addChild(this._jackpotPayLabel);
            // create ok button to close message box
            this._jackpotCloseButton = new objects.Button("Close", 240, 290, false);
            this._jackpotCloseButton.alpha = 0.9;
            this.addChild(this._jackpotCloseButton);
            this._jackpotCloseButton.on("click", this._jackpotOkButtonClick, this);
                
            // disable spin and reset button
            this._resetButton.visible = false;
            this._spinButton.visible = false;
        }
        
        /* Check to see if the player won the jackpot */
        private _checkJackPot() {
            /* compare two random values */
            this._jackpotTry = Math.floor(Math.random() * 51 + 1);
            this._jackpotWin = Math.floor(Math.random() * 51 + 1);
            this._jackpotPay = 0;

            if (this._jackpotTry == this._jackpotWin) {
                this._jackpotPay = this._jackpot / 2;     // pay half amount of jackpot
       
                if (this._jackpotPay % 2 != 0)           // rounds up the number to integer
                {
                    this._jackpotPay = Math.floor(this._jackpotPay);
                    this._jackpot = Math.ceil(this._jackpot);
                }
                // call display JACKPOT WIN dialog box
                this._displayJackpotWinMessage();
                
                // update player credit and jackpot amount
                this._credit += this._jackpotPay;
                this._totalWin += this._jackpotPay;
                this._jackpot -= this._jackpotPay;
            }
        }

        // function to generate reels
        private _createReel(image: string, position: number): void {
            if (position == 0) {
                this._reel1 = new createjs.Bitmap(assets.getResult(image));
                this.addChild(this._reel1);
                this._reel1.x = 97;
                this._reel1.y = 194;
            }
            else if (position == 1) {
                this._reel2 = new createjs.Bitmap(assets.getResult(image));
                this.addChild(this._reel2);
                this._reel2.x = 229;
                this._reel2.y = 194;
            }
            else if (position == 2) {
                this._reel3 = new createjs.Bitmap(assets.getResult(image));
                this.addChild(this._reel3);
                this._reel3.x = 358;
                this._reel3.y = 194;
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
            // initialize default value to variables
            this._credit = 1000;
            this._jackpot = 10000;
            this._win = 0;
            this._bet = 10;
            this._totalWin = 0;
            this._resetFruitTally();
            this.update();
        }
        
        // function to calculate winning amount
        private _calculateWinning(): void {
            // deduct amount from player's credit
            this._win = 0;
            
            // calculate winning amount
            if (this._blanks == 0) {    // player wins something
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
                this._credit -= this._bet;
                this._credit += this._win;
                this._totalWin += this._win;
                this._resetFruitTally();
                this._checkJackPot();
                this.update();
            }
            else {  // player loses bet amount
                this._jackpotPay = 0;
                this._jackpot += this._bet;
                this._credit -= this._bet;
                this._resetFruitTally();
                this.update();
            }
            console.log("User Credit:\t" + this._credit);
            console.log("Bet Amount:\t\t" + this._bet);
            console.log("Winning Amount:\t" + this._win);
            console.log("Total Winning:\t" + this._totalWin);
            console.log("Jackpot Amount:\t" + this._jackpot);
            console.log("Jackpot Win:\t" + this._jackpotPay);
        }
        
        // generate RanOutOfMoney error message
        private _displayRanOutMoney(): void {
            // show error message box
            this._ranOutMoney = new createjs.Bitmap(assets.getResult("RanOutMoney"));
            this.addChild(this._ranOutMoney);
            this._ranOutMoney.x = 166;
            this._ranOutMoney.y = 190;
                
            // add control buttons
            this._okButton = new objects.Button("Ok", 220, 243, false);
            this.addChild(this._okButton);
            this._okButton.on("click", this._okButtonClick, this);      // ok button event listener
            this._cancelButton = new objects.Button("Cancel", 350, 243, false);
            this.addChild(this._cancelButton);
            this._cancelButton.on("click", this._cancelButtonClick, this);      // cancel button event listener
                
            // disable spin and reset button
            this._resetButton.visible = false;
            this._spinButton.visible = false;
        }
        
        // generate NotEnoughMoney error message
        private _displayNotEnoughMoney(): void {
            // show error message box
            this._notEnoughMoney = new createjs.Bitmap(assets.getResult("NotEnoughMoney"));
            this.addChild(this._notEnoughMoney);
            this._notEnoughMoney.x = 166;
            this._notEnoughMoney.y = 190;
                
            // add control button
            this._closeButton = new objects.Button("Close", 290, 245, false);
            this.addChild(this._closeButton);
            this._closeButton.on("click", this._closeButtonClick, this);        // close button event listener
                
            // disable spin and reset button
            this._resetButton.visible = false;
            this._spinButton.visible = false;
        }
        
        // determine eligibility of player
        private _determineEligibility(): void {
            if (this._credit <= 0) {    // code when player has 0 credit
                this._displayRanOutMoney();
            }
            else if (this._bet > this._credit) {    // code when player do not have enough money
                this._displayNotEnoughMoney();
            }
            else if (this._bet <= this._credit) {   //code when everything is good
                console.log(this._reels());
                this._calculateWinning();
            }
        }
        
        // display QUIT CONFIRMATION dialog box
        private _displayQuitDialogBox(): void {
            // show message box
            this._quitMessage = new createjs.Bitmap(assets.getResult("QuitMessage"));
            this._quitMessage.x = 166;
            this._quitMessage.y = 190;
            this.addChild(this._quitMessage);
            // add controls
            this._yesButton = new objects.Button("Yes", 220, 235, false);
            this.addChild(this._yesButton);
            this._yesButton.on("click", this._yesButtonClick, this);    // yes button event listener
            this._noButton = new objects.Button("No", 350, 235, false);
            this.addChild(this._noButton);
            this._noButton.on("click", this._noButtonClick, this);      // no button event listener
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
            // disable JackpotWin Message
            this.removeChild(this._jackpotMessage);
            this.removeChild(this._jackpotPayLabel);
            this.removeChild(this._jackpotCloseButton);
        }
                       
        //EVENT HANDLERS ++++++++++++++++++++
        // RESET button event handler
        private _resetButtonClick(event: createjs.MouseEvent): void {
            console.log("Reset game");
            this.update();
            this._resetGame();
        }
        
        //QUIT button event handler
        private _quitButtonClick(event: createjs.MouseEvent): void {
            this._displayQuitDialogBox();
        }
        
        // BET1BUTTON button event handler
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 1 Credit");
            this.update();
            this._bet = 1;
        }
        
        // BET10BUTTON button event handler
        private _bet10ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 10 Credit");
            this.update();
            this._bet = 10;
        }
        
        // BET100BUTTON button event handler
        private _bet100ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 100 Credit");
            this.update();
            this._bet = 100;
        }
        
        //SPIN button event handler
        private _spinButtonClick(event: createjs.MouseEvent): void {
            console.log("Spin those reels!");
            this.update();
            this._determineEligibility();
        }
        
        // OK button event handler (RanOutMoney dialog)
        private _okButtonClick(event: createjs.MouseEvent): void {
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
        }
        
        // CANCEL button event handler (RanOutMoney dialog)
        private _cancelButtonClick(event: createjs.MouseEvent): void {
            console.log("CANCEL button clicked");
            // enable spin and reset button
            this._resetButton.visible = true;
            this._spinButton.visible = true;
            // disable message box
            this.removeChild(this._okButton);
            this.removeChild(this._cancelButton);
            this.removeChild(this._ranOutMoney);
        }
        
        //CLOSE button event handler (NotEnoughMoney dialog)
        private _closeButtonClick(event: createjs.MouseEvent): void {
            console.log("CLOSE button clicked");
            // enable spin and reset button
            this._resetButton.visible = true;
            this._spinButton.visible = true;
            // disable message box
            this.removeChild(this._closeButton);
            this.removeChild(this._notEnoughMoney);
        }
        
        //YES button event handler (QUIT dialog)
        private _yesButtonClick(event: createjs.MouseEvent): void {
            console.log("YES button clicked");
            //FadeOut 
            this._fadeOut(500, () => {
                //switch to GAMEOVER scene
                scene = config.Scene.GAME_OVER;
                changeScene();
            });
            console.log("start Game over scene");
        }
        
        // NO button event handler (QUIT dialog)
        private _noButtonClick(event: createjs.MouseEvent): void {
            console.log("NO button clicked");
            // enable spin and reset button
            this._resetButton.visible = true;
            this._spinButton.visible = true;
            // disable messagebox
            this.removeChild(this._yesButton);
            this.removeChild(this._noButton);
            this.removeChild(this._quitMessage);
        }
        
        // OK button event handler (JACKPOT WIN dialog)
        private _jackpotOkButtonClick(event: createjs.MouseEvent): void {
            console.log("Jackpot Messaage OK button clicked");
            // enable spin and reset button
            this._resetButton.visible = true;
            this._spinButton.visible = true;
            // close messagebox
            this.removeChild(this._jackpotMessage);
            this.removeChild(this._jackpotPayLabel);
            this.removeChild(this._jackpotCloseButton);
        }
    }
}