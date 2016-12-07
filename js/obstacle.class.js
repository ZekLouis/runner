/**
 * Classe permettant de créer un objet obstacle
 */
class Obstacle{
    constructor(x,y,width,height,color,init_x,init_y){
        this.sprite = createSprite(x,y,width,height);
        this.color = color;
        this.init_x = init_x;
        this.init_y = init_y;
    }

    /**
     * Cette méthode permet de réinitialier la position d'un obstacle
     */
    resetPos(){
        super.x = init_x;
        super.y = init_y;
    }
}