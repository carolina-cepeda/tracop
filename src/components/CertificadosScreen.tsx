import { useState } from 'react';
import { SiembraData, CosechaData, TransporteData, AcopioData } from '../App';
import { Award, Shield, Leaf, Globe, CheckCircle, Calendar, FileText, Download } from 'lucide-react';

interface CertificadosScreenProps {
  siembras: SiembraData[];
  cosechas: CosechaData[];
  transportes: TransporteData[];
  acopios: AcopioData[];
}

interface Certificado {
  id: string;
  tipo: 'Origen' | 'Orgánico' | 'Comercio Justo' | 'Calidad' | 'Sostenibilidad' | 'Ética Laboral';
  nombre: string;
  descripcion: string;
  entidadCertificadora: string;
  numeroRegistro: string;
  fechaEmision: string;
  fechaVencimiento: string;
  estado: 'Vigente' | 'Por vencer' | 'Vencido';
  cobertura: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function CertificadosScreen({ siembras, cosechas, transportes, acopios }: CertificadosScreenProps) {
  const [selectedSiembraId, setSelectedSiembraId] = useState<string | null>(null);

  // Obtener trazabilidad completa de un lote
  const getTrazabilidad = (siembraId: string) => {
    const siembra = siembras.find(s => s.id === siembraId);
    const cosecha = cosechas.find(c => c.idSiembra === siembraId);
    const transporte = cosecha ? transportes.find(t => t.idCosecha === cosecha.id) : undefined;
    const acopio = transporte ? acopios.find(a => a.idTransporte === transporte.id) : undefined;

    return { siembra, cosecha, transporte, acopio };
  };

  // Certificados de ejemplo para el lote seleccionado
  const getCertificadosForLote = (siembraId: string): Certificado[] => {
    const trazabilidad = getTrazabilidad(siembraId);
    if (!trazabilidad.siembra) return [];

    return [
      {
        id: 'CERT-001',
        tipo: 'Origen',
        nombre: 'Certificado de Origen Nacional',
        descripcion: 'Certifica que el producto es de origen 100% colombiano, cultivado en territorio nacional',
        entidadCertificadora: 'ICA - Instituto Colombiano Agropecuario',
        numeroRegistro: 'ICA-OR-2024-' + siembraId,
        fechaEmision: '2024-01-15',
        fechaVencimiento: '2025-01-15',
        estado: 'Vigente',
        cobertura: 'Nacional',
        icon: Globe,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      },
      {
        id: 'CERT-002',
        tipo: 'Orgánico',
        nombre: 'Certificación Orgánica',
        descripcion: 'Producto cultivado sin pesticidas sintéticos, siguiendo prácticas orgánicas certificadas',
        entidadCertificadora: 'BioTrópico - Certificación Orgánica',
        numeroRegistro: 'BIO-ORG-' + siembraId + '-2024',
        fechaEmision: '2024-02-01',
        fechaVencimiento: '2025-02-01',
        estado: 'Vigente',
        cobertura: 'Internacional',
        icon: Leaf,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      },
      {
        id: 'CERT-003',
        tipo: 'Comercio Justo',
        nombre: 'Fair Trade Certified',
        descripcion: 'Garantiza prácticas comerciales justas y condiciones laborales dignas para los trabajadores',
        entidadCertificadora: 'Fair Trade International',
        numeroRegistro: 'FT-COL-' + siembraId,
        fechaEmision: '2024-03-10',
        fechaVencimiento: '2026-03-10',
        estado: 'Vigente',
        cobertura: 'Internacional',
        icon: Shield,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
      },
      {
        id: 'CERT-004',
        tipo: 'Calidad',
        nombre: 'Certificación de Calidad Premium',
        descripcion: 'Cumple con los más altos estándares de calidad en cultivo, cosecha y manejo post-cosecha',
        entidadCertificadora: 'SGS Colombia',
        numeroRegistro: 'SGS-CAL-2024-' + siembraId,
        fechaEmision: '2024-04-05',
        fechaVencimiento: '2024-12-31',
        estado: 'Por vencer',
        cobertura: 'Nacional e Internacional',
        icon: Award,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
      },
      {
        id: 'CERT-005',
        tipo: 'Sostenibilidad',
        nombre: 'Sello de Agricultura Sostenible',
        descripcion: 'Prácticas agrícolas que preservan el medio ambiente y promueven la biodiversidad',
        entidadCertificadora: 'Rainforest Alliance',
        numeroRegistro: 'RA-SUS-' + siembraId + '-COL',
        fechaEmision: '2024-05-20',
        fechaVencimiento: '2027-05-20',
        estado: 'Vigente',
        cobertura: 'Internacional',
        icon: Globe,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200'
      },
      {
        id: 'CERT-006',
        tipo: 'Ética Laboral',
        nombre: 'Certificación de Responsabilidad Social',
        descripcion: 'Garantiza el cumplimiento de normas laborales, seguridad en el trabajo y bienestar de empleados',
        entidadCertificadora: 'SA8000 - Social Accountability International',
        numeroRegistro: 'SA-ETH-2024-' + siembraId,
        fechaEmision: '2024-06-15',
        fechaVencimiento: '2025-06-15',
        estado: 'Vigente',
        cobertura: 'Internacional',
        icon: Shield,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      }
    ];
  };

  const selectedData = selectedSiembraId ? getTrazabilidad(selectedSiembraId) : null;
  const certificados = selectedSiembraId ? getCertificadosForLote(selectedSiembraId) : [];

  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case 'Vigente':
        return 'bg-green-100 text-green-700';
      case 'Por vencer':
        return 'bg-yellow-100 text-yellow-700';
      case 'Vencido':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-3 rounded-lg">
            <Award className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-gray-900">Certificados de Calidad y Origen</h2>
            <p className="text-sm text-gray-600">Certificaciones de productos agrícolas por lote</p>
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
                const certCount = getCertificadosForLote(siembra.id).length;
                const certVigentes = getCertificadosForLote(siembra.id).filter(c => c.estado === 'Vigente').length;

                return (
                  <button
                    key={siembra.id}
                    onClick={() => setSelectedSiembraId(siembra.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-red-50 border-l-4 border-red-600' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{siembra.tipoCultivo}</h4>
                        <p className="text-sm text-gray-600 mb-2">{siembra.codigoLote}</p>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-red-600" />
                          <span className="text-gray-600">
                            {certVigentes}/{certCount} certificados vigentes
                          </span>
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

        {/* Panel de Certificados */}
        <div className="lg:col-span-2 space-y-6">
          {selectedData && selectedData.siembra ? (
            <>
              {/* Info del Lote */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-900 mb-4">
                  Certificados: {selectedData.siembra.tipoCultivo} - {selectedData.siembra.codigoLote}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Certificados</p>
                    <p className="text-2xl text-gray-900">{certificados.length}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Vigentes</p>
                    <p className="text-2xl text-green-600">
                      {certificados.filter(c => c.estado === 'Vigente').length}
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Por Vencer</p>
                    <p className="text-2xl text-yellow-600">
                      {certificados.filter(c => c.estado === 'Por vencer').length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lista de Certificados */}
              <div className="space-y-4">
                {certificados.map((cert) => {
                  const Icon = cert.icon;
                  return (
                    <div
                      key={cert.id}
                      className={`bg-white rounded-lg shadow-md border-2 ${cert.borderColor} overflow-hidden`}
                    >
                      <div className={`${cert.bgColor} p-4 border-b ${cert.borderColor}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-3 flex-1">
                            <div className={`${cert.bgColor} p-3 rounded-lg border ${cert.borderColor}`}>
                              <Icon className={`w-6 h-6 ${cert.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-gray-900">{cert.nombre}</h4>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs ${getEstadoBadgeColor(cert.estado)}`}>
                                  {cert.estado}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{cert.descripcion}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              alert('Función de descarga de certificado en desarrollo');
                            }}
                            className={`p-2 ${cert.bgColor} ${cert.color} rounded-lg hover:opacity-80 transition-opacity`}
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Tipo:</span>
                            <p className="text-gray-900">{cert.tipo}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Número de Registro:</span>
                            <p className="text-gray-900">{cert.numeroRegistro}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Entidad Certificadora:</span>
                            <p className="text-gray-900">{cert.entidadCertificadora}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Cobertura:</span>
                            <p className="text-gray-900">{cert.cobertura}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-gray-600 mb-1">
                              <Calendar className="w-4 h-4" />
                              <span>Fecha de Emisión:</span>
                            </div>
                            <p className="text-gray-900">
                              {new Date(cert.fechaEmision).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-gray-600 mb-1">
                              <Calendar className="w-4 h-4" />
                              <span>Fecha de Vencimiento:</span>
                            </div>
                            <p className="text-gray-900">
                              {new Date(cert.fechaVencimiento).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        {cert.estado === 'Vigente' && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                            <span>Certificado válido y en vigencia</span>
                          </div>
                        )}

                        {cert.estado === 'Por vencer' && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                            <Calendar className="w-4 h-4" />
                            <span>Certificado próximo a vencer - Renovación requerida</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">Selecciona un Lote</h3>
              <p className="text-gray-500">
                Elige un lote de la lista para ver sus certificaciones
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
