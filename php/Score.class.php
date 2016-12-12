<?php
class Score{
    private $score;
    private $pseudo;

    public function __construct($valeur = array())
	{
		if(!empty($valeur))
		{
			$this->affect($valeur);
		}
	}
	
	public function affect($donnees)
	{
		foreach($donnees as $attribut => $valeur)
		{
	
			switch($attribut)
			{
				case 'score':
					$this->setScore($valeur);
					break;
				case 'pseudo':
					$this->setPseudo($valeur);
					break;
			}
		}
	}

    public function setScore($valeur){
        $this->score = $valeur;
    }

    public function setPseudo($valeur){
        $this->pseudo = $valeur;
    }

    public function getScore(){
        return $this->score;
    }

    public function getPseudo(){
        return $this->pseudo;
    }
}