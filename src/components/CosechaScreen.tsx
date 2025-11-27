import { useState } from 'react';
import { CosechaData, SiembraData } from '../App';
import { Package, Plus, Edit, Save, X, ImageIcon } from 'lucide-react';

interface CosechaScreenProps {
  cosechas: CosechaData[];
  siembras: SiembraData[];
  onAddCosecha: (cosecha: CosechaData) => void;
  onUpdateCosecha: (cosecha: CosechaData) => void;
}

export function CosechaScreen({ cosechas, siembras, onAddCosecha, onUpdateCosecha }: CosechaScreenProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CosechaData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      onUpdateCosecha({ ...formData, id: editingId } as CosechaData);
      setEditingId(null);
    } else {
      const newCosecha: CosechaData = {
        id: `C${Date.now()}`,
        ...formData
      } as CosechaData;
      onAddCosecha(newCosecha);
      setIsAdding(false);
    }
    
    setFormData({});
  };

  const handleEdit = (cosecha: CosechaData) => {
    setFormData(cosecha);
    setEditingId(cosecha.id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Planificada': return 'bg-blue-100 text-blue-700';
      case 'En proceso': return 'bg-yellow-100 text-yellow-700';
      case 'Completada': return 'bg-green-100 text-green-700';
      case 'En almacén': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Gestión de Cosecha</h2>
              <p className="text-sm text-gray-600">Registro de cosechas y almacenamiento</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nueva Cosecha
          </button>
        </div>
      </div>

      {/* Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 mb-4">
            {editingId ? 'Editar Cosecha' : 'Nueva Cosecha'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Código de Lote Cosecha *</label>
              <input
                type="text"
                required
                value={formData.codigoLoteCosecha || ''}
                onChange={(e) => setFormData({ ...formData, codigoLoteCosecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="COS-2024-001"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Lote de Siembra *</label>
              <select
                required
                value={formData.idSiembra || ''}
                onChange={(e) => setFormData({ ...formData, idSiembra: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Seleccionar lote</option>
                {siembras.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.codigoLote} - {s.tipoCultivo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fecha de Cosecha *</label>
              <input
                type="date"
                required
                value={formData.fechaCosecha || ''}
                onChange={(e) => setFormData({ ...formData, fechaCosecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Estado *</label>
              <select
                required
                value={formData.estado || ''}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Seleccionar</option>
                <option value="Planificada">Planificada</option>
                <option value="En proceso">En proceso</option>
                <option value="Completada">Completada</option>
                <option value="En almacén">En almacén</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Cantidad Cosechada (kg) *</label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.cantidadCosechada || ''}
                onChange={(e) => setFormData({ ...formData, cantidadCosechada: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Método de Cosecha *</label>
              <select
                required
                value={formData.metodoCosecha || ''}
                onChange={(e) => setFormData({ ...formData, metodoCosecha: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Seleccionar</option>
                <option value="Manual">Manual</option>
                <option value="Mecanizada">Mecanizada</option>
                <option value="Mixta">Mixta</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Condiciones Climáticas *</label>
              <select
                required
                value={formData.condicionesClimaticas || ''}
                onChange={(e) => setFormData({ ...formData, condicionesClimaticas: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Seleccionar</option>
                <option value="Soleado">Soleado</option>
                <option value="Nublado">Nublado</option>
                <option value="Lluvia">Lluvia</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Tipo de Almacenamiento *</label>
              <select
                required
                value={formData.tipoAlmacenamiento || ''}
                onChange={(e) => setFormData({ ...formData, tipoAlmacenamiento: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Seleccionar</option>
                <option value="Ambiente">Ambiente</option>
                <option value="Refrigerado">Refrigerado</option>
                <option value="Controlado">Controlado</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Tratamiento Post-Cosecha *</label>
              <select
                required
                value={formData.tratamientoPostCosecha || ''}
                onChange={(e) => setFormData({ ...formData, tratamientoPostCosecha: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Seleccionar</option>
                <option value="Lavado">Lavado</option>
                <option value="Clasificación">Clasificación</option>
                <option value="Encerado">Encerado</option>
                <option value="Ninguno">Ninguno</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fotos del Producto (URL)</label>
              <input
                type="text"
                value={formData.fotosProducto || ''}
                onChange={(e) => setFormData({ ...formData, fotosProducto: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Herramientas/Equipo Utilizado *</label>
              <textarea
                required
                value={formData.herramientasEquipo || ''}
                onChange={(e) => setFormData({ ...formData, herramientasEquipo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={2}
                placeholder="Describe las herramientas y equipos utilizados"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Observaciones *</label>
              <textarea
                required
                value={formData.observaciones || ''}
                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={3}
                placeholder="Observaciones generales sobre la cosecha"
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
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
          <h3 className="text-gray-900">Cosechas Registradas ({cosechas.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {cosechas.map((cosecha) => {
            const siembra = siembras.find(s => s.id === cosecha.idSiembra);
            return (
              <div key={cosecha.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-gray-900">{cosecha.codigoLoteCosecha}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs ${getEstadoColor(cosecha.estado)}`}>
                        {cosecha.estado}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Lote de siembra: {siembra?.codigoLote} - {siembra?.tipoCultivo}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Fecha:</span>
                        <p className="text-gray-900">{new Date(cosecha.fechaCosecha).toLocaleDateString('es-ES')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Cantidad:</span>
                        <p className="text-gray-900">{cosecha.cantidadCosechada.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Método:</span>
                        <p className="text-gray-900">{cosecha.metodoCosecha}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Almacenamiento:</span>
                        <p className="text-gray-900">{cosecha.tipoAlmacenamiento}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(cosecha)}
                    className="ml-4 p-2 text-yellow-600 hover:bg-yellow-50 rounded-md"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
          {cosechas.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No hay registros de cosecha. Haz clic en "Nueva Cosecha" para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
