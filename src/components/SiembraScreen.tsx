import { useState } from 'react';
import { SiembraData } from '../App';
import { Sprout, Plus, Edit, Save, X } from 'lucide-react';

interface SiembraScreenProps {
  siembras: SiembraData[];
  onAddSiembra: (siembra: SiembraData) => void;
  onUpdateSiembra: (siembra: SiembraData) => void;
}

export function SiembraScreen({ siembras, onAddSiembra, onUpdateSiembra }: SiembraScreenProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SiembraData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      onUpdateSiembra({ ...formData, id: editingId } as SiembraData);
      setEditingId(null);
    } else {
      const newSiembra: SiembraData = {
        id: `S${Date.now()}`,
        ...formData
      } as SiembraData;
      onAddSiembra(newSiembra);
      setIsAdding(false);
    }
    
    setFormData({});
  };

  const handleEdit = (siembra: SiembraData) => {
    setFormData(siembra);
    setEditingId(siembra.id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'En curso': return 'bg-blue-100 text-blue-700';
      case 'Completada': return 'bg-green-100 text-green-700';
      case 'Cancelada': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Sprout className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Gestión de Siembra</h2>
              <p className="text-sm text-gray-600">Registro y seguimiento de lotes sembrados</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nueva Siembra
          </button>
        </div>
      </div>

      {/* Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 mb-4">
            {editingId ? 'Editar Siembra' : 'Nueva Siembra'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Código de Lote *</label>
              <input
                type="text"
                required
                value={formData.codigoLote || ''}
                onChange={(e) => setFormData({ ...formData, codigoLote: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="LOT-2024-001"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fecha de Siembra *</label>
              <input
                type="date"
                required
                value={formData.fechaSiembra || ''}
                onChange={(e) => setFormData({ ...formData, fechaSiembra: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Estado *</label>
              <select
                required
                value={formData.estado || ''}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar</option>
                <option value="En curso">En curso</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Tipo de Cultivo *</label>
              <input
                type="text"
                required
                value={formData.tipoCultivo || ''}
                onChange={(e) => setFormData({ ...formData, tipoCultivo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ej: Tomate Cherry"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Método de Siembra *</label>
              <select
                required
                value={formData.metodoSiembra || ''}
                onChange={(e) => setFormData({ ...formData, metodoSiembra: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar</option>
                <option value="Manual">Manual</option>
                <option value="Mecanizada">Mecanizada</option>
                <option value="Directa">Directa</option>
                <option value="Transplante">Transplante</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fecha Estimada de Cosecha *</label>
              <input
                type="date"
                required
                value={formData.fechaEstimadaCosecha || ''}
                onChange={(e) => setFormData({ ...formData, fechaEstimadaCosecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Fertilizantes Aplicados *</label>
              <textarea
                required
                value={formData.fertilizantesAplicados || ''}
                onChange={(e) => setFormData({ ...formData, fertilizantesAplicados: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
                placeholder="Describe los fertilizantes y productos aplicados"
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
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
          <h3 className="text-gray-900">Lotes Registrados ({siembras.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {siembras.map((siembra) => (
            <div key={siembra.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-gray-900">{siembra.tipoCultivo}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs ${getEstadoColor(siembra.estado)}`}>
                      {siembra.estado}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Lote:</span>
                      <p className="text-gray-900">{siembra.codigoLote}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Fecha Siembra:</span>
                      <p className="text-gray-900">{new Date(siembra.fechaSiembra).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Método:</span>
                      <p className="text-gray-900">{siembra.metodoSiembra}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Cosecha Estimada:</span>
                      <p className="text-gray-900">{new Date(siembra.fechaEstimadaCosecha).toLocaleDateString('es-ES')}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="text-gray-600">Fertilizantes:</span>
                    <p className="text-gray-900">{siembra.fertilizantesAplicados}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(siembra)}
                  className="ml-4 p-2 text-green-600 hover:bg-green-50 rounded-md"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {siembras.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No hay registros de siembra. Haz clic en "Nueva Siembra" para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
