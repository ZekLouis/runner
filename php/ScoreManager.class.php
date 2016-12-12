<?php
class ScoreManager{
	private $db;

	public function __construct($db){
		$this->db = $db ;
	}

	public function addScore($score){
		$req = $this->db->prepare('INSERT INTO score(pseudo, score) values (:pseudo, :score);');
		$req->bindValue(':pseudo',$pseudo->getPseudo(),PDO::PARAM_STR);
        $req->bindValue(':score',$score->getScore(),PDO::PARAM_STR);
		$req->execute();
	}
}
?>