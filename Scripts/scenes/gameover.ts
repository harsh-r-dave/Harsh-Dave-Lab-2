// GAME_OVER SCENE
module scenes {
    export class GameOver extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _playAgainButton: objects.Button;
        private _homeButton: objects.Button;
        private _ThankImage: createjs.Bitmap;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            //add THANKYOU image to the scene
            this._ThankImage = new createjs.Bitmap(assets.getResult("ThankYou"));
            this.addChild(this._ThankImage);
                   
            // add the PLAYAGAIN button to the scene
            this._playAgainButton = new objects.Button(
                "PlayAgainButton",
                config.Screen.CENTER_X - 100,
                config.Screen.CENTER_Y + 180, true);
            this.addChild(this._playAgainButton);
            
            // PLAYAGAIN Button event listener
            this._playAgainButton.on("click", this._playAgainButtonClick, this);
           
            // add the HOME button to the scene
            this._homeButton = new objects.Button(
                "Home",
                config.Screen.CENTER_X + 100,
                config.Screen.CENTER_Y + 180, true);
            this.addChild(this._homeButton);
            
            // Home Button event listener
            this._homeButton.on("click", this._homeButtonClick, this);
            
            // Setup Background
            this._setupBackground("WhiteBackground");
           
            // FadeIn
            this._fadeIn(500);
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // GAME OVER Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // PLAYAGAIN Button click event handler
        private _playAgainButtonClick(event: createjs.MouseEvent) {
            //FadeOut 
            this._fadeOut(500, () => {
                // Switch to the SLOT_MACHINE Scene
                scene = config.Scene.SLOT_MACHINE;
                changeScene();
            });
        }
        
        // HOME Button click event handler
        private _homeButtonClick(event: createjs.MouseEvent) {
            //FadeOut 
            this._fadeOut(500, () => {
                //swich to the MENU scene
                scene = config.Scene.MENU;
                changeScene();
            });
        }

    }
}