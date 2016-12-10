class Piece{
    constructor(x,y){
        this.sprite = createSprite(x,y,11,11);
        this.sprite.shapeColor= color(204,204,0);
        this.init_x = x;
        this.init_y = y;
    }

    /**
     * Cette méthode permet de réinitialiser la position d'une pièce
     */
    resetPos(){
        this.sprite.position.x = this.init_x;
        this.sprite.position.y = this.init_y;
        this.sprite.visible = true;
    }

    /**
     * Cette méthode permet de retourner la forme associer a une pièce
     */
    getSprite(){
        return this.sprite;
    }
}