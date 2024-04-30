--TABLAS

--CLIENTE
CREATE TABLE cliente (
  cliente_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  primer_nombre VARCHAR(255) NOT NULL,
  segundo_nombre VARCHAR(255) NOT NULL,
  primer_apellido VARCHAR(255) NOT NULL,
  segundo_apellido VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255) UNIQUE NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  genero VARCHAR(255) NOT NULL
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
  tipo_habitacion_id INT NOT NULL,
  estado_habitacion_id INT NOT NULL,
  hotel_id INT NOT NULL,
  capacidad INT NOT NULL,
  numero_cama INT NOT NULL, 
  precio INT NOT NULL
);

--ESTADO HABITACION
CREATE TABLE estado_habitacion (
 estado_habitacion_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 descripcion VARCHAR(255) NOT NULL
);

--TIPO HABITACION
CREATE TABLE tipo_habitacion (
 tipo_habitacion_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 descripcion VARCHAR(255) NOT NULL
);

--RESERVA
CREATE TABLE reserva (
  reserva_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  habitacion_id INT NOT NULL,
  cliente_id INT NOT NULL,
  pago_id INT,
  fecha_entrada DATE NOT NULL,
  fecha_salida DATE NOT NULL,
  cantidad_personas INT NOT NULL,
  precio_final INT NOT NULL
);

--EMPLEADO
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

--PAGO
CREATE TABLE pago (
  pago_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tipo_pago_id INT NOT NULL,
  fecha_pago DATE NOT NULL
);

--TIPO DE PAGO
CREATE TABLE tipo_pago (
  tipo_pago_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) NOT NULL
);


--FOREIGN KEYS

--FOREIGN KEY DE TABLA EMPLEADO Y TABLA CATEGORIA DE EMPLEADO
ALTER TABLE empleado
ADD CONSTRAINT fk_empleado_categoria FOREIGN KEY (categoria_empleado_id) REFERENCES categoria_empleado (categoria_empleado_id);

--FOREIGN KEY DE TABLA RESERVA, CLIENTE Y HABITACION
ALTER TABLE reserva
ADD CONSTRAINT fk_reserva_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (cliente_id), -- Corregido el nombre de la tabla
ADD CONSTRAINT fk_reserva_habitacion FOREIGN KEY (habitacion_id) REFERENCES habitacion (habitacion_id);

--FOREIGN KEY DE TABLA PAGO Y TIPO DE PAGO
ALTER TABLE pago
ADD CONSTRAINT fk_pago_tipo_pago FOREIGN KEY (tipo_pago_id) REFERENCES tipo_pago (tipo_pago_id);


--FOREIGN KEY DE TABLA RESERVA Y PAGO
ALTER TABLE reserva
ADD CONSTRAINT fk_reserva_pago FOREIGN KEY (pago_id) REFERENCES pago (pago_id);


--FOREIGN KEY DE TABLA HABITACION Y ESTADO DE HABITACION
ALTER TABLE habitacion
ADD CONSTRAINT fk_habitacion_estado_habitacion FOREIGN KEY (estado_habitacion_id) REFERENCES estado_habitacion (estado_habitacion_id);


