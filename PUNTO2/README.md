# PUNTO2: Monitorización con Prometheus, Node Exporter y Grafana

## Descripción

En este punto se configura un entorno de monitorización compuesto por **Prometheus**, **Node Exporter** y **Grafana** en una misma máquina virtual. La configuración y el aprovisionamiento del entorno se realizan utilizando **Vagrant**.

---

## Componentes

- **Prometheus**: Sistema de monitorización y alerta.
- **Node Exporter**: Exportador de métricas del sistema para Prometheus.
- **Grafana**: Plataforma de visualización y análisis de métricas.

---

## Estructura del proyecto

- **Vagrantfile**: Archivo principal para la creación y configuración de la máquina virtual.
- **data/**: Carpeta que contiene todos los archivos de configuración utilizados para Prometheus, Node Exporter y Grafana.

---

## Uso

1. Clona este repositorio y navega a la carpeta `PUNTO2`.
2. Ejecuta `vagrant up` para levantar la máquina virtual y aplicar la configuración.
3. Todos los archivos de configuración se encuentran en la carpeta `data`.

---

## Notas

- No es necesario realizar configuraciones adicionales fuera de los archivos proporcionados en `data`.
- Todos los servicios se ejecutan en la misma máquina virtual creada por Vagrant.