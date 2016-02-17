var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// GAME_OVER SCENE
var scenes;
(function (scenes) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function GameOver() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        GameOver.prototype.start = function () {
            //add THANKYOU image to the scene
            this._ThankImage = new createjs.Bitmap(assets.getResult("ThankYou"));
            this.addChild(this._ThankImage);
            // add the PLAYAGAIN button to the scene
            this._playAgainButton = new objects.Button("PlayAgainButton", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 180, true);
            this.addChild(this._playAgainButton);
            // PLAYAGAIN Button event listener
            this._playAgainButton.on("click", this._playAgainButtonClick, this);
            // add the HOME button to the scene
            this._homeButton = new objects.Button("Home", config.Screen.CENTER_X + 100, config.Screen.CENTER_Y + 180, true);
            this.addChild(this._homeButton);
            // Home Button event listener
            this._homeButton.on("click", this._homeButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // GAME OVER Scene updates here
        GameOver.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // PLAYAGAIN Button click event handler
        GameOver.prototype._playAgainButtonClick = function (event) {
            // Switch to the SLOT_MACHINE Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        };
        // HOME Button click event handler
        GameOver.prototype._homeButtonClick = function (event) {
            //swich to the MENU scene
            scene = config.Scene.MENU;
            changeScene();
        };
        return GameOver;
    })(objects.Scene);
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map