<?php

header('Content-type: application/json');
include_once('config.inc.php');
include_once('Mypdo.class.php');
include_once('Score.class.php');
include_once('ScoreManager.class.php');
$db = new Mypdo();
$scoreManager = new ScoreManager($db);

switch($_GET['num_requete']){
    case 1:
        if(isset($_GET['pseudo']) && isset($_GET['score'])){
            $score = new Score($_GET);
            $res = $scoreManager->addScore($score);
            
            echo json_encode(array("insertion"=>$res==1));
        }
        break;
    case 2:
        $res = $scoreManager->getBest();
        $score = new Score($res);
        echo json_encode((array("nom"=>$score->getPseudo(),"score"=>$score->getScore())));
        break;
}

?>