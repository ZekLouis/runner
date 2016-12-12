<?php
class ScoreManager{
	private $db;

	public function __construct($db){
		$this->db = $db ;
	}

	public function addScore($score){
		$req = $this->db->prepare('INSERT INTO score(pseudo, score) values (:pseudo, :score);');
		$req->bindValue(':pseudo',$score->getPseudo());
        $req->bindValue(':score',$score->getScore());
		$req->execute();
	}
}
?>