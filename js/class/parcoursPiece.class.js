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
            for(var i = 0; i<this.pieces.length; i++){
                this.pieces[i].sprite.velocity.x += 2
                this.pieces[i].sprite.velocity.x = Math.min(10, this.pieces[i].sprite.velocity.x);
            }   
        }else{
            for(var i = 0; i<this.pieces.length; i++){
                this.pieces[i].sprite.velocity.x -= 2
                this.pieces[i].sprite.velocity.x = Math.max(-10, this.pieces[i].sprite.velocity.x);
            }
        }

        // this.velocity = Math.max(-100, this.velocity);
        // this.velocity = Math.min(100, this.velocity);
    }

    updateVelocity(){
        for(var i = 0; i<this.pieces.length; i++)
		    this.pieces[i].sprite.velocity.x *= 0.95
    }

    /**
     * Cette méthode permet de tester si le personnage est en collision avec un objet du parcours
     */
    collision(score,personnage){
        for(var i = 0; i<this.pieces.length; i++){
            if (personnage.collide(this.pieces[i].sprite)) {
                this.pieces[i].sprite.position.y = -30;
                derniere_col = new Date();
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