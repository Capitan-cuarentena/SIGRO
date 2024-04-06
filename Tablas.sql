--TABLAS

--CLIENTE
CREATE TABLE cliente (
  cliente_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  primer_nombre VARCHAR(255) NOT NULL,
  segundo_nombre VARCHAR(255) NOT NULL,
  primer_apellido VARCHAR(255) NOT NULL,
  segundo_apellido VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255) UNIQUE NOT NULL,
  telefono VARCHAR(20) NOT NULL
);

--HOTEL
CREATE TABLE hotel (
  hotel_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  categoria VARCHAR(20) NOT NULL
);

--HABITACION
CREATE TABLE habitacion (
  habitacion_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  hotel_id INT NOT NULL,
  tipo VARCHAR(255) NOT NULL,
  capacidad INT NOT NULL,
  precio INT NOT NULL
);


--RESERVA
CREATE TABLE reserva (
  reserva_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  habitacion_id INT NOT NULL,
  cliente_id INT NOT NULL,
  fecha_entrada DATE NOT NULL,
  fecha_salida DATE NOT NULL,
  cantidad_personas INT NOT NULL
);

CREATE TABLE empleado (
  empleado_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  categoria_empleado_id INT NOT NULL,
  primer_nombre VARCHAR(255) NOT NULL,
  segundo_nombre VARCHAR(255) NOT NULL,
  primer_apellido VARCHAR(255) NOT NULL,
  segundo_apellido VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255) UNIQUE NOT NULL,
  telefono VARCHAR(20) NOT NULL
);


--TIPO DE EMPLEADO
CREATE TABLE categoria_empleado (
  categoria_empleado_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre_categoria VARCHAR(255) NOT NULL
);


--FOREIGN KEY DE TABLA EMPLEAOD Y TABLA CATEGORIA DE EMPLEADO
ALTER TABLE empleado
ADD CONSTRAINT fk_empleado_categoria FOREIGN KEY (categoria_empleado_id) REFERENCES categoria_empleado (categoria_empleado_id);

--FOREIGN KEY DE TABLA RESERVA, CLIENTE Y HABITACION
ALTER TABLE reserva
ADD CONSTRAINT fk_reserva_cliente FOREIGN KEY (cliente_id) REFERENCES clientes (cliente_id),
ADD CONSTRAINT fk_reserva_habitacion FOREIGN KEY (habitacion_id) REFERENCES habitacion (habitacion_id);
