/**
 * Cette classe permet d'instancier une platforme
 */
class Platform{
    constructor(x,y,width,height,type){
        this.sprite = createSprite(x,y,width,height);
        if(type == "floor"){
            this.sprite.shapeColor = color(0);
        }else{
            this.sprite.shapeColor = color(102,51,0);
        }
        this.init_x = x;
        this.init_y = y;
    }

    getSprite(){
        return this.sprite;
    }

    incrementPosition(position){
        this.sprite.position.x += position;
    }

    decrementPosition(position){
        this.sprite.position.x -= position;
    }

    setX(x){
        this.sprite.position.x = x;
    }

    setY(y){
        this.sprite.position.y = y;
    }

    resetPos(){
        this.sprite.position.x = this.init_x;
        this.sprite.position.y = this.init_y;
    }

}