$(document).ready(function() {
    var game = {
        characters: [
            {
                displayName: "Killmonger",
                name: "Killmonger",
                HP: 154,
                AP: 5,
                cAP: 20,
                image:"assets/images/imgKillmonger2.jpg",
            },
            {
                displayName: "Shuri",
                name: "Shuri",
                HP: 154,
                AP: 5,
                cAP: 20,
                image:"assets/images/imgShuri.jpg",
            },
            {
                displayName: "T'Challa",
                name: "TChalla",
                HP: 154,
                AP: 5,
                cAP: 20,
                image:"assets/images/imgTChalla.jpg",
            },
            {
                displayName: "Nakia",
                name: "Nakia",
                HP: 154,
                AP: 5,
                cAP: 20,
                image:"assets/images/imgNakia.jpg",
            },
        ],
        enemies: [],
        selectedPlayer: {},
        selectEnemy: {},
        selectCharacter: function(name, type) {
            var self = this;
            $.each(self.characters, function(index, person) {
                if (name === person.name)
                {
                    self['selected' + type] = person;
                    self.enemies.splice(game.enemies.indexOf(person.name),1);
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
                    str = "<div class = 'col-sm-2'></div>" + 
                          "<div class = 'col-sm-3 photoThumb'>" +
                            "<button class='nameBanner' onclick=selectEnemy('" + person.name + "')>" + person.displayName + "</button>" +
                            "<img src='" + person.image + "' class = 'img-responsive photoID'>" +
                            "<h3>HP: " + person.HP + "</h3>" + 
                          "</div>";

                break;
                case "fighter":
                    var id = (person.name === this.selectedPlayer.name)? 'playerHP' : 'enemyHP';
                    str = "<div class = 'col-sm-4 photoThumb'>" +
                            "<h3 class='nameBanner'>" + person.name + "</h3>" +
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
        showEnemies: function() {
            var self = this;
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
        attack: function() {},
        counter: function() {}
    }

    selectPlayer = function(pName) {
        //Set selected player
        game.selectCharacter(pName, 'Player');

        //Move selected to header
        var newImage = $(game.getImageHtml(game.selectedPlayer, 'header'));
        $('#logoYou').append(newImage);
        
        //Show remaining Enemies
        game.showEnemies();

    }   

    selectEnemy = function(name) {
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

    game.showAll();
});
