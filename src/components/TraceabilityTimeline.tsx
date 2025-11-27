import { useState } from 'react';
import { Product } from '../App';
import { Sprout, Package, Truck, Warehouse, Plus, CheckCircle, Circle } from 'lucide-react';
import { StageForm } from './StageForm';

interface TraceabilityTimelineProps {
  product: Product;
  onUpdateProduct: (product: Product) => void;
}

export function TraceabilityTimeline({ product, onUpdateProduct }: TraceabilityTimelineProps) {
  const [editingStage, setEditingStage] = useState<string | null>(null);

  const stages = [
    {
      id: 'siembra',
      title: 'Siembra',
      icon: Sprout,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      completed: !!product.siembra,
      data: product.siembra
    },
    {
      id: 'cosecha',
      title: 'Cosecha',
      icon: Package,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      completed: !!product.cosecha,
      data: product.cosecha
    },
    {
      id: 'transporte',
      title: 'Transporte',
      icon: Truck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      completed: !!product.transporte,
      data: product.transporte
    },
    {
      id: 'acopio',
      title: 'Acopio',
      icon: Warehouse,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      completed: !!product.acopio,
      data: product.acopio
    }
  ];

  const handleSaveStage = (stageId: string, data: any) => {
    const updatedProduct = {
      ...product,
      [stageId]: data
    };
    onUpdateProduct(updatedProduct);
    setEditingStage(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-gray-900 mb-2">Trazabilidad: {product.nombre}</h2>
      <p className="text-sm text-gray-600 mb-6">Lote: {product.lote}</p>

      <div className="space-y-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isEditing = editingStage === stage.id;
          
          return (
            <div key={stage.id} className="relative">
              {/* Timeline line */}
              {index < stages.length - 1 && (
                <div className={`absolute left-5 top-12 w-0.5 h-full ${
                  stage.completed ? 'bg-green-600' : 'bg-gray-300'
                }`}></div>
              )}

              <div className={`relative ${isEditing ? 'ring-2 ring-green-500 rounded-lg' : ''}`}>
                {/* Stage header */}
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50">
                  <div className={`${stage.bgColor} p-2 rounded-full ${stage.completed ? 'ring-2 ring-offset-2 ring-green-600' : ''}`}>
                    <Icon className={`w-6 h-6 ${stage.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900">{stage.title}</h3>
                      {stage.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <button
                          onClick={() => setEditingStage(stage.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Agregar
                        </button>
                      )}
                    </div>

                    {/* Stage data */}
                    {stage.completed && stage.data && (
                      <div className="bg-gray-50 rounded-md p-3 space-y-1 text-sm">
                        {Object.entries(stage.data).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-gray-900">
                              {typeof value === 'number' ? value.toLocaleString() : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Edit form */}
                    {isEditing && (
                      <div className="mt-3">
                        <StageForm
                          stageId={stage.id}
                          onSave={(data) => handleSaveStage(stage.id, data)}
                          onCancel={() => setEditingStage(null)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
