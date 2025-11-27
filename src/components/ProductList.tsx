import { Product } from '../App';
import { Sprout, Package, CheckCircle, Circle } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  selectedProduct: Product | null;
}

export function ProductList({ products, onSelectProduct, selectedProduct }: ProductListProps) {
  const getCompletionStages = (product: Product) => {
    let completed = 0;
    if (product.siembra) completed++;
    if (product.cosecha) completed++;
    if (product.transporte) completed++;
    if (product.acopio) completed++;
    return { completed, total: 4 };
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-gray-900">Lista de Productos</h2>
        <p className="text-sm text-gray-600 mt-1">
          {products.length} productos registrados
        </p>
      </div>
      <div className="divide-y divide-gray-200">
        {products.map((product) => {
          const stages = getCompletionStages(product);
          const isSelected = selectedProduct?.id === product.id;
          
          return (
            <button
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className={`w-full p-6 hover:bg-gray-50 transition-colors text-left ${
                isSelected ? 'bg-green-50 border-l-4 border-green-600' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sprout className="w-5 h-5 text-green-600" />
                    <h3 className="text-gray-900">{product.nombre}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
                      {product.tipo}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                      {product.lote}
                    </span>
                  </div>
                  
                  {/* Progress */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-green-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${(stages.completed / stages.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">
                      {stages.completed}/{stages.total}
                    </span>
                  </div>
                </div>

                {/* Stage indicators */}
                <div className="flex gap-1">
                  {product.siembra ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300" />
                  )}
                  {product.cosecha ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300" />
                  )}
                  {product.transporte ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300" />
                  )}
                  {product.acopio ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
