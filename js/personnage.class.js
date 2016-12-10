/**
 * Cette classe permet d'instancier un personnage
 */
class Personnage{
    constructor(x,y){
        this.sprite = createSprite(x,y,25,25);
        this.sprite.shapeColor = color(0,102,104);
        this.init_x = x;
        this.init_y = y;
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
}