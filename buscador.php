<?php
  // Conexión y lectura del archivo contenedor de los datos  
  $nombreArchivo = "data-1.json";
  $archivo = fopen($nombreArchivo, "r");
  $datos = fread($archivo, filesize($nombreArchivo));
  $datosArray = json_decode($datos);
  $datosNuevos = array();

  if(isset($_POST["ciudad"]) && isset($_POST["tipo"]) && isset($_POST["from"]) && isset($_POST["to"])){
    // Captura de formulario
      // Filtro - Selección de Ciudad
    $ciudad = $_POST["ciudad"];
      // Filtro - Tipo de propiedad
    $tipo = $_POST["tipo"];
      // Filtro - Precio desde
    $from = $_POST["from"];
      // Filtro - Precio hasta
    $to = $_POST["to"];

    // Recorre el array
    for($i=0; $i < count($datosArray); $i++){
      // Reemplaza y da formato de moneda
      $NuevoPrecio = str_replace('$', '', str_replace(',', '', str_replace(' ', '', $datosArray[$i]->Precio)));
      // Condicional - Opción 1 - Precio, ciudad y tipo de propiedad
        if($NuevoPrecio >= $from && $NuevoPrecio <= $to && $datosArray[$i]->Ciudad == $ciudad && $datosArray[$i]->Tipo == $tipo){
          array_push($datosNuevos, $datosArray[$i]);
      // Condicional - Opción 2 - Por precio y ciudad - Tipo vacío
        }else if($NuevoPrecio >= $from && $NuevoPrecio <= $to && $datosArray[$i]->Ciudad == $ciudad && $tipo == ""){
          array_push($datosNuevos, $datosArray[$i]);
      // Condicional - Opción 3 - Por precio y tipo - Ciudad vacío
        }else if($NuevoPrecio >= $from && $NuevoPrecio <= $to && $datosArray[$i]->Tipo == $tipo && $ciudad == ""){
          array_push($datosNuevos, $datosArray[$i]);
      // Condicional - Opción 4 - Solo por precio
        }else if($NuevoPrecio >= $from && $NuevoPrecio <= $to && $ciudad == "" && $tipo == ""){
          array_push($datosNuevos, $datosArray[$i]);
        }
      }
      // Imprime los datos filtrados
    echo json_encode($datosNuevos);
  // Condicional TODOS
  }else if(isset($_POST["todos"])){
    // imprime en pantalla los datos
    echo $datos;
  }

// Cerrar archivo
  fclose($archivo);

?>
