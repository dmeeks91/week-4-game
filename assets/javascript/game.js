$(document).ready(function() {
    var game = {
        characters: [
            {
                name: "Killmonger",
                HP: 154,
                AP: 5,
                cAP: 20,
                image:"assets/images/imgKillmonger2.jpg",
            },
            {
                name: "Shuri",
                HP: 154,
                AP: 5,
                cAP: 20,
                image:"assets/images/imgShuri.jpg",
            },
            {
                name: "T'Challa",
                HP: 154,
                AP: 5,
                cAP: 20,
                image:"assets/images/imgTChalla.jpg",
            },
            {
                name: "Nakia",
                HP: 154,
                AP: 5,
                cAP: 20,
                image:"assets/images/imgNakia.jpg",
            },
        ],
        selectedPlayer: "",
        selectEnemy: function() {},
        attack: function() {},
        counter: function() {},
        hideSection: function(id){
            $('#'+id).hide();
        }
    }

    selectPlayer = function(pName) {
        $.each(game.characters, function(index, person) {
            if (pName === person.name)
            {
                game.selectedPlayer = person;
            }
        });
        /*  img src="assets/images/imgKillmonger2.jpg" class = 'img-responsive photoID'>*/
    }
    getImageHtml = function(person, type) {
        switch (type)
        {
            case "main"
        }
        var str = 
    }

    $.each(game.characters, function(index, person) {
        var newImage = $("<div class = 'col-sm-3 photoThumb'>" +
                            /* "<h3 class='nameBanner'>" + person.name + "</h3>" +  */
                            "<button class='nameBanner' onclick=selectPlayer('" + person.name + "')>" + person.name + "</button>" +
                            "<img src='" + person.image + "' class = 'img-responsive photoID'>" +
                            "<h3>HP: " + person.HP + "</h3>" + 
                         "</div>"
                        );
        $('#picRow').append(newImage);
    });
});
