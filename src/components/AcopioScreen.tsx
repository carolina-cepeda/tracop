import { useState } from 'react';
import { AcopioData, TransporteData, CosechaData } from '../App';
import { Warehouse, Plus, Edit, Save, X } from 'lucide-react';

interface AcopioScreenProps {
  acopios: AcopioData[];
  transportes: TransporteData[];
  cosechas: CosechaData[];
  onAddAcopio: (acopio: AcopioData) => void;
  onUpdateAcopio: (acopio: AcopioData) => void;
}

const tratamientosDisponibles = ['Lavado', 'Desinfección', 'Encerado', 'Empaque', 'Etiquetado'];

export function AcopioScreen({ acopios, transportes, cosechas, onAddAcopio, onUpdateAcopio }: AcopioScreenProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<AcopioData>>({ tratamientosAplicados: [] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      onUpdateAcopio({ ...formData, id: editingId } as AcopioData);
      setEditingId(null);
    } else {
      const newAcopio: AcopioData = {
        id: `A${Date.now()}`,
        ...formData
      } as AcopioData;
      onAddAcopio(newAcopio);
      setIsAdding(false);
    }
    
    setFormData({ tratamientosAplicados: [] });
  };

  const handleEdit = (acopio: AcopioData) => {
    setFormData(acopio);
    setEditingId(acopio.id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ tratamientosAplicados: [] });
  };

  const toggleTratamiento = (tratamiento: string) => {
    const current = formData.tratamientosAplicados || [];
    const updated = current.includes(tratamiento)
      ? current.filter(t => t !== tratamiento)
      : [...current, tratamiento];
    setFormData({ ...formData, tratamientosAplicados: updated });
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Recibido': return 'bg-blue-100 text-blue-700';
      case 'En inspección': return 'bg-yellow-100 text-yellow-700';
      case 'Almacenado': return 'bg-green-100 text-green-700';
      case 'Clasificado': return 'bg-purple-100 text-purple-700';
      case 'Despachado': return 'bg-indigo-100 text-indigo-700';
      case 'Rechazado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Warehouse className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Centro de Acopio - Clasificación de Lote</h2>
              <p className="text-sm text-gray-600">Recepción, inspección y clasificación de productos</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nueva Recepción
          </button>
        </div>
      </div>

      {/* Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 mb-4">
            {editingId ? 'Editar Recepción' : 'Nueva Recepción'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Transporte *</label>
              <select
                required
                value={formData.idTransporte || ''}
                onChange={(e) => setFormData({ ...formData, idTransporte: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleccionar transporte</option>
                {transportes.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.id} - {t.empresaTransportista} ({t.placaVehiculo})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Cosecha *</label>
              <select
                required
                value={formData.idCosecha || ''}
                onChange={(e) => setFormData({ ...formData, idCosecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleccionar cosecha</option>
                {cosechas.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.codigoLoteCosecha}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fecha y Hora de Recepción *</label>
              <input
                type="datetime-local"
                required
                value={formData.fechaHoraRecepcion || ''}
                onChange={(e) => setFormData({ ...formData, fechaHoraRecepcion: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Estado *</label>
              <select
                required
                value={formData.estado || ''}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleccionar</option>
                <option value="Recibido">Recibido</option>
                <option value="En inspección">En inspección</option>
                <option value="Almacenado">Almacenado</option>
                <option value="Clasificado">Clasificado</option>
                <option value="Despachado">Despachado</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Producto Recibido *</label>
              <input
                type="text"
                required
                value={formData.productoRecibido || ''}
                onChange={(e) => setFormData({ ...formData, productoRecibido: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nombre del producto"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Cantidad Real Recibida (kg) *</label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.cantidadRealRecibida || ''}
                onChange={(e) => setFormData({ ...formData, cantidadRealRecibida: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Nivel de Calidad *</label>
              <select
                required
                value={formData.nivelCalidad || ''}
                onChange={(e) => setFormData({ ...formData, nivelCalidad: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleccionar</option>
                <option value="Excelente">Excelente</option>
                <option value="Buena">Buena</option>
                <option value="Regular">Regular</option>
                <option value="Mala">Mala</option>
                <option value="Rechazada">Rechazada</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Categoría Asignada *</label>
              <select
                required
                value={formData.categoriaAsignada || ''}
                onChange={(e) => setFormData({ ...formData, categoriaAsignada: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleccionar</option>
                <option value="Extra">Extra</option>
                <option value="Primera">Primera</option>
                <option value="Segunda">Segunda</option>
                <option value="Tercera">Tercera</option>
                <option value="Descarte">Descarte</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Tratamientos Aplicados *</label>
              <div className="flex flex-wrap gap-2">
                {tratamientosDisponibles.map((tratamiento) => (
                  <button
                    key={tratamiento}
                    type="button"
                    onClick={() => toggleTratamiento(tratamiento)}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      formData.tratamientosAplicados?.includes(tratamiento)
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {tratamiento}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Productos Aplicados *</label>
              <textarea
                required
                value={formData.productosAplicados || ''}
                onChange={(e) => setFormData({ ...formData, productosAplicados: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
                placeholder="Describe los productos químicos o sustancias aplicadas durante los tratamientos"
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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
          <h3 className="text-gray-900">Recepciones Registradas ({acopios.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {acopios.map((acopio) => {
            const transporte = transportes.find(t => t.id === acopio.idTransporte);
            const cosecha = cosechas.find(c => c.id === acopio.idCosecha);
            return (
              <div key={acopio.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-gray-900">{acopio.productoRecibido}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs ${getEstadoColor(acopio.estado)}`}>
                        {acopio.estado}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700">
                        {acopio.categoriaAsignada}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      ID Recepción: {acopio.id} | Cosecha: {cosecha?.codigoLoteCosecha}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Fecha Recepción:</span>
                        <p className="text-gray-900">{new Date(acopio.fechaHoraRecepcion).toLocaleString('es-ES')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Cantidad:</span>
                        <p className="text-gray-900">{acopio.cantidadRealRecibida.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Calidad:</span>
                        <p className="text-gray-900">{acopio.nivelCalidad}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Tratamientos:</span>
                        <p className="text-gray-900">{acopio.tratamientosAplicados.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(acopio)}
                    className="ml-4 p-2 text-purple-600 hover:bg-purple-50 rounded-md"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
          {acopios.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No hay registros de acopio. Haz clic en "Nueva Recepción" para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
