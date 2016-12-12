<?php
if(isset($_GET['pseudo']) && isset($_GET['score']) && $_GET['num_requete']==1){
    include_once('config.inc.php');
    include_once('Mypdo.class.php');
    include_once('Score.class.php');
    include_once('ScoreManager.class.php');

    if($_GET['pseudo'] == preg_replace("/[^a-zA-Z0-9 ]+/", "", $_GET['pseudo'])){

        if(strlen(trim($_GET['pseudo'])) == 0 || $_GET['pseudo'] == "undefined")
            $_GET['pseudo'] = "Nobody";
            
        $db = new Mypdo();
        $scoreManager = new ScoreManager($db);

        $score = new Score($_GET);

        $scoreManager->addScore($score);

        $db = null;
    }
    echo json_encode(array("1"=>"chien","3"=>"bite"));
}
?>