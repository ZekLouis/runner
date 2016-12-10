/**
 * Cette classe permet d'instancier un parcours contenant des plateformes
 */
class ParcoursPiece{

    /**
     * Constructeur de la classe ParcoursPlatform
     */
    constructor(){
        this.pieces = [];
    }

    /**
     * Cette méthode permet d'ajouter un obstacle au parcours
     */
    add(piece){
        this.pieces.push(piece);
    }

    /**
     * Cette méthode permet de déplacer tous les objets (de faire avancer le personnage)
     */
    move(c,int){
        if(c=='+'){
            for(var i = 0; i<this.pieces.length; i++)
		        this.pieces[i].sprite.position.x += 5
        }else{
            for(var i = 0; i<this.pieces.length; i++)
		        this.pieces[i].sprite.position.x -= 5
        }
    }

    /**
     * Cette méthode permet de tester si le personnage est en collision avec un objet du parcours
     */
    collision(score,personnage){
        for(var i = 0; i<this.pieces.length; i++){
            if (personnage.collide(this.pieces[i].sprite)) {
                this.pieces[i].sprite.position.y = -30;
                return score+10;
            }
	    }
        return score;
    }

    /**
     * Cette méthode permet de redéfinir la position de tous les objets
     */
    reset(){
        for(var i = 0; i<this.pieces.length; i++){
			this.pieces[i].resetPos();
		}
    }
}