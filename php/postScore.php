<?php
header('Content-type: application/json');
if(isset($_GET['pseudo']) && isset($_GET['score'])){
    include_once('config.inc.php');
    include_once('Mypdo.class.php');
    include_once('Score.class.php');
    include_once('ScoreManager.class.php');
    //phpinfo();
            
    $db = new Mypdo();
    $scoreManager = new ScoreManager($db);
    
    $score = new Score($_GET);
    $res = $scoreManager->addScore($score);
    
    echo json_encode(array("insertion"=>$res==1));
}
?>