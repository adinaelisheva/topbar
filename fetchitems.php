<?php
/* Usage: GET fetchitems.php
*  Returns a list of JSON blobs to be displayed
*/
  include("config.php");

  $json = [];

  $sql = "SELECT value from `items`;"; 

  $entryresult = mysqli_query($db, $sql) or die(mysqli_error($db));

  while ($entry = mysqli_fetch_assoc($entryresult)) {
    $json[] = $entry["value"];
  }

  echo(json_encode($json, JSON_NUMERIC_CHECK|JSON_PRETTY_PRINT));
  
?> 
