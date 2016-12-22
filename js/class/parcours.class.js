/**
 * Cette classe permet d'instancier un parcours contenant des objets
 */
class Parcours{

    /**
     * Constructeur de la classe Parcours
     */
    constructor(){
        this.objets = [];
    }

    /**
     * Cette méthode permet d'ajouter un objet au parcours
     */
    add(objet){
        this.objets.push(objet);
    }

    /**
     * Cette méthode permet de tester si le personnage est en collision avec un objet du parcours
     */
    collision(personnage){
        for(var i = 0; i<this.objets.length; i++){
            if (personnage.collide(this.objets[i].sprite) && this.objets[i] instanceof Objet) {
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
        for(var i = 0; i<this.objets.length; i++){
			this.objets[i].resetPos();
		}
    }
}