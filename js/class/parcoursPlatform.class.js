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
     * Cette méthode permet d'ajouter un obstacle au parcours
     */
    add(platform){
        this.platform.push(platform);
    }

    /**
     * Cette méthode permet de déplacer tous les objets (de faire avancer le personnage)
     */
    move(c,int){
        if(c=='+'){
            for(var i = 0; i<this.platform.length; i++)
		        this.platform[i].sprite.position.x += 5
        }else{
            for(var i = 0; i<this.platform.length; i++)
		        this.platform[i].sprite.position.x -= 5
        }
    }

    /**
     * Cette méthode permet de tester si le personnage est en collision avec un objet du parcours
     */
    collision(personnage){
        for(var i = 0; i<this.platform.length; i++){
            if (personnage.collide(this.platform[i].sprite)) {
                personnage.velocity.y = 0
            }
	    }
    }

    /**
     * Cette méthode permet de redéfinir la position de tous les objets
     */
    reset(){
        for(var i = 0; i<this.platform.length; i++){
			this.platform[i].resetPos();
		}
    }
}