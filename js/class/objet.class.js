/**
 * Cette classe permet d'instancier un objet
 */
class Objet{

    /**
     * Constructeur de la classe Objet
     */
    constructor(x,y,width,height,couleur,type){
        if(type=="shoot"){
            this.sprite = createSprite(x,y);
            this.sprite.addImage(loadImage("assets/bullet.png"));
            this.moveShoot();
        }else if(type=="explode"){
            this.sprite = createSprite(x,y);
            this.sprite.addImage(loadImage("assets/explode.png"));
        }else{
             this.sprite = createSprite(x,y,width,height);
        }
        this.sprite.shapeColor = couleur;
        this.init_x = x;
        this.init_y = y;
        this.type = type;  
    }

    /**
     * Cette méthode permet de définir la position
     */
    setPos(x,y){
        this.sprite.position.x = x;
        this.sprite.position.y = y;
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
    
    moveShoot(){
        this.sprite.velocity.x = 50;
    }
}