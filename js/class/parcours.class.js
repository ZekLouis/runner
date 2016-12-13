/**
 * Cette classe permet d'instancier un parcours contenant des obstacles
 */
class Parcours{

    /**
     * Constructeur de la classe Parcours
     */
    constructor(){
        this.obstacles = [];
    }

    /**
     * Cette méthode permet d'ajouter un obstacle au parcours
     */
    add(obstacle){
        this.obstacles.push(obstacle);
    }

    /**
     * Cette méthode permet de déplacer tous les objets (de faire avancer le personnage)
     */
    move(c,int){
        if(c=='+'){
            for(var i = 0; i<this.obstacles.length; i++)
		        this.obstacles[i].sprite.velocity.x += 2
        }else{
            for(var i = 0; i<this.obstacles.length; i++)
		        this.obstacles[i].sprite.velocity.x -= 2
        }
    }

    updateVelocity(){
        for(var i = 0; i<this.obstacles.length; i++)
		    this.obstacles[i].sprite.velocity.x *= 0.95
    }

    /**
     * Cette méthode permet de tester si le personnage est en collision avec un objet du parcours
     */
    collision(personnage){
        for(var i = 0; i<this.obstacles.length; i++){
            if (personnage.collide(this.obstacles[i].sprite)) {
                personnage.visible = false;
                alert('Perdu !');
                return false;
            }
	    }
        return true;
    }

    /**
     * Cette méthode permet de redéfinir la position de tous les objets
     */
    reset(){
        for(var i = 0; i<this.obstacles.length; i++){
			this.obstacles[i].resetPos();
		}
    }
}