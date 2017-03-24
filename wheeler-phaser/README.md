# music-jump
A music based jumping game made in Phaser

![](https://github.com/creindle/wheeler-phaser/blob/master/assets/gamescreen.png)

## Part 1 - Lets Display the Graphics!

![](https://github.com/sogalutira/wheeler-phaser/blob/master/assets/p1step1.png)

### Step 1 - Reference Executable Script

+ Use the HTML ```<script>``` element to reference the executable scripts in your **js** directory.

+ Use the global attributes **type** and **src**

#### Your code should look like this

**index.html**
```html
  <script type="text/javascript" src="js/phaser.min.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
```

***Commit your code!***

![](https://github.com/sogalutira/wheeler-phaser/blob/master/assets/p1step2.png)

### Step 2 - Sanity Check

In the **main.js** file, output the game object **Phaser** to the Web Console.

#### Your code should look like this

**main.js**

```html
console.log(Phaser);
```

**Console**

```html
Object {VERSION: "2.6.2", GAMES: Array[0], AUTO: 0, CANVAS: 1, WEBGL: 2…}
```

***Commit your code!***

### Step 3 - Set up Phaser Framework

+ You will be instantiating the Phaser.State functions (preload, create, update, and render) and set the game width, height, and element container id.in the **main.js** file

#### Your code should look like this

**main.js**

```html
//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){

},

function create(){

};

function update(){

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();
```

***Commit your code!***

![](https://github.com/sogalutira/wheeler-phaser/blob/master/assets/p1step3.png)

### Step 4 - Create Game Container
Create the **game container** in the index.html

#### Your code should look like this

**index.html**

```html
<div id="gameDiv"> </div>
```

This should appear in your console
```Phaser v2.6.2 | Pixi.js | WebGL | WebAudio     http://phaser.io ♥♥♥```

***Commit your code!***

![](https://github.com/sogalutira/wheeler-phaser/blob/master/assets/p1step4-5.png)

### Step 5 - Load the Images
Use the game load operation to load an image file:

**In the preload()**

The first parameter is a unique key and the second is a url path

```game.load.image('imageKey', 'assets/fileName.png');```

Then add the sprite image in the **create** function

```game.add.sprite(X_POS, Y_POS, 'imageKey');```

Use this to add the player sprite to the game.

Load these images:
+ player.png - Set the image key to 'player'
+ wallHorizontal.png - Set the image key to 'ground'
+ wallVertical.png - Set the image key to 'obstacle'

We need to also **anchor** these sprites to the screen. We will use the sprite method `anchor.setTo(X_POS, Y_POS)` for this.

Your player should now be facing a gigantic obstacle.

Lets configure the obstacle to not be so scary with the sprite method `scale.setTo(X_LENGTH, Y_LENGTH)`. The `X_LENGTH` and `Y_LENGTH` are from values 0, 1 with 1 being the original length.

##### Your code should look like this

**main.js**

```html
function preload(){

//These four things sets the assets for the game. If you want to add music or images, there is where you would preload it.
  game.load.image('background', 'assets/background.png');
  game.load.image('player', 'assets/player.png');
  game.load.image('ground', 'assets/wallHorizontal.png');
  game.load.image('obstacle', 'assets/wallVertical.png');

  //If you'd like to load music files, the format would look like  game.load.audio('[name of music]', ['[location for music file]']);
}

function create() {
  //This creates the player character at the bottom left side of the screen.
  player = game.add.sprite(game.width/8, game.world.height*(7/8), 'player');

  //This creates the first obstacle on the right side of the screen.
  obstacle = game.add.sprite(700,game.world.height, 'obstacle');
  obstacle.scale.setTo(1,1);
  obstacle.anchor.setTo(0,1);
}
```

Play around with these numbers to understand the positioning

Lets also set the game stage **background color** to `#3498db` so the player isn't in the dark.

Use  ```game.stage.backgroundColor ``` to set the background color.

***Commit your code!***

![](https://github.com/sogalutira/wheeler-phaser/blob/master/assets/p1step6.png)

### Step 6 - Create the Platform for the Player

Your player is floating! We need to create a ground for the player!

Within the **create** function, access the method `add.group()` within the game object and set it equal to `platforms`.

After, use the `create(X_POS, Y_POS, 'NAME_OF_ASSET')` method on add.group() and set this equal to `ground`.

You will need to anchor ground to the setting, how would you do this?

The ground look so short! So use a method to extend its length!

##### Your code should look like this
```html
//This sets up a group call platforms. For future functionality we can set all horizontal surfaces to this group.
platforms = game.add.group();
platforms.enableBody = true;

//This creates the ground, and makes it solid object the player will not pass through.
ground = platforms.create(0, GAME_HEIGHT, 'ground');
ground.anchor.setTo(0,1);
ground.scale.setTo(4, 1);
```

Your game now has a player, a stage, and an obstacle!

***Commit your code!***

## Part 2 - Lets Add Movement!

![](https://github.com/sogalutira/wheeler-phaser/blob/master/assets/p2step1.png)

### Step 1 - Set the Physics Engine
Set the game physics to Arcade style and enable this for the player, ground, and obstacle in the **create** function with:

```html
game.physics.startSystem(Phaser.Physics.ARCADE);
```

and

```html
game.physics.arcade.enable(sprite);
```

Also, you must ensure the obstacle and ground are immovable after enabling arcade mode on the body of each sprite as follows:

```sprite.body.immovable = true;```

The game engine recognizes collision between the player and the ground or the obstacle in the **update** function, as follows:

```game.physics.arcade.collide(sprite1, sprite2);```

##### Your code should look like this

**main.js**

```html
function create(){
  //This sets the game physics to Arcade style.
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);

  game.physics.arcade.enable(ground);
  ground.body.immovable = true;

  game.physics.arcade.enable(obstacle);
  obstacle.body.immovable = true;
}

function update(){
  //This is where the game engine recognizes collision betwen the player and the ground or the obstacle.
  game.physics.arcade.collide(player, ground);
  game.physics.arcade.collide(player, obstacle);
}
```

***Commit your code!***

![](https://github.com/sogalutira/wheeler-phaser/blob/master/assets/p2step2.png)

### Step 2 - Move the Player!

Set the value of `spaceKey` to register the key after the space bar has been pressed.

Also, set the physics on the player in terms of the gravity and the bounce in the **create** function.

And, in the **update** function, create an if statement to handle this and change the players y to -300.

##### Your code should look like this
```html
function create(){
  //This sets the spacebar key as the input for this game.
  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  //This sets the physics on the player in terms of the gravity and the bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 600;
}
```

```html
  function update(){
    //This allows the player to jump only if you press the space key
    if (spaceKey.isDown) {
      player.body.velocity.y = -300;
    }
  }
```

Your character is able to jump!

***Commit your code!***

![](https://github.com/sogalutira/wheeler-phaser/blob/master/assets/p2step3.png)

### Step 3 - Make the obstacle move!

In the **update** function, we will need to simply move the obstacle to the left if it is on the right side of the screen by decreasing its x position.

##### Your code should look like this
```html
//This creates a place to add sound when the obstacle reaches the player.
if (obstacle.x > 600) {
  obstacle.x -= 0.05;
};
```

Test this out! Don't forget to jump!

***Commit your code!***

![](https://github.com/sogalutira/wheeler-phaser/blob/master/assets/p2step4.png)

### Step 4 - Create a new wall if the old wall goes off the screen.

In the **update** function, we need to recreate the obstacle if it's off the screen!

##### Your code should look like this
```html
//This will create a new wall if the old wall goes off the screen.
if (obstacle.x < 0) {
  obstacle.kill();
  obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
  obstacle.scale.setTo(1,1);
  obstacle.anchor.setTo(0,1);
  game.physics.arcade.enable(obstacle);
  obstacle.body.immovable = true;
};
```

***Commit your code!***

![](https://github.com/sogalutira/wheeler-phaser/blob/master/assets/p2step5.png)

### Step 5 - Create a score!

Add a scoreboard on the top left side of the screen using the `game.add.text` method and update it whenever the player jumps over the obstacle!

##### Your code should look like this

**create**
```html
//This adds the scoreboard on the top left side of the screen.
scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
```

**update**
```html
//This will update the score if the player has not been pushed off the screen, and the wall has gone off the left side.
  if (obstacle.x < 5 && player.x > 5){
    score++;
    scoreText.text = 'score: ' + score;
  };
//This will tell you "You Lose!" if the player is pushed off the left side of the screen.
  if (player.x < 0){
    scoreText = game.add.text(350,200, 'You Lose!', {fill: '#ff0000'});
    obstacle.kill();
    player.kill();
  };
```

***Commit your code!***

### YOU'RE DONE!

Enjoy your game! Can you reach these stretch goals?

- Randomize obstacle size (Hint: modify the attribute scaleTo on obstacle)
- Add background music
- Change player sprite
- Change background color (can you add an image instead)?
- Create second obstacle attached to top of page
- Add sound when your player jumps? :)
