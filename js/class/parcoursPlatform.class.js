/**
 * Cette classe permet d'instancier un parcours contenant des plateformes
 */
class ParcoursPlatform{

    /**
     * Constructeur de la classe ParcoursPlatform
     */
    constructor(){
        this.platform = [];
    }

    /**
     * Cette méthode permet d'ajouter une platform au parcours
     */
    add(platform){
        this.platform.push(platform);
    }

    /**
     * Cette méthode permet de déplacer toutes les platform (de faire avancer le personnage)
     */
    move(c,int){
        if(c=='+'){
            for(var i = 0; i<this.platform.length; i++)
		        this.platform[i].sprite.velocity.x += 2
        }else{
            for(var i = 0; i<this.platform.length; i++)
		        this.platform[i].sprite.velocity.x -= 2
        }
    }

    updateVelocity(){
        for(var i = 0; i<this.platform.length; i++)
		    this.platform[i].sprite.velocity.x *= 0.95
    }

    /**
     * Cette méthode permet de tester si le personnage est en collision avec une platform du parcours
     */
    collision(personnage){
        for(var i = 0; i<this.platform.length; i++){
            if (personnage.collide(this.platform[i].sprite)) {
                personnage.velocity.y = 0
            }
	    }
    }

    /**
     * Cette méthode permet de redéfinir la position de toutes les platformes
     */
    reset(){
        for(var i = 0; i<this.platform.length; i++){
			this.platform[i].resetPos();
		}
    }
}