import { useState } from 'react';
import { SiembraData, CosechaData, TransporteData, AcopioData } from '../App';
import { GitBranch, Sprout, Package, Truck, Warehouse, CheckCircle, Circle, QrCode, Download, Printer } from 'lucide-react';
import QRCode from 'react-qr-code';

interface TrazabilidadScreenProps {
    siembras: SiembraData[];
    cosechas: CosechaData[];
    transportes: TransporteData[];
    acopios: AcopioData[];
}

export function TrazabilidadScreen({ siembras, cosechas, transportes, acopios }: TrazabilidadScreenProps) {
    const [selectedSiembraId, setSelectedSiembraId] = useState<string | null>(null);

    // Obtener trazabilidad completa de un lote
    const getTrazabilidad = (siembraId: string) => {
        const siembra = siembras.find(s => s.id === siembraId);
        const cosecha = cosechas.find(c => c.idSiembra === siembraId);
        const transporte = cosecha ? transportes.find(t => t.idCosecha === cosecha.id) : undefined;
        const acopio = transporte ? acopios.find(a => a.idTransporte === transporte.id) : undefined;

        return { siembra, cosecha, transporte, acopio };
    };

    const selectedData = selectedSiembraId ? getTrazabilidad(selectedSiembraId) : null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                        <GitBranch className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-gray-900">Trazabilidad de Lotes</h2>
                        <p className="text-sm text-gray-600">Seguimiento completo desde siembra hasta acopio</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Selector de Lotes */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-gray-900">Seleccionar Lote</h3>
                            <p className="text-sm text-gray-600 mt-1">{siembras.length} lotes disponibles</p>
                        </div>
                        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                            {siembras.map((siembra) => {
                                const trazabilidad = getTrazabilidad(siembra.id);
                                const isSelected = selectedSiembraId === siembra.id;

                                // Calcular etapas completadas
                                let etapasCompletadas = 1; // Siembra siempre existe
                                if (trazabilidad.cosecha) etapasCompletadas++;
                                if (trazabilidad.transporte) etapasCompletadas++;
                                if (trazabilidad.acopio) etapasCompletadas++;

                                return (
                                    <button
                                        key={siembra.id}
                                        onClick={() => setSelectedSiembraId(siembra.id)}
                                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                                            isSelected ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <h4 className="text-gray-900 mb-1">{siembra.tipoCultivo}</h4>
                                                <p className="text-sm text-gray-600 mb-2">{siembra.codigoLote}</p>

                                                {/* Indicadores de progreso */}
                                                <div className="flex gap-1 mb-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                    {trazabilidad.cosecha ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <Circle className="w-4 h-4 text-gray-300" />
                                                    )}
                                                    {trazabilidad.transporte ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <Circle className="w-4 h-4 text-gray-300" />
                                                    )}
                                                    {trazabilidad.acopio ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <Circle className="w-4 h-4 text-gray-300" />
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                                        <div
                                                            className="bg-indigo-600 h-1.5 rounded-full transition-all"
                                                            style={{ width: `${(etapasCompletadas / 4) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs text-gray-600">{etapasCompletadas}/4</span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                            {siembras.length === 0 && (
                                <div className="p-12 text-center text-gray-500">
                                    No hay lotes registrados
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Timeline de Trazabilidad */}
                <div className="lg:col-span-2 space-y-6">
                    {selectedData && selectedData.siembra ? (
                        <>
                            {/* Sección de QR */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <QrCode className="w-5 h-5 text-indigo-600" />
                                    <h3 className="text-gray-900">Código QR de Trazabilidad</h3>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* QR Code */}
                                    <div className="bg-white p-4 border-2 border-gray-200 rounded-lg">
                                        <QRCode
                                            value={JSON.stringify({
                                                lote: selectedData.siembra.codigoLote,
                                                producto: selectedData.siembra.tipoCultivo,
                                                siembraId: selectedData.siembra.id,
                                                url: `${window.location.origin}?lote=${selectedData.siembra.id}`
                                            })}
                                            size={180}
                                            level="H"
                                        />
                                    </div>

                                    {/* Información y acciones */}
                                    <div className="flex-1">
                                        <p className="text-gray-600 mb-4">
                                            Este código QR contiene toda la información de trazabilidad del lote <strong>{selectedData.siembra.codigoLote}</strong>.
                                            Escanéalo para acceder rápidamente a los datos completos del producto.
                                        </p>

                                        <div className="space-y-2">
                                            <button
                                                onClick={() => {
                                                    const svg = document.querySelector('#qr-container svg');
                                                    if (svg) {
                                                        const svgData = new XMLSerializer().serializeToString(svg);
                                                        const canvas = document.createElement('canvas');
                                                        const ctx = canvas.getContext('2d');
                                                        const img = new Image();
                                                        img.onload = () => {
                                                            canvas.width = img.width;
                                                            canvas.height = img.height;
                                                            ctx?.drawImage(img, 0, 0);
                                                            const pngFile = canvas.toDataURL('image/png');
                                                            const downloadLink = document.createElement('a');
                                                            downloadLink.download = `QR-${selectedData.siembra.codigoLote}.png`;
                                                            downloadLink.href = pngFile;
                                                            downloadLink.click();
                                                        };
                                                        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                                                    }
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors w-full md:w-auto"
                                            >
                                                <Download className="w-4 h-4" />
                                                Descargar QR
                                            </button>

                                            <button
                                                onClick={() => window.print()}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors w-full md:w-auto"
                                            >
                                                <Printer className="w-4 h-4" />
                                                Imprimir
                                            </button>
                                        </div>

                                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                            <p className="text-sm text-gray-600">
                                                <strong>Datos incluidos:</strong> Código de lote, producto, fechas, cantidades,
                                                transporte y calidad.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-gray-900 mb-6">
                                    Trazabilidad: {selectedData.siembra.tipoCultivo} - {selectedData.siembra.codigoLote}
                                </h3>

                                <div className="space-y-6" id="qr-container">
                                    {/* Siembra */}
                                    <div className="relative">
                                        <div className="absolute left-5 top-16 w-0.5 h-[calc(100%+1.5rem)] bg-green-600"></div>

                                        <div className="flex gap-4">
                                            <div className="bg-green-100 p-3 rounded-full ring-4 ring-green-600 ring-offset-2 z-10">
                                                <Sprout className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div className="flex-1 bg-green-50 rounded-lg p-4 border border-green-200">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-gray-900">Siembra</h4>
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                          {selectedData.siembra.estado}
                        </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Fecha de Siembra:</span>
                                                        <p className="text-gray-900">
                                                            {new Date(selectedData.siembra.fechaSiembra).toLocaleDateString('es-ES', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Método:</span>
                                                        <p className="text-gray-900">{selectedData.siembra.metodoSiembra}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Tipo de Cultivo:</span>
                                                        <p className="text-gray-900">{selectedData.siembra.tipoCultivo}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Cosecha Estimada:</span>
                                                        <p className="text-gray-900">
                                                            {new Date(selectedData.siembra.fechaEstimadaCosecha).toLocaleDateString('es-ES')}
                                                        </p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <span className="text-gray-600">Fertilizantes:</span>
                                                        <p className="text-gray-900">{selectedData.siembra.fertilizantesAplicados}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cosecha */}
                                    {selectedData.cosecha ? (
                                        <div className="relative">
                                            <div className="absolute left-5 top-16 w-0.5 h-[calc(100%+1.5rem)] bg-yellow-600"></div>

                                            <div className="flex gap-4">
                                                <div className="bg-yellow-100 p-3 rounded-full ring-4 ring-yellow-600 ring-offset-2 z-10">
                                                    <Package className="w-6 h-6 text-yellow-600" />
                                                </div>
                                                <div className="flex-1 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="text-gray-900">Cosecha</h4>
                                                        <span className="px-2.5 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700">
                            {selectedData.cosecha.estado}
                          </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                                        <div>
                                                            <span className="text-gray-600">Fecha:</span>
                                                            <p className="text-gray-900">
                                                                {new Date(selectedData.cosecha.fechaCosecha).toLocaleDateString('es-ES', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Código Lote:</span>
                                                            <p className="text-gray-900">{selectedData.cosecha.codigoLoteCosecha}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Cantidad:</span>
                                                            <p className="text-gray-900">{selectedData.cosecha.cantidadCosechada.toLocaleString()} kg</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Método:</span>
                                                            <p className="text-gray-900">{selectedData.cosecha.metodoCosecha}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Clima:</span>
                                                            <p className="text-gray-900">{selectedData.cosecha.condicionesClimaticas}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Almacenamiento:</span>
                                                            <p className="text-gray-900">{selectedData.cosecha.tipoAlmacenamiento}</p>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <span className="text-gray-600">Tratamiento:</span>
                                                            <p className="text-gray-900">{selectedData.cosecha.tratamientoPostCosecha}</p>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <span className="text-gray-600">Observaciones:</span>
                                                            <p className="text-gray-900">{selectedData.cosecha.observaciones}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-4">
                                            <div className="bg-gray-100 p-3 rounded-full">
                                                <Package className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <h4 className="text-gray-600">Cosecha - Pendiente</h4>
                                                <p className="text-sm text-gray-500 mt-1">No se ha registrado la cosecha de este lote</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Transporte */}
                                    {selectedData.transporte ? (
                                        <div className="relative">
                                            <div className="absolute left-5 top-16 w-0.5 h-[calc(100%+1.5rem)] bg-orange-600"></div>

                                            <div className="flex gap-4">
                                                <div className="bg-orange-100 p-3 rounded-full ring-4 ring-orange-600 ring-offset-2 z-10">
                                                    <Truck className="w-6 h-6 text-orange-600" />
                                                </div>
                                                <div className="flex-1 bg-orange-50 rounded-lg p-4 border border-orange-200">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="text-gray-900">Transporte</h4>
                                                        <span className="px-2.5 py-0.5 rounded-full text-xs bg-orange-100 text-orange-700">
                            {selectedData.transporte.estado}
                          </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                                        <div>
                                                            <span className="text-gray-600">Empresa:</span>
                                                            <p className="text-gray-900">{selectedData.transporte.empresaTransportista}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Vehículo:</span>
                                                            <p className="text-gray-900">
                                                                {selectedData.transporte.tipoVehiculo} - {selectedData.transporte.placaVehiculo}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Tipo:</span>
                                                            <p className="text-gray-900">{selectedData.transporte.tipoTransporte}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Refrigeración:</span>
                                                            <p className="text-gray-900">{selectedData.transporte.sistemaRefrigeracion ? 'Sí' : 'No'}</p>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <span className="text-gray-600">Origen:</span>
                                                            <p className="text-gray-900">{selectedData.transporte.direccionOrigen}</p>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <span className="text-gray-600">Destino:</span>
                                                            <p className="text-gray-900">{selectedData.transporte.direccionDestino}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Carga:</span>
                                                            <p className="text-gray-900">
                                                                {new Date(selectedData.transporte.fechaHoraCarga).toLocaleString('es-ES')}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Llegada:</span>
                                                            <p className="text-gray-900">
                                                                {new Date(selectedData.transporte.fechaHoraLlegada).toLocaleString('es-ES')}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Contenedores:</span>
                                                            <p className="text-gray-900">{selectedData.transporte.numeroContenedores}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Condición al cargar:</span>
                                                            <p className="text-gray-900">{selectedData.transporte.condicionProductoCarga}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-4">
                                            <div className="bg-gray-100 p-3 rounded-full">
                                                <Truck className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <h4 className="text-gray-600">Transporte - Pendiente</h4>
                                                <p className="text-sm text-gray-500 mt-1">No se ha registrado el transporte de este lote</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Acopio */}
                                    {selectedData.acopio ? (
                                        <div className="flex gap-4">
                                            <div className="bg-purple-100 p-3 rounded-full ring-4 ring-purple-600 ring-offset-2 z-10">
                                                <Warehouse className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <div className="flex-1 bg-purple-50 rounded-lg p-4 border border-purple-200">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-gray-900">Acopio</h4>
                                                    <div className="flex gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">
                            {selectedData.acopio.estado}
                          </span>
                                                        <span className="px-2.5 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700">
                            {selectedData.acopio.categoriaAsignada}
                          </span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Fecha Recepción:</span>
                                                        <p className="text-gray-900">
                                                            {new Date(selectedData.acopio.fechaHoraRecepcion).toLocaleString('es-ES')}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">ID Recepción:</span>
                                                        <p className="text-gray-900">{selectedData.acopio.id}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Producto:</span>
                                                        <p className="text-gray-900">{selectedData.acopio.productoRecibido}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Cantidad Recibida:</span>
                                                        <p className="text-gray-900">{selectedData.acopio.cantidadRealRecibida.toLocaleString()} kg</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Calidad:</span>
                                                        <p className="text-gray-900">{selectedData.acopio.nivelCalidad}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Categoría:</span>
                                                        <p className="text-gray-900">{selectedData.acopio.categoriaAsignada}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <span className="text-gray-600">Tratamientos Aplicados:</span>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {selectedData.acopio.tratamientosAplicados.map((t, i) => (
                                                                <span key={i} className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                                {t}
                              </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <span className="text-gray-600">Productos Aplicados:</span>
                                                        <p className="text-gray-900">{selectedData.acopio.productosAplicados}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-4">
                                            <div className="bg-gray-100 p-3 rounded-full">
                                                <Warehouse className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <h4 className="text-gray-600">Acopio - Pendiente</h4>
                                                <p className="text-sm text-gray-500 mt-1">No se ha registrado el acopio de este lote</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <GitBranch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-gray-900 mb-2">Selecciona un Lote</h3>
                            <p className="text-gray-500">
                                Elige un lote de la lista para ver su trazabilidad completa
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
