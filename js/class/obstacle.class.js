/**
 * Classe permettant de créer un objet obstacle
 */
class Obstacle{
    constructor(x,y,width,height,couleur){
        this.sprite = createSprite(x,y,width,height);
        this.sprite.shapeColor = color(couleur);
        this.init_x = x;
        this.init_y = y;
    }

    /**
     * Cette méthode permet de réinitialier la position d'un obstacle
     */
    resetPos(){
        this.sprite.position.x = this.init_x;
        this.sprite.position.y = this.init_y;
    }


    /**
     * Cette méthode permet de retourner la forme de l'obstacle
     */
    getSprite(){
        return this.sprite;
    }
}