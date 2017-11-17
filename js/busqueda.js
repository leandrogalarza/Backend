$(function(){
  var Propiedades = {
    $btnTodos: $('#mostrarTodos'),
    formulario: $('#formulario'),
    contenidoPropiedades: $('#bienes'),

// Función al iniciar
Inicio: function(){
  var self = this
  // Muestra el filtrado
  self.MostrarFiltrado()
  // Muestra todos
  self.MostrarTodos()
  // Capta el formulario
  self.formulario.submit(function(e){
  e.preventDefault()
  // Busca las propiedad
  self.buscarPropiedades()
  })
},

MostrarFiltrado: function(){
  $('select').material_select()
},

MostrarTodos: function(){
  var self = this
  self.$btnTodos.on('click', (e)=>{
  var datos = {todos: ""}

  self.ajaxData(datos)
  })
},

buscarPropiedades: function(e){
  var self = this
  // Captura de parámetros para la bùsqueda
  var ciudad = $('form').find('select[id="selectCiudad"]').val()
  var tipo = $('form').find('select[id="selectTipo"]').val()
  var from = self.rangoPrecios($('.irs-from').text())
  var to = self.rangoPrecios($('.irs-to').text())
  var datos = {ciudad: ciudad, tipo: tipo, from: from, to: to}
    self.ajaxData(datos)
},

ajaxData: function(datos){
  var self = this
  $.ajax({
    url: 'buscador.php',
    type: 'POST',
    data: datos
  }).done(function(data){
  var newData = JSON.parse(data)
  self.muestraDatos(newData)
  })
},

rangoPrecios: function(valor){
  var precio = valor
  var nuevoPrecio = Number(precio.replace('$', '').replace(',', '').replace(' ', ''))
  return nuevoPrecio
},

muestraDatos: function(propiedades){
  var propiedad = propiedades
  var self = this
  // reinicia el contenedor
  self.contenidoPropiedades.html('')
  propiedad.map((propiedad)=>{
    // Añade los datos de las propiedades
    var addPropiedad = '<div class="itemMostrado">'+
                          '<img src="img/home.jpg" class="foto">'+
                          '<div class="card-stacked">'+
                            '<div>'+
                              '<b>Direccion: </b>'+propiedad.Direccion+
                            '</div>'+
                            '<div>'+
                              '<b>Ciudad: </b>'+propiedad.Ciudad+
                            '</div>'+
                            '<div>'+
                              '<b>Telefono: </b>'+propiedad.Telefono+
                            '</div>'+
                            '<div>'+
                              '<b>Código postal: </b>'+propiedad.Codigo_Postal+
                            '</div>'+
                            '<div>'+
                              '<b>Tipo: </b>'+propiedad.Tipo+
                            '</div>'+
                            '<div>'+
                              '<b>Precio: </b><span class="precioTexto">'+propiedad.Precio+'</span><br>'+
                            '</div>'+
                            '<div class="card-action">'+
                              '<a href="#">VER MAS</a>'+
                            '</div>'+
                          '</div>'+
                        '</div>';

    // agrega las propiedades
    self.contenidoPropiedades.append(addPropiedad)
  
    })
  
  // Agrega la cantidad. No necesaria en la consigna pero util
    cantidadProp = $('.foto').length;
    $('#resultados').text("Resultados de la búsqueda: "+cantidadProp);
  }
}

// Inicio
Propiedades.Inicio()

})
