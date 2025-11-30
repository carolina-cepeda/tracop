# 🌱 TRACOP
**Trazabilidad de la Cadena de Origen Productivo.** 

Es un sistema completo de trazabilidad para productos agrícolas que permite el seguimiento desde la siembra hasta el centro de acopio, incluyendo cosecha y transporte.

## Descripción

Esta aplicación web permite a productores agrícolas y empresas del sector agroindustrial gestionar y rastrear el ciclo completo de sus productos, garantizando transparencia, calidad y trazabilidad en cada etapa del proceso productivo.

## Características Principales

### Gestión Completa por Etapas

- **Siembra**: Registro de lotes, tipo de cultivo, métodos, fertilizantes y fechas estimadas
- **Cosecha**: Control de cantidades, métodos de recolección, condiciones climáticas y almacenamiento
- **Transporte**: Seguimiento logístico con datos de vehículos, rutas, temperaturas y condiciones
- **Acopio**: Recepción, clasificación por calidad, tratamientos aplicados y categorización

### Panel de Control (Dashboard)

- Estadísticas en tiempo real de todas las operaciones
- Visualización de siembras activas y completadas
- Seguimiento de transportes en tránsito
- Historial de actividad reciente
- Gráficos de estado y progreso

### Trazabilidad Completa

- Timeline visual de cada lote desde siembra hasta acopio
- Códigos QR generados automáticamente para cada lote
- Descarga e impresión de códigos QR
- Indicadores de progreso por etapa
- Vista detallada de cada fase del proceso

### Interfaz Moderna

- Diseño responsivo que se adapta a cualquier dispositivo
- Interfaz intuitiva y fácil de usar
- Código de colores por etapa para identificación rápida
- Navegación clara entre módulos

## Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Herramienta de construcción y desarrollo
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos modernos y escalables
- **React QR Code** - Generación de códigos QR

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
    - Descarga desde: [https://nodejs.org/](https://nodejs.org/)
    - Verifica la instalación: `node --version`

- **npm** (normalmente viene con Node.js)
    - Verifica la instalación: `npm --version`

## Instalación y Configuración

### 1. Clonar o Descargar el Proyecto

```bash
# Si usas Git
git clone [URL_DEL_REPOSITORIO]
cd sistema-trazabilidad-agricola

# O simplemente descomprime el archivo ZIP en una carpeta
```

### 2. Instalar Dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Este comando instalará todas las dependencias necesarias listadas en `package.json`. El proceso puede tomar algunos minutos dependiendo de tu conexión a internet.

### 3. Iniciar el Servidor de Desarrollo

Una vez instaladas las dependencias, ejecuta:

```bash
npm run dev
```

### 4. Acceder a la Aplicación

Abre tu navegador web y visita:

```
http://localhost:3000
```

La aplicación se recargará automáticamente cuando realices cambios en el código.

## Uso de la Aplicación

### Flujo de Trabajo Recomendado

1. **Registrar una Siembra**
    - Ve a la sección "Siembra"
    - Haz clic en "Nueva Siembra"
    - Completa los datos del lote (código, fecha, tipo de cultivo, etc.)
    - Guarda el registro

2. **Registrar la Cosecha**
    - Ve a la sección "Cosecha"
    - Haz clic en "Nueva Cosecha"
    - Selecciona el lote de siembra correspondiente
    - Ingresa cantidad cosechada, método, condiciones, etc.
    - Guarda el registro

3. **Registrar el Transporte**
    - Ve a la sección "Transporte"
    - Haz clic en "Nuevo Transporte"
    - Selecciona la cosecha a transportar
    - Ingresa datos del vehículo, ruta, empresa transportista, etc.
    - Guarda el registro

4. **Registrar en Acopio**
    - Ve a la sección "Acopio"
    - Haz clic en "Nueva Recepción"
    - Selecciona el transporte recibido
    - Clasifica por calidad y categoría
    - Registra tratamientos aplicados
    - Guarda el registro

5. **Visualizar Trazabilidad**
    - Ve a la sección "Trazabilidad"
    - Selecciona un lote de la lista
    - Observa el timeline completo con todas las etapas
    - Descarga o imprime el código QR para compartir

### Dashboard

El dashboard te muestra:
- Número de siembras activas
- Total de cosechas realizadas
- Transportes en tránsito
- Recepciones en el centro de acopio
- Actividad reciente de todas las operaciones
- Estado actual de todos los lotes


##  Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

```

## Colores por Etapa

Cada etapa tiene un código de color distintivo:
- 🟢 Verde: Siembra
- 🟡 Amarillo: Cosecha
- 🔴 Rojo: Transporte
- 🟣 Púrpura: Acopio

##  Solución de Problemas

### El servidor no inicia

```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
npm run dev
```


## Nota Importante
Este es un sistema de demostración que usa almacenamiento local

**Desarrollado para el sector agrícola**

*Versión 1.0.1 - 2025*