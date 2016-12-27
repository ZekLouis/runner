/**
 * Cette classe permet d'instancier un parcours contenant des objets
 */
class Parcours{

    /**
     * Constructeur de la classe Parcours
     */
    constructor(){
        this.objets = [];
        this.pieces = [];
        this.platforms = [];
    }

    /**
     * Cette méthode permet d'ajouter un objet au parcours
     */
    add(objet){
        if(objet instanceof Piece)
            this.pieces.push(objet);
        else if(objet instanceof Platform)
            this.platforms.push(objet);
        else
            this.objets.push(objet);
    }

    /**
     * Cette méthode permet de tester si le personnage est en collision avec un objet du parcours
     */
    collision(score,personnage){
        for(var i = 0; i<this.pieces.length; i++){
            if (personnage.getSprite().collide(this.pieces[i].sprite)) {
                this.pieces[i].sprite.position.y = -5000;
                //derniere_col = new Date();
                return score+10;
            }
	    }
        if(game==true){
            for(var i = 0; i<this.objets.length; i++){
                if (personnage.getSprite().collide(this.objets[i].sprite) && this.objets[i] instanceof Objet) {
                    personnage.getSprite().visible = false;
                    alert('Perdu !');
                    // Si je suis en collision je le dit au serveur, j'ignore si un autre joueur est en collision
                    if(joueur.id==personnage.id){
                        socket.emit('death');
                    }
                    game = false;
                    return false;
                }
            }
        }
        for(var i = 0; i<this.platforms.length; i++){
            if (personnage.getSprite().collide(this.platforms[i].sprite)) {
                personnage.getSprite().velocity.y = 0
            }
	    }
        return score;
    }

    /**
     * Cette méthode permet de redéfinir la position de tous les objets
     */
    reset(){
        for(var i = 0; i<this.objets.length; i++){
			this.objets[i].resetPos();
		}
    }
}