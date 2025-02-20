# Ej 1
  
## Creaccion del Repositorio en Local
Antes que nada viene la reaccion de la carpeta, en este caso como todo sera por CMD insertaremos este comando.

~~~
mkdir repo01
~~~
![Imagen de demostracion de creaccion de 'repo01'](./img/Screenshot_1.png "Creccion de 'repo01'")

## Configuracion inicial Git Local
En la configuracion incial lo primero que hay que hacer es colocar el 'user' y 'email' que usameremos.

### Configuracion de User
#### Name
Este primer comando nos muestra el nombre usuario que hay en primera instancia.
~~~
git config user.name
~~~

Este segundo comando nos permite modificar el nombre usuario del Git.  
El agregado `--global` nos permite modigicar el usuario para todo el sistema.
~~~
git config --global user.name "Nombre del Usuario"
~~~

![Imagen de demostracion de Configuracion del nombre en Git](./img/Screenshot_3.png "Configuracion del nombre en Git")

#### Email
Este primer comando nos muestra el mail usuario que hay en primera instancia.
~~~
git config user.email
~~~

Este segundo comando nos permite modificar el email usuario del Git.  
~~~
git config --global user.email "Email del Usuario"
~~~

![Imagen de demostracion de Configuracion del email en Git](./img/Screenshot_2.png "Configuracion del email en Git")

### Instalacion de Git en el repositorio
A la hora de la instalacion seguiremos el siguiente codigo.

~~~
git init
~~~

![Imagen de demostracion de Instalacion de Git](./img/Screenshot_4.png "Instalacion de Git")

## Creaccion de fichos en el repositorio y commits
Ahora que ya tenemos instalado Git dentro del repositorio vamos a crear un par de ficheos dentro del mismo.

> Creaccion de fichero `index.html` y `style.css`.

![Imagen de demostracion de Creacion de Fichros](./img/Screenshot_5.png "Creacion de Fichros")

Como se puede ver en la imagen anterior, los ficheros estan creados. Pero a la derecha hay una 'U'.  
Esto nos indica que los ficheros no son traqueados. De hecho, si hacemos el comando `git status` nos indicara el comando que debemos hacer para agerarlos y que sean traqueados.

![Imagen de demostracion de Comando git status](./img/Screenshot_6.png "Comando git status")

Para agregar todos los ficheros podemos solamente poner un '.' en vez del nombre de todos individualmente.

![Imagen de demostracion de Comando git add](./img/Screenshot_7.png "Comando git add")

Ahora al lado donde antes aparecia una 'U' nos aparece una 'A', esto nos indica directamente el estado del fichero.

![Imagen de demostracion de Ficheros Traket](./img/Screenshot_8.png "Ficheros Traket")

Tambien si volvemos a poner el comando `git status` se ve el cambio de estos.

![Imagen de demostracion de Ficheros Traket 2](./img/Screenshot_9.png "Ficheros Traket 2")

Para acabar y hacer el commit hay que colocar el comando `git commit`.
Para evitar entrar en un editar y toda esa parafernalia colocamos el agregado de `-m`. Este es para colocar directamente el nombre del commit.

![Imagen de demostracion de Comando git commit](./img/Screenshot_10.png "Comando git commit")

## Creaccion del Repositorio en GitHub
Para crear el repositorio en GitHub unicamente hay que ir 'Create New' -> 'New Repository'.

![Imagen de demostracion de Crear Repositorio 1](./img/Screenshot_11.png "Crear Repositorio 1")

A continuacion ponemos el nombre del repositorio, en este caso 'repo01'.

![Imagen de demostracion de Crear Repositorio 2](./img/Screenshot_12.png "Crear Repositorio 2")

Y darle a 'Create repository'.

![Imagen de demostracion de Crear Repositorio 3](./img/Screenshot_13.png "Crear Repositorio 3")

## Enlace de GitHub y Git Local y subir cambios
Para enlazar Git Local y GitHub seguiremos los pasos que nos proporciona directamente GitHub.

![Imagen de demostracion de GitHub y Git Local](./img/Screenshot_14.png "GitHub y Git Local")

El primer comando enlaza el Git Local con GitHub.

![Imagen de demostracion de Enlace de GitHub y Git Local](./img/Screenshot_15.png "Enlace de GitHub y Git Local")

El segundo comando cambio el nombre de la rama a main.

![Imagen de demostracion de Cambio de Master a Main](./img/Screenshot_16.png "Cambio de Master a Main")

El tercer comando es el que nos ayuda subir todos los commits dentro de Git Local a GitHub.

![Imagen de demostracion de Subir Cambios](./img/Screenshot_17.png "Subir Cambios")
![Imagen de demostracion de Subir Cambios 2](./img/Screenshot_18.png "Subir Cambios 2")

El comando base para subir los cambios que utilizaremos de aqui en adelante es `git push`.

[GitHub repo01](https://github.com/JorgitoslotX07/repo01)

