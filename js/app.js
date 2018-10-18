// Enemies our player must avoid
var Enemy = function(character) {
    this.sprite = character;
    this.x = -100;
    this.y = 68 + (Math.floor(Math.random() * 3))*83; 
    this.speed = 100 + (Math.floor(Math.random() * 5))*20
    allEnemies.push(this);
};

var Person = function(character) {
    this.sprite = character;
    this.blood = 'images/blood-splatter.png';
    this.splatter = false;
    this.x = 200;
    this.y = 400;
};

Person.prototype.update = function() {
    (this.x < -2) ? this.x = -2: this.x = this.x ;
    (this.x > 403) ? this.x = 402: this.x = this.x;
    (this.y > 400) ? this.y = 400: this.y = this.y;
    (this.y < -12) ? this.y = 400: this.y = this.y;
 };
Person.prototype.handleInput = function(allowedKeys) {
    switch(allowedKeys){
        case 'left':
            this.x = this.x - 101;
        break;
        case 'up':
            this.y = this.y - 83;
        break;
        case 'right':
            this.x = this.x + 101;
        break;
        case 'down':
            this.y = this.y + 83;
        break;
    }
};
Person.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Person.prototype.dead = function() {
   if(player.splatter === true) {
       ctx.drawImage(Resources.get(this.blood),player.splatx,player.splaty,100,100);
   };
};


Enemy.prototype.update = function(dt) {
    //modify location of bug
    this.x = this.x + (this.speed * dt);

    this.collisionTest();// Collision test

    if (this.x > 510){
        delete allEnemies[allEnemies.indexOf(this)];
        new Enemy('images/enemy-bug.png');
    };
};
Enemy.prototype.collisionTest = function() {
    this.nose = this.x + 95;
    if (this.y == player.y) {
        if (this.nose >= (player.x + 17) && this.nose <= (player.x + 85 +95)){
            player.splatx = player.x;
            player.splaty = player.y + 60;
            player.x = 200;
            player.y = 400;
            player.splatter = true; 
            setTimeout(function(){player.splatter = false},1500);           
        };
    };
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
var allEnemies = [];
for (var i = 1; i < 5; i++) {
    new Enemy('images/enemy-bug.png');
};
var player = new Person('images/char-horn-girl.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
