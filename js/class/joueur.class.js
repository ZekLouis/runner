/**
 * Cette classe permet d'instancier un personnage
 */
class Joueur{
    constructor(id,x,y,pseudo){
        this.id = id;
        this.sprite = createSprite(x,y);
        this.sprite.addImage(loadImage("assets/Chartest1.png"));
        this.sprite.shapeColor = color(0,102,104);
        this.init_x = x;
        this.init_y = y;
        this.pseudo = pseudo;
    }

    /**
     * Cette méthode permet de définir la position ainsi que la vélocité d'un joueur
     */
    setPos(x,y,vx,vy){
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.sprite.velocity.x = vx;
        this.sprite.velocity.y = vy;
    }

    /**
     * Cette méthode permet de faire bouger un joueur
     */
    move(c,i){
        if(c=="-"){
            this.sprite.velocity.x -= i
		    this.sprite.velocity.x = Math.max(-10, this.sprite.velocity.x);
        }else{
            this.sprite.velocity.x += i
            this.sprite.velocity.x = Math.min(10, this.sprite.velocity.x);
        }
        
    }

    /**
     * Cette méthode permet de réinitialiser la position d'un personnage
     */
    resetPos(){
        this.sprite.position.x = this.init_x;
        this.sprite.position.y = this.init_y;
        this.setVelocity(7);
        this.sprite.visible = true;
    }
    
    /**
     * Cette méthode permet de définir la vélocité du personnage
     */
    setVelocity(velocity){
        this.sprite.velocity.y = velocity;
    }

    /**
     * Cette méthode permet d'incrémenter la vélocité
     */
    incrementVelocity(velocity){
        this.sprite.velocity.y += velocity;
    }

    /**
     * Cette méthode permet de décrémenter la vélocité
     */
    decrementVelocity(velocity){
        this.sprite.velocity.y -= velocity;
    }

    /**
     * Cette méthode permet de retourner la vélocité
     */
    getVelocity(){
        return this.sprite.velocity.y;
    }

    /**
     * Cette méthode permet de retourner la visibilité du personnage
     */
    getVisible(){
        return this.sprite.visible;
    }

    /**
     * Cette méthode permet définir la visibilité du personnage
     */
    setVisible(visible){
        this.sprite.visible = visible;
    }

    /**
     * Cette méthode de tester la collision entre 2 objets
     */
    collision(objet){
        return this.sprite.collide(objet);
    }

    /**
     * Cette méthode permet de retourner la forme associer au personnage
     */
    getSprite(){
        return this.sprite;
    }

    getX(){
        return this.sprite.position.x;
    }

    getY(){
        return this.sprite.position.y;
    }

    getWidth(){
        return this.sprite.width;
    }

    /**
     * Cette méthode permet au joueur de tirer
     */
    shoot(){
        var obj = new Objet(joueur.getX()+joueur.getWidth()/2,joueur.getY(),10,10,color(0),"shoot");
        var expl = new Objet(joueur.getX()+joueur.getWidth(),joueur.getY(),10,10,color(0),"explode");
        setTimeout(function(){ expl.getSprite().remove()}, 50);
        derniere_col = new Date();
        this.move('-',speed);
    }

    setId(id){
        this.id = id;
    }
}