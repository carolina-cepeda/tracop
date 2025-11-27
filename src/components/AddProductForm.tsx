import { useState } from 'react';
import { Product } from '../App';
import { Save, Package } from 'lucide-react';

interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
}

export function AddProductForm({ onAddProduct }: AddProductFormProps) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [lote, setLote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      nombre,
      tipo,
      lote
    };

    onAddProduct(newProduct);
    
    // Reset form
    setNombre('');
    setTipo('');
    setLote('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-lg">
            <Package className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-gray-900">Nuevo Producto</h2>
            <p className="text-sm text-gray-600">
              Registra un nuevo producto para comenzar su trazabilidad
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Tomate Cherry, Aguacate Hass"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Tipo de Producto *
            </label>
            <select
              required
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Seleccionar tipo</option>
              <option value="Hortalizas">Hortalizas</option>
              <option value="Frutas">Frutas</option>
              <option value="Granos">Granos</option>
              <option value="Tubérculos">Tubérculos</option>
              <option value="Legumbres">Legumbres</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Número de Lote *
            </label>
            <input
              type="text"
              required
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              placeholder="Ej: LOT-2024-001"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Identificador único para este lote de producto
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> Después de crear el producto, podrás agregar la información de cada etapa (siembra, cosecha, transporte y acopio) desde la sección de Productos.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              Crear Producto
            </button>
          </div>
        </form>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-gray-900 mb-2">¿Qué es la trazabilidad?</h3>
          <p className="text-sm text-gray-600">
            La trazabilidad permite seguir el recorrido completo de un producto agrícola desde la siembra hasta el acopio, garantizando transparencia y calidad.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-gray-900 mb-2">Etapas del proceso</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>1. Siembra - Datos de plantación</li>
            <li>2. Cosecha - Recolección del producto</li>
            <li>3. Transporte - Traslado a bodega</li>
            <li>4. Acopio - Almacenamiento final</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
