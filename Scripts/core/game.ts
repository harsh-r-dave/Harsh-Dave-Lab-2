/// <reference path = "_reference.ts" />

// global variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;

var currentScene: objects.Scene;
var scene: number;

// Game Scenes
var menu: scenes.Menu;
var slotMachine: scenes.SlotMachine;
var gameOver: scenes.GameOver;

var assetData:objects.Asset[] = [
    {id: "WelCome", src:"../../Assets/images/WelCome.png"},                 //MENU scene-Welcome
    {id: "PlayGameButton", src:"../../Assets/images/PlayGame.png"},         //MENU scene-PlayGameButton
    {id: "Quit", src:"../../Assets/images/Quit.png"},                       //SLOT_MACHINE scene-QuitButton
    {id: "Reset", src:"../../Assets/images/Reset.png"},                     //SLOT_MACHINE scene-ResetButton
    {id: "SlotMachine", src:"../../Assets/images/SlotMachine.png"},         //SLOT_MACHINE scene-SlotMachine
    {id: "Bet1Button", src:"../../Assets/images/Bet1Button.png"},           //SLOT_MACHINE scene-Bet1Button
    {id: "Bet10Button", src:"../../Assets/images/Bet10Button.png"},         //SLOT_MACHINE scene-Bet10Button
    {id: "Bet100Button", src:"../../Assets/images/Bet100Button.png"},       //SLOT_MACHINE scene-Bet100Button
    {id: "SpinButton", src:"../../Assets/images/SpinButton.png"},           //SLOT_MACHINE scene-SpinButton
    {id: "Blank", src:"../../Assets/images/blank.png"},                     //SLOT_MACHINE scene-Blank
    {id: "Banana", src:"../../Assets/images/banana.png"},                   //SLOT_MACHINE scene-Banana
    {id: "Bar", src:"../../Assets/images/bar.png"},                         //SLOT_MACHINE scene-Bar
    {id: "Bell", src:"../../Assets/images/bell.png"},                       //SLOT_MACHINE scene-Bell
    {id: "Cherry", src:"../../Assets/images/cherry.png"},                   //SLOT_MACHINE scene-Cherry
    {id: "Grape", src:"../../Assets/images/grape.png"},                     //SLOT_MACHINE scene-Grape
    {id: "Orange", src:"../../Assets/images/orange.png"},                   //SLOT_MACHINE scene-Orange
    {id: "Seven", src:"../../Assets/images/seven.png"},                     //SLOT_MACHINE scene-Seven
    {id: "Ok", src:"../../Assets/images/Ok.png"},                           //SLOT_MACHINE scene-Ok
    {id: "Close", src:"../../Assets/images/Close.png"},                     //SLOT_MACHINE scene-Close
    {id: "Cancel", src:"../../Assets/images/Cancel.png"},                   //SLOT_MACHINE scene-Cancel
    {id: "RanOutMoney", src:"../../Assets/images/RanOutMoney.png"},         //SLOT_MACHINE scene-RanOutMoney
    {id: "NotEnoughMoney", src:"../../Assets/images/NotEnoughMoney.png"},   //SLOT_MACHINE scene-NotEnoughMoney
    {id: "QuitMessage", src:"../../Assets/images/QuitMessage.png"},         //SLOT_MACHINE scene-Quit
    {id: "Yes", src:"../../Assets/images/Yes.png"},                         //SLOT_MACHINE scene-Yes
    {id: "No", src:"../../Assets/images/No.png"},                           //SLOT_MACHINE scene-No
    {id: "ThankYou", src:"../../Assets/images/ThankYou.jpg"},               //GAME_OVER scene-ThankYou
    {id: "PlayAgainButton", src:"../../Assets/images/PlayAgain.png"},       //GAME_OVER scene-PlayAgainButton
    {id: "Home", src:"../../Assets/images/Home.png"},                       //GAME_OVER scene-HomeButton
    {id: "BlackBackground", src:"../../Assets/images/BlackBackground.png"}, //Fade effect
    {id: "WhiteBackground", src:"../../Assets/images/WhiteBackground.png"}  //fade effect
];

function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function init(): void {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    
    // create our main display list container
    stage = new createjs.Stage(canvas);
    
    // Enable mouse events
    stage.enableMouseOver(20);
    
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    
    // sets up our stats counting workflow
    setupStats(); 
    
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}

// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event: createjs.Event): void {
    // start collecting stats for this frame
    stats.begin(); 
    
    // calling State's update method
    currentScene.update(); 
    
    // redraw/refresh stage every frame
    stage.update();
    
    // stop collecting stats for this frame
    stats.end();
}

// Setup Game Stats
function setupStats(): void {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}

// Finite State Machine used to change Scenes
function changeScene(): void {
    
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.SLOT_MACHINE:
            // show the SLOT MACHINE scene
            stage.removeAllChildren();
            slotMachine = new scenes.SlotMachine();
            currentScene = slotMachine;
            console.log("Starting SLOT_MACHINE Scene");
            break;
        case config.Scene.GAME_OVER:
            // show the GAME OVER scene
            stage.removeAllChildren();
            gameOver = new scenes.GameOver();
            currentScene = gameOver;
            console.log("Starting GAME_OVER Scene");
            break;
    }

    console.log(currentScene.numChildren);
}