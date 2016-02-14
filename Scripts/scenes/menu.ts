// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _PlayGameButton:objects.Button;
        private _welcomeImage: createjs.Bitmap;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {   
                     
            // add the welcome image to the MENU scene
            this._welcomeImage = new createjs.Bitmap(assets.getResult("WelCome"));
            this.addChild(this._welcomeImage);
                   
            // add the PLAYGAME button to the MENU scene
            this._PlayGameButton = new objects.Button(
                "PlayGameButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 180, true);
            this.addChild(this._PlayGameButton);
            
            // PLAYGAME Button event listener
            this._PlayGameButton.on("click", this._PlayGameButtonClick, this);
           
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // PLAYGAME Button click event handler
        private _PlayGameButtonClick(event: createjs.MouseEvent) {
            // Switch to the SLOT_MACHINE Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        } 
    }
}