import { useState } from 'react';
import { Save, X } from 'lucide-react';

interface StageFormProps {
  stageId: string;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function StageForm({ stageId, onSave, onCancel }: StageFormProps) {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderFields = () => {
    switch (stageId) {
      case 'siembra':
        return (
          <>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Fecha de Siembra</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('fecha', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Ubicación</label>
              <input
                type="text"
                required
                placeholder="Campo/Parcela"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('ubicacion', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Hectáreas</label>
              <input
                type="number"
                required
                step="0.1"
                placeholder="0.0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('hectareas', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Variedad</label>
              <input
                type="text"
                required
                placeholder="Tipo de variedad"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('variedad', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Proveedor de Semillas</label>
              <input
                type="text"
                required
                placeholder="Nombre del proveedor"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('semillas', e.target.value)}
              />
            </div>
          </>
        );

      case 'cosecha':
        return (
          <>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Fecha de Cosecha</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('fecha', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Cantidad</label>
              <input
                type="number"
                required
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('cantidad', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Unidad</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('unidad', e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="kg">Kilogramos (kg)</option>
                <option value="ton">Toneladas (ton)</option>
                <option value="unidades">Unidades</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Calidad</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('calidad', e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Premium">Premium</option>
                <option value="Primera">Primera</option>
                <option value="Segunda">Segunda</option>
                <option value="Descarte">Descarte</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Número de Trabajadores</label>
              <input
                type="number"
                required
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('trabajadores', parseInt(e.target.value))}
              />
            </div>
          </>
        );

      case 'transporte':
        return (
          <>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Fecha de Transporte</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('fecha', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Origen</label>
              <input
                type="text"
                required
                placeholder="Ubicación de origen"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('origen', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Destino</label>
              <input
                type="text"
                required
                placeholder="Ubicación de destino"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('destino', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Vehículo</label>
              <input
                type="text"
                required
                placeholder="Tipo y placas"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('vehiculo', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Conductor</label>
              <input
                type="text"
                required
                placeholder="Nombre del conductor"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('conductor', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Temperatura (°C) - Opcional</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('temperatura', parseFloat(e.target.value))}
              />
            </div>
          </>
        );

      case 'acopio':
        return (
          <>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Fecha de Acopio</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('fecha', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Almacén</label>
              <input
                type="text"
                required
                placeholder="Nombre del almacén"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('almacen', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Ubicación en Bodega</label>
              <input
                type="text"
                required
                placeholder="Zona/Estante"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('ubicacionBodega', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Cantidad Recibida</label>
              <input
                type="number"
                required
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('cantidadRecibida', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Condiciones</label>
              <input
                type="text"
                required
                placeholder="Estado del producto"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleChange('condiciones', e.target.value)}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      {renderFields()}
      
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancelar
        </button>
      </div>
    </form>
  );
}
