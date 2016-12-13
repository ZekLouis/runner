<?php
class ScoreManager{
	private $db;

	public function __construct($db){
		$this->db = $db ;
	}

	public function addScore($score){
		
		$req = $this->db->prepare('INSERT INTO score(pseudo, score) values (:pseudo, :score);');
		$req->bindValue(':pseudo',$score->getPseudo(), PDO::PARAM_STR);
        $req->bindValue(':score',$score->getScore(), PDO::PARAM_INT);
		$req->execute();
		return $req->rowCount();
	}

	public function getBest(){
		$sql = "SELECT * FROM score order by score limit 1";
		$req = $this->db->query($sql);
		$res = $req->fetch(PDO::FETCH_OBJ);
		$score = new Score($res);
		return $score;
	}
}
?>