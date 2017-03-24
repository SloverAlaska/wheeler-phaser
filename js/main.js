console.log(Phaser);

var spaceKey;

var ground;
var player;
var obstacle;
var music;

var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

function preload(){
	game.load.image('background', 'assets/city-wallpaper-32.jpg');
	game.load.image('player', 'assets/play2.png');
	game.load.image('ground', 'assets/ground.png');
	game.load.image('obstacle', 'assets/guy fieri.png');
	game.load.audio('backgroundMusic', 'assets/Cotton Eyed Joe Song.mp3')
	};

function create(){
	//Physics + Spacekey + Background
	game.physics.startSystem(Phaser.Physics.ARCADE);
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'background');

	//Player
	player = game.add.sprite(game.width/8, game.world.height*(5/8), 'player');
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 600;

	//Obstacle
	obstacle = game.add.sprite(700,game.world.height, 'obstacle');
	obstacle.scale.setTo(1,1);
	obstacle.anchor.setTo(0,1);
	game.physics.arcade.enable(obstacle);
	obstacle.body.immovable = true;

	//Platform
	platforms = game.add.group();
	platforms.enableBody = true;

	//Ground
	ground = platforms.create(0, GAME_HEIGHT,'ground');
	ground.anchor.setTo(0,1);
	ground.scale.setTo(4,1);
	game.physics.arcade.enable(ground);
	ground.body.immovable = true;

	music = game.add.audio('backgroundMusic');
	music.play();

	//Scoreboard
	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

};

function update(){

	//Game Physics(Collide)
	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(player, obstacle);

	//SpaceKey + Jump
	if (spaceKey.isDown) {
		player.body.velocity.y = -300;
	}

	if (obstacle.x > 600) {
		obstacle.x -= 0.05;
	};

	//Creates New Obstacle
	if (obstacle.x < 0) {
		obstacle.kill();
		obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
		obstacle.scale.setTo(1,1);
		obstacle.anchor.setTo(0,1);
		game.physics.arcade.enable(obstacle);
		obstacle.body.immovable = true;
	};
	//Updates Score
	if (obstacle.x < 5 && player.x > 5){
   	 	score++;
    	scoreText.text = 'score: ' + score;
	};

	//"You Lose!"
	if (player.x < 0){
		scoreText = game.add.text(50,200, 'Guy Fieri has Caught You! (game by griffin the allmighty)', {fill: '#FFFFFF'});
		obstacle.kill();
		player.kill();
	};

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();