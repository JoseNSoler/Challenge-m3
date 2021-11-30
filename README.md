[Portugues](/doc/pt-br.md)
[Español](/doc/es.md)

Para hacer la instalación de dependencias sólo es necesario ejecutar el comando: `npm install`

El comando utilizado para poner el server en start es: `npm start`

Una vez que el comando es ejecutado el levantará 2 servidores, siendo ellos:

uno para acceder el front-end React/Sass que corre en la puerta 3000 por el comando `serve -s build`. En el cual puede ser accedido por la url: http://localhost:3000/

uno para el json-server que es responsable por exportar una api con la lista de productos que corre en la puerta 5000. Para acceder los produtos basta utilizar la url: http://localhost:5000/products

