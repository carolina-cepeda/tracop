import { useState } from 'react';
import { TransporteData, CosechaData } from '../App';
import { Truck, Plus, Edit, Save, X } from 'lucide-react';

interface TransporteScreenProps {
  transportes: TransporteData[];
  cosechas: CosechaData[];
  onAddTransporte: (transporte: TransporteData) => void;
  onUpdateTransporte: (transporte: TransporteData) => void;
}

export function TransporteScreen({ transportes, cosechas, onAddTransporte, onUpdateTransporte }: TransporteScreenProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TransporteData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      onUpdateTransporte({ ...formData, id: editingId } as TransporteData);
      setEditingId(null);
    } else {
      const newTransporte: TransporteData = {
        id: `T${Date.now()}`,
        ...formData
      } as TransporteData;
      onAddTransporte(newTransporte);
      setIsAdding(false);
    }
    
    setFormData({});
  };

  const handleEdit = (transporte: TransporteData) => {
    setFormData(transporte);
    setEditingId(transporte.id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Programado': return 'bg-blue-100 text-blue-700';
      case 'En tránsito': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelado': return 'bg-red-100 text-red-700';
      case 'Incidente': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Truck className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Gestión de Transporte</h2>
              <p className="text-sm text-gray-600">Control de traslados y logística</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo Transporte
          </button>
        </div>
      </div>

      {/* Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 mb-4">
            {editingId ? 'Editar Transporte' : 'Nuevo Transporte'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Cosecha *</label>
              <select
                required
                value={formData.idCosecha || ''}
                onChange={(e) => setFormData({ ...formData, idCosecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccionar cosecha</option>
                {cosechas.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.codigoLoteCosecha} - {c.cantidadCosechada} kg
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Estado *</label>
              <select
                required
                value={formData.estado || ''}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccionar</option>
                <option value="Programado">Programado</option>
                <option value="En tránsito">En tránsito</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Incidente">Incidente</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Tipo de Transporte *</label>
              <select
                required
                value={formData.tipoTransporte || ''}
                onChange={(e) => setFormData({ ...formData, tipoTransporte: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccionar</option>
                <option value="Terrestre refrigerado">Terrestre refrigerado</option>
                <option value="Mixto">Mixto</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Empresa Transportista *</label>
              <input
                type="text"
                required
                value={formData.empresaTransportista || ''}
                onChange={(e) => setFormData({ ...formData, empresaTransportista: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Nombre de la empresa"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Teléfono de Contacto *</label>
              <input
                type="tel"
                required
                value={formData.telefonoContacto || ''}
                onChange={(e) => setFormData({ ...formData, telefonoContacto: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="+57 300 123 4567"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Placa del Vehículo *</label>
              <input
                type="text"
                required
                value={formData.placaVehiculo || ''}
                onChange={(e) => setFormData({ ...formData, placaVehiculo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="ABC-123"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Tipo de Vehículo *</label>
              <select
                required
                value={formData.tipoVehiculo || ''}
                onChange={(e) => setFormData({ ...formData, tipoVehiculo: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccionar</option>
                <option value="Camión">Camión</option>
                <option value="Camioneta">Camioneta</option>
                <option value="Furgón">Furgón</option>
                <option value="Contenedor">Contenedor</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Sistema de Refrigeración *</label>
              <select
                required
                value={formData.sistemaRefrigeracion === undefined ? '' : formData.sistemaRefrigeracion.toString()}
                onChange={(e) => setFormData({ ...formData, sistemaRefrigeracion: e.target.value === 'true' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccionar</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Dirección de Origen *</label>
              <input
                type="text"
                required
                value={formData.direccionOrigen || ''}
                onChange={(e) => setFormData({ ...formData, direccionOrigen: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Ubicación de origen"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Dirección de Destino *</label>
              <input
                type="text"
                required
                value={formData.direccionDestino || ''}
                onChange={(e) => setFormData({ ...formData, direccionDestino: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Ubicación de destino"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Número de Contenedores *</label>
              <input
                type="number"
                required
                value={formData.numeroContenedores || ''}
                onChange={(e) => setFormData({ ...formData, numeroContenedores: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fecha y Hora de Carga *</label>
              <input
                type="datetime-local"
                required
                value={formData.fechaHoraCarga || ''}
                onChange={(e) => setFormData({ ...formData, fechaHoraCarga: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fecha y Hora de Llegada *</label>
              <input
                type="datetime-local"
                required
                value={formData.fechaHoraLlegada || ''}
                onChange={(e) => setFormData({ ...formData, fechaHoraLlegada: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Condición del Producto al Cargar *</label>
              <select
                required
                value={formData.condicionProductoCarga || ''}
                onChange={(e) => setFormData({ ...formData, condicionProductoCarga: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccionar</option>
                <option value="Excelente">Excelente</option>
                <option value="Buena">Buena</option>
                <option value="Aceptable">Aceptable</option>
                <option value="Mala">Mala</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Descripción *</label>
              <textarea
                required
                value={formData.descripcion || ''}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
                placeholder="Detalles adicionales del transporte"
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Actualizar' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Transportes Registrados ({transportes.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {transportes.map((transporte) => {
            const cosecha = cosechas.find(c => c.id === transporte.idCosecha);
            return (
              <div key={transporte.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-gray-900">{transporte.empresaTransportista}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs ${getEstadoColor(transporte.estado)}`}>
                        {transporte.estado}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Cosecha: {cosecha?.codigoLoteCosecha} | Vehículo: {transporte.tipoVehiculo} - {transporte.placaVehiculo}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Origen:</span>
                        <p className="text-gray-900">{transporte.direccionOrigen}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Destino:</span>
                        <p className="text-gray-900">{transporte.direccionDestino}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Carga:</span>
                        <p className="text-gray-900">{new Date(transporte.fechaHoraCarga).toLocaleString('es-ES')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Refrigeración:</span>
                        <p className="text-gray-900">{transporte.sistemaRefrigeracion ? 'Sí' : 'No'}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(transporte)}
                    className="ml-4 p-2 text-orange-600 hover:bg-orange-50 rounded-md"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
          {transportes.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No hay registros de transporte. Haz clic en "Nuevo Transporte" para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
