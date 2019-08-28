<?php 

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json');

if (array_key_exists('name', $_POST)) {
    require './PHPMailer.php';
    require './SMTP.php';
    
    $mail = new PHPMailer;
    $mail->CharSet = 'UTF-8';
    
    // Настройки SMTP
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPDebug = 0;
    
    $mail->Host = 'ssl://smtp.mail.ru';
    $mail->Port = 465;
    $mail->Username = 'contact@assmm.info';
    $mail->Password = 'TPyPyVldr19(';
    
    // От кого
    $mail->setFrom('contact@assmm.info', 'ASSMM');		
    
    // Кому
    $mail->addAddress('contact@assmm.info', 'ASSMM');
    
    // Тема письма
    $mail->Subject = 'Новая заявка!';
    
    // Тело письма
    $body = "Имя: " .$_POST["name"].'<br>Телефон: '.$_POST['tel'];
    $mail->msgHTML($body);
    
    $mail->send();
    echo json_encode($_POST);
}

?>