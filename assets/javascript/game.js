$(document).ready(function() {
    //game object
    var game = {
        characters: [
            {
                displayName: "Killmonger",
                name: "Killmonger",
                HP: 120,
                AP: 8,
                cAP: 10,
                image:"assets/images/imgKillmonger2.jpg",
            },
            {
                displayName: "Shuri",
                name: "Shuri",
                HP: 100,
                AP: 15,
                cAP: 20,
                image:"assets/images/imgShuri.jpg",
            },
            {
                displayName: "T'Challa",
                name: "TChalla",
                HP: 110,
                AP: 12,
                cAP: 5,
                image:"assets/images/imgTChalla.jpg",
            },
            {
                displayName: "Nakia",
                name: "Nakia",
                HP: 180,
                AP: 10,
                cAP: 15,
                image:"assets/images/imgNakia.jpg",
            },
        ],
        currentAP: 0,
        enemies: [],
        selectedPlayer: {},
        selectedEnemy: {},
        selectCharacter: function(name, type) {
            var self = this;
            $.each(self.characters, function(index, person) {
                if (name === person.name)
                {
                    // Use Object.assign to make clone rather than pointer
                    self['selected' + type] = Object.assign({}, person); 
                    self.enemies.splice(game.enemies.indexOf(person.name), 1);
                    self.setMessage('empty');
                }
            });
        },
        showAll: function() {
            var self = this;
            $.each(self.characters, function(index, person) {
                var newImage = $(self.getImageHtml(person, 'all'));
                $('#allCharacters').append(newImage);
                self.enemies.push(person.name);
            });
            $('#step1').show();
            $('#step2').hide();
            $('#step3').hide();
        },
        getImageHtml: function(person, type) {
            var str = "";
            switch (type)
            {
                case "all":
                    str ="<div class = 'col-sm-3 photoThumb'>" +
                            "<button class='nameBanner' onclick=selectPlayer('" + person.name + "')>" + person.displayName + "</button>" +
                            "<img src='" + person.image + "' class = 'img-responsive photoID'>" +
                            "<h3>HP: " + person.HP + "</h3>" + 
                         "</div>";
                    break;
                case "enemy3":
                    str = "<div class = 'col-sm-4 photoThumb'>" +
                            "<button class='nameBanner' onclick=selectEnemy('" + person.name + "')>" + person.displayName + "</button>" +
                            "<img src='" + person.image + "' class = 'img-responsive photoID'>" +
                            "<h3>HP: " + person.HP + "</h3>" + 
                          "</div>";
                    break;
                case "enemy2":
                    str = "<div class = 'col-sm-2'></div>" + 
                          "<div class = 'col-sm-3 photoThumb'>" +
                            "<button class='nameBanner' onclick=selectEnemy('" + person.name + "')>" + person.displayName + "</button>" +
                            "<img src='" + person.image + "' class = 'img-responsive photoID'>" +
                            "<h3>HP: " + person.HP + "</h3>" + 
                          "</div>";
                    break;
                case "enemy1":
                    str = "<div class = 'col-sm-4'></div>" + 
                          "<div class = 'col-sm-4 photoThumb'>" +
                            "<button class='nameBanner' onclick=selectEnemy('" + person.name + "')>" + person.displayName + "</button>" +
                            "<img src='" + person.image + "' class = 'img-responsive photoID'>" +
                            "<h3>HP: " + person.HP + "</h3>" + 
                          "</div>" + 
                          "<div class = 'col-sm-4'></div>";
                    break;
                case "fighter":
                    var id = (person.name === this.selectedPlayer.name)? 'playerHP' : 'enemyHP';
                    str = "<div class = 'col-sm-4 photoThumb'>" +
                            "<h3 class='nameBanner'>" + person.displayName + "</h3>" +
                            "<img src='" + person.image + "' class = 'img-responsive photoID'>" +
                            "<h3 id='"+ id +"'>HP: " + person.HP + "</h3>" + 
                          "</div>";
                    break;
                case "attack":
                    str = "<div class = 'col-sm-4 photoThumb aBtnCol'>" +
                            "<button class='btnAttack' onclick=attack()>ATTACK</button>" + 
                          "</div>";
                    break;
                case "header":
                    str = "<h3 class='nameBanner'>" + person.displayName + "</h3>"+
                          "<img src='" + person.image + "' class = 'img-responsive photoID'>";
                    break;
            }
            return str;
        },
        showPlayerInHeader: function() {
            var imageThumb = $(this.getImageHtml(this.selectedPlayer, 'header'));
            $('#logoYou').append(imageThumb);
        },
        showEnemies: function() {
            var self = this;
            $('#activeEnemies').empty();
            $.each(self.characters, function(index, person) {
                if (self.enemies.indexOf(person.name) > -1)
                {
                    var newImage = $(self.getImageHtml(person, 'enemy' + self.enemies.length));
                    $('#activeEnemies').append(newImage);
                }
            });
            $('#step1').hide();
            $('#step2').show();
            $('#step3').hide();
        }, 
        setMessage: function(msg) {
            var html;
            $('#msg').empty();
            switch(msg)
            {
                case "attackSummary":
                    html = $("<h2>You attacked " + this.selectedEnemy.displayName + " for  <span> " + 
                            this.currentAP + "</span>  damage, and " + this.selectedEnemy.displayName + 
                            " attacked you for  <span>" + this.selectedEnemy.cAP + "</span>.</h2>");
                    break;
                case "empty":                    
                    return;
                    break;
                case "playerHP":
                    html = $("<h2>Congratulations, you defeated " + this.selectedEnemy.displayName + "!</h2>" +
                             "<h2>You currently have <span> " + this.selectedPlayer.HP + " </span> " + 
                             " health points. Select another enemy to fight! </h2>");
                    break;
                case "restart":
                    html = $("<h2>Refresh the page if you change your mind and want to play again.</h2>");
            }
                
            $('#msg').append(html);
        },       
        attack: function() {
            //clear message
            this.setMessage('empty');

            //Determine if more moves can be made
            if (this.selectedPlayer.HP > 0 && this.selectedEnemy.HP > 0)
            {
                //Set currentAP if first attack
                if (this.currentAP === 0) this.currentAP = this.selectedPlayer.AP;

                //Lower Enemy HP 
                this.selectedEnemy.HP -= this.currentAP;

                //Lower Player HP
                this.selectedPlayer.HP -= this.selectedEnemy.cAP;

                //Increase Player AP
                this.currentAP += this.selectedPlayer.AP;

                //Update screen with new HP values
                $('#playerHP').text('HP: ' + this.selectedPlayer.HP);
                $('#enemyHP').text('HP: ' + this.selectedEnemy.HP);

                //give summary of last attack
                this.setMessage('attackSummary');
            }        

            //Check HP of each to see if the round is over
            if (this.selectedPlayer.HP <= 0)
            {
                this.setModalClass('#modalPanel',false)
                this.gameOver(false)
            }

            if(this.selectedEnemy.HP <= 0)
            {
                if(this.enemies.length > 0)
                {
                    this.nextEnemy();
                }
                else
                {
                    this.setModalClass('#modalPanel',true);
                    this.gameOver(true);                              
                }
            }
        },
        setModalClass: function(element, win) {
            var add = (win)?'panel-success':'panel-danger';
            var rmv = (win)?'panel-danger':'panel-success';
            $(element).removeClass(rmv).addClass(add);
        },
        gameOver: function(win) {
            if (win)
            {
                $('#modalTitle').text('Game Over');
                $('#modalMessage').html('<p>Congratulations You Won!</p>' +
                                        '<p>Would you like to play another game?</p>');
                //winSound.play();
                $('#gameOverModal').modal('show');          
            }
            else
            {
                $('#modalTitle').text('Game Over');
                $('#modalMessage').html('<p>Better luck next time!</p>' +
                                        '<p>Would you like to play another game?</p>');
                //loseSound.play();
                $('#gameOverModal').modal('show');
            }
        },
        nextEnemy: function() {
            //show player's HP
            this.setMessage('playerHP');

            //Show player image in header
            this.showPlayerInHeader();

            //Show enemies in Step2
            this.showEnemies();
        },
        exit: function() {
            $('#gameOverModal').modal('hide');
            $('#step1').hide();
            $('#step2').hide();
            $('#step3').hide();
            this.setMessage('restart');
        },
        newGame: function(){
            $('#gameOverModal').modal('hide');
            $('#allCharacters').empty();
            $('#activeEnemies').empty();
            $('#fightArea').empty();
            $('#logoYou').empty();
            this.setMessage('empty');
            this.selectedEnemy = {},
            this.currentAP = 0,
            this.enemies = [],
            this.selectedPlayer = {},
            this.selectedEnemy = {},            
            this.showAll();
        }
    }

    //Button Functions
    selectPlayer = function(pName) {
        //Set selected player
        game.selectCharacter(pName, 'Player');

        //Move selected to header
        game.showPlayerInHeader();
        
        //Show remaining Enemies
        game.showEnemies();

    }   
    selectEnemy = function(name) {
        //Clear fight area
        $('#fightArea').empty();

        //Set Selected Enemy
        game.selectCharacter(name, 'Enemy');

        //Set Player Image
        var pImage = $(game.getImageHtml(game.selectedPlayer,'fighter'));
        $('#fightArea').append(pImage);

        //Set Attack Button
        var btnAttack = $(game.getImageHtml(game.selectedPlayer,'attack'));
        $('#fightArea').append(btnAttack);

        //Set Enemy Image
        var eImage = $(game.getImageHtml(game.selectedEnemy,'fighter'));
        $('#fightArea').append(eImage);

        //Hide Header Picture
        $('#logoYou').empty();

        //Show Only Step3
        $('#step1').hide();
        $('#step2').hide();
        $('#step3').show();
    }
    attack = function(){
        game.attack();
    }
    $('#play').on('click',function(){game.newGame();});
    $('#exit').on('click',function(){game.exit();});

    //begin a new game 
    game.newGame();
});
