<?php
 /*
  *  Usage: POST additem.php
  *    key: string
  *    value: JSON blob for topbar item (see README.md for format)
  *
  *  Returns: JSON representation of item log, or Error
  */

  include("config.php");
  if (isset($_POST["key"])) {
    $key = mysqli_real_escape_string($db, $_POST["key"]);
  }
  if (empty($key)) { die('key cannot be empty'); }
  
  if (isset($_POST["value"])) {
    $value = mysqli_real_escape_string($db, $_POST["value"]);
  }

  $sql = "INSERT INTO `items` (keystr, value) VALUES ('$key', '$value');";

  $result = mysqli_query($db, "SELECT * FROM `items` WHERE keystr = '$key'") or die(mysqli_error($db));
  $alreadyExists = mysqli_fetch_assoc($result);
  if ($alreadyExists) {
    $sql = "UPDATE items SET value = '$value' WHERE keystr = '$key';";
  }
  if (empty($value)) {
    if (!$alreadyExists) {
      // Record doesn't exist and new value is empty
      die('Cannot delete nonexistent record');
    }
    $sql = "DELETE FROM items WHERE keystr = '$key';";
  }
  
  echo("SQL: $sql ");
  
  $result = mysqli_query($db, $sql) or die(mysqli_error($db));

  echo("Executed. ");
  
  $result = mysqli_query($db, "SELECT * FROM `items` WHERE keystr = '$key'") or die(mysqli_error($db));
  $entry = mysqli_fetch_assoc($result);

  echo(json_encode($entry, JSON_NUMERIC_CHECK));
?> 
