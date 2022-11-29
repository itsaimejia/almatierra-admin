# Tabla de Contenidos

- [Introducción](#Introducción).
- [Base de datos](#Base-de-datos).
- [Instalación](#Instalación).
- [Dependencias](#Dependencias).
- [TypeScript](#TypeScript).
- [Desarrollo](#Desarrollo).
- [Colaboradores](#Colaboradores).

## Introducción
El [menú digital](https://github.com/itsaimejia/almatierra-menu/tree/main "menú digital") está guiado por un sistema con una base de datos en línea donde se pueden manejar la información de manera constante  por medio de una página web. Un beneficio de tener un menú digital dinámico es poder actualizar la información y poder visualizarla al instante.

## Base de datos
Para la base de datos se uso [Firebase](https://firebase.google.com "Firebase") de Google que es una plataforma la cual nos otorga el servicio de almacenamiento en la nube, al pertenecer a Google podemos tener la tranquilidad que los datos están seguros. Cuenta con una cuota diaria gratuita, lo que nos permite correr pruebas de una manera sencilla sin hacer gasto. 

Entre los servicios que ofrece esta plataforma cuenta con Firestore Database, en este se crearon todas las colecciones necesarias para la administración de los datos. Las colecciones creadas son **cymbals** , **menus** e **images**.

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/922/TdKK0m.png "Menu")
>**Cymbals** contiene los registros de los Productos, cada registro está conformado por:

>- **menu:** Dato utilizado para filtrar a qué menú pertenece entre los diferentes que hay.
>**categorie:** Igualmente es utilizado para filtrar a qué categoria del menú pertenece.
>- **name:** Nombre del platillo/producto.
>- **description:** Descripción del platillo/producto.
>- **price:** Precio del producto.
>- **status:** Dato utlizado para filtrar si el platillo se encuentra activo,  dependiendo su valor se mostrará o no en el Menú.
El ID de cada documento fue formado con el siguiente orden


    menu: 'Comida'
    categorie: 'Para Compartir'
    lastId: 'SOME0000'
    //obtenemos las primeras 3 letras de menú 
    //obtenemos la primera letra de cada palabra de categorie
    //obtenemos el valor numérico del último ID (lastId) y agregamos 1 
    //todo lo convertimos a mayúsculas
    newId: 'COM' + 'PC' + 0001

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/924/4pAF9r.png "Menu")
>- **Menu** trae todos los datos de las categorias de los platillos del menu y cada registro contiene:
>- **banner:** Contiene la imagen del header de cada seccion del menu.
>- **categorie:** Dato que contiene las subcategorias de cada menu.
>- **mainImage:** Contiene la imagen representativa de cada menu para acceder a los platillos.
>- **status:**  Dato utlizado para filtrar si alguna categoria del menu se encuentra activo. En caso de no encontrarse activo este desaparecera del menu.
>- **title:** Nombre que se le otorga a cada categoria.

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/923/lzkcU0.png "Menu")
>- **Images** guarda la informacion de las imagenes que se usaron en el Menú, cada registro contiene:
>- **alt**: Nombre de la imagen
>- **section**: Dato utilizado para saber a qué sección del menú pertenece, ya que hay 3 secciones: **banner**, **menu**, **banner menu**. Si el valor es *banner*, los siguientes campos quedarian vacios.
>- **menu:** Dato utilizado para filtrar a qué menú pertenece entre los diferentes que hay. Puede estar vacío.
>- **categorie:** Igualmente es utilizado para filtrar a qué categoria del menú pertenece. Puede estar vacío.
>- **src**: Hipervinculo a la imagen. 

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/922/r7pnRI.png "Menu")
>**Otro servicio que se uso de Firebase es Storage donde se almacenaron las imagenes y de donde obtenemos el hipervinculo a estas.**

## Instalacion

```bash
git clone https://github.com/itsaimejia/almatierra-admin.git
```

## Dependencias
```bash
npm install firebase
npm install @tabler/icons
npm install @mantine/core
npm install @mantine/dates
npm install @mantine/forms
npm install @mantine/dropzone
npm install @mantine/notifications
```
## TypeScript
El lenguaje que se utilizó para este proyecto fue TypeScript, ya que es un lenguaje intuitivo, fácil de leer y de redactar, es mejor que JavaScript en términos de que TypeScript es un lenguaje fuertemente tipado, esto quiere decir que tenemos que indicar que tipo de dato estamos asignando a una variable y si ocurre algún error de sintaxis sabremos en donde estaría gracias a que el compilador detecta estos errores y es ideal para proyectos complejos, ya que puede llegar a ser más escalable.

## Desarrollo

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/923/pOqmTc.png)

>**Al entrar por primera vez tenemos la primera pantalla que es un login el cual te pide ingresar tus credenciales y posteriormente podras iniciar sesion. De igual forma se manejaron validaciones en caso de introducirlas incorrectamente tanto el usuario y contraseña.**

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/923/VXjJEJ.png)

>**Una vez dentro tendriamos lo que es la segunda pantalla que muestra en una tabla todos los datos del menú como son el nombre, a que menú corresponde, la categoria que le corresponde, descripcion, precio, estado y las acciones que son para editar, eliminar y modificar estado, en caso de modificar el estado este se pondra inactivo y desaparecera del menú.**

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/924/RsTua8.png)
>**Pasando a las acciones del boton de editar tenemos que podemos modificar el nombre del producto, precio y la descripción**

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/922/NPlJXd.png)
>**Tenemos la pantalla de eliminar un producto, para poder borrarlo debemos confirmar el ID y posteriormente este sera eliminado de la base de datos que a su vez ya no estara disponible en el menú.**

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/923/dtsKUp.png)
>**Tambien tiene la opcion de agregar un nuevo producto, se debe seleccionar a que menú pertenece, categoria, nombre, precio y descripcion y cuando se le da a guardar se agrega al menú y a la tabla principal, a su vez que se le asigna un ID nuevo automaticamente.**

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/924/RgAhnI.png)
>**En la tercera pantalla tenemos la opcion de subir una imagen la cual sera cargada a la base de datos.**

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/922/9r225X.png)
>**Podemos elegir a cual seccion queremos colocar la imagen, ya sea Banner o Menú, Si llega ser en un banner podemos seleccionar un color de fondo.**

![Menu](https://imagizer.imageshack.com/v2/1280x1024q90/924/W1jTF3.png)
>**Podemos seleccionar a cual menu queremos colocarlo y tambien a cual categoria y una vez listo subimos la imagen y ya quedaria para visualizarse en el menú.**

## Colaboradores

- ##### Itsai Zempoaltecatl Mejia [![Itsai](https://imagizer.imageshack.com/v2/1280x1024q90/924/0KjJQs.png)](https://github.com/itsaimejia)
- ##### Vicki Ornelas  [![Vicki](https://imagizer.imageshack.com/v2/100x75q90/923/bOThTs.png)](https://github.com/Vickiornelas27)
- ##### Victor Rivera Moreno [![Victor](https://imagizer.imageshack.com/v2/100x75q90/923/dW2yYz.png)](https://github.com/Victor-Martin-Rivera)
- ##### Angel Mora Silva [![Angel](https://imagizer.imageshack.com/v2/100x75q90/923/b0brgy.png)](https://github.com/itsaimejia)
