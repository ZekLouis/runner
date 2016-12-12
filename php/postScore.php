<?php
if(isset($_POST['pseudo']) && isset($_POST['score'])){
    include_once('config.inc.php');
    include_once('Mypdo.class.php');
    include_once('Score.class.php');
    include_once('ScoreManager.class.php');

    if($_POST['pseudo'] == preg_replace("/[^a-zA-Z0-9 ]+/", "", $_POST['pseudo'])){

        if(strlen(trim($_POST['pseudo'])) == 0 || $_POST['pseudo'] == "undefined")
            $_POST['pseudo'] = "Nobody";
            
        $db = new Mypdo();
        $scoreManager = new ScoreManager($db);

        $score = new Score($_POST);

        $scoreManager->addScore($score);

        $db = null;
    }
}
?>