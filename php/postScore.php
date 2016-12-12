<?php
header('Content-type: application/json');
if(isset($_GET['pseudo']) && isset($_GET['score'])){
    include_once('config.inc.php');
    include_once('Mypdo.class.php');
    include_once('Score.class.php');
    include_once('ScoreManager.class.php');
    //phpinfo();
            
    $db = new Mypdo();
    print_r($db);
    $scoreManager = new ScoreManager($db);
    
    $score = new Score($_GET);
    $scoreManager->addScore($score);

    $db = null;
    echo json_encode(array("1"=>"chien","3"=>"bite"));
}
?>