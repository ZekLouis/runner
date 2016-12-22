/**
 * Cette classe permet d'instancier une platforme
 */
class Platform extends Objet{
    constructor(x,y,width,height,type){
        super(x,y,width,height,color(0),"plat")
    }

    /**
     * Cette méthode permet de retourner la forme associée a une platforme
     */
    getSprite(){
        return this.sprite;
    }

    /**
     * Cette méthode permet d'augmenter la position horiztonal de la platforme
     */
    incrementPosition(position){
        this.sprite.position.x += position;
    }

    /**
     * Cette méthode permet de diminuer la position horiztonal de la platforme
     */
    decrementPosition(position){
        this.sprite.position.x -= position;
    }

    /**
     * Cette méthode permet de définir la variable x de la platforme
     */
    setX(x){
        this.sprite.position.x = x;
    }

    /**
     * Cette méthode permet de définir la variable y de la platforme
     */
    setY(y){
        this.sprite.position.y = y;
    }

    /**
     * Cette méthode permet de redéfinir la position de la platforme à sa position initiale
     */
    resetPos(){
        this.sprite.position.x = this.init_x;
        this.sprite.position.y = this.init_y;
    }

}