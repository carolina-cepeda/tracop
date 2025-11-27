import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { SiembraScreen } from './components/SiembraScreen';
import { CosechaScreen } from './components/CosechaScreen';
import { TransporteScreen } from './components/TransporteScreen';
import { AcopioScreen } from './components/AcopioScreen';
import { TrazabilidadScreen } from './components/TrazabilidadScreen';
import { Sprout, Package, Truck, Warehouse, LayoutDashboard, GitBranch } from 'lucide-react';

export interface SiembraData {
  id: string;
  codigoLote: string;
  fechaSiembra: string;
  estado: 'En curso' | 'Completada' | 'Cancelada';
  tipoCultivo: string;
  fertilizantesAplicados: string;
  metodoSiembra: 'Manual' | 'Mecanizada' | 'Directa' | 'Transplante';
  fechaEstimadaCosecha: string;
}

export interface CosechaData {
  id: string;
  codigoLoteCosecha: string;
  idSiembra: string;
  fechaCosecha: string;
  estado: 'Planificada' | 'En proceso' | 'Completada' | 'En almacén';
  cantidadCosechada: number;
  metodoCosecha: 'Manual' | 'Mecanizada' | 'Mixta';
  condicionesClimaticas: 'Soleado' | 'Nublado' | 'Lluvia';
  herramientasEquipo: string;
  tipoAlmacenamiento: 'Ambiente' | 'Refrigerado' | 'Controlado';
  tratamientoPostCosecha: 'Lavado' | 'Clasificación' | 'Encerado' | 'Ninguno';
  fotosProducto?: string;
  observaciones: string;
}

export interface TransporteData {
  id: string;
  idCosecha: string;
  estado: 'Programado' | 'En tránsito' | 'Cancelado' | 'Incidente';
  tipoTransporte: 'Terrestre refrigerado' | 'Mixto';
  empresaTransportista: string;
  telefonoContacto: string;
  placaVehiculo: string;
  tipoVehiculo: 'Camión' | 'Camioneta' | 'Furgón' | 'Contenedor';
  sistemaRefrigeracion: boolean;
  direccionOrigen: string;
  direccionDestino: string;
  descripcion: string;
  numeroContenedores: number;
  fechaHoraCarga: string;
  fechaHoraLlegada: string;
  condicionProductoCarga: 'Excelente' | 'Buena' | 'Aceptable' | 'Mala';
}

export interface AcopioData {
  id: string;
  idTransporte: string;
  idCosecha: string;
  fechaHoraRecepcion: string;
  estado: 'Recibido' | 'En inspección' | 'Almacenado' | 'Clasificado' | 'Despachado' | 'Rechazado';
  productoRecibido: string;
  cantidadRealRecibida: number;
  nivelCalidad: 'Excelente' | 'Buena' | 'Regular' | 'Mala' | 'Rechazada';
  categoriaAsignada: 'Extra' | 'Primera' | 'Segunda' | 'Tercera' | 'Descarte';
  tratamientosAplicados: string[];
  productosAplicados: string;
}

export interface LoteCompleto {
  siembra?: SiembraData;
  cosecha?: CosechaData;
  transporte?: TransporteData;
  acopio?: AcopioData;
}

// Datos de ejemplo
const initialSiembras: SiembraData[] = [
  {
    id: 'S001',
    codigoLote: 'LOT-2024-001',
    fechaSiembra: '2024-09-15',
    estado: 'Completada',
    tipoCultivo: 'Tomate Cherry',
    fertilizantesAplicados: 'NPK 15-15-15, Compost orgánico',
    metodoSiembra: 'Transplante',
    fechaEstimadaCosecha: '2024-11-20'
  },
  {
    id: 'S002',
    codigoLote: 'LOT-2024-002',
    fechaSiembra: '2024-10-01',
    estado: 'En curso',
    tipoCultivo: 'Lechuga Romana',
    fertilizantesAplicados: 'Fertilizante orgánico',
    metodoSiembra: 'Directa',
    fechaEstimadaCosecha: '2024-12-01'
  }
];

const initialCosechas: CosechaData[] = [
  {
    id: 'C001',
    codigoLoteCosecha: 'COS-2024-001',
    idSiembra: 'S001',
    fechaCosecha: '2024-11-20',
    estado: 'Completada',
    cantidadCosechada: 3500,
    metodoCosecha: 'Manual',
    condicionesClimaticas: 'Soleado',
    herramientasEquipo: 'Tijeras de podar, canastas de recolección',
    tipoAlmacenamiento: 'Refrigerado',
    tratamientoPostCosecha: 'Lavado',
    observaciones: 'Cosecha de excelente calidad'
  }
];

const initialTransportes: TransporteData[] = [
  {
    id: 'T001',
    idCosecha: 'C001',
    estado: 'En tránsito',
    tipoTransporte: 'Terrestre refrigerado',
    empresaTransportista: 'TransAgro S.A.',
    telefonoContacto: '+57 300 123 4567',
    placaVehiculo: 'ABC-123',
    tipoVehiculo: 'Camión',
    sistemaRefrigeracion: true,
    direccionOrigen: 'Campo Norte - Parcela 12',
    direccionDestino: 'Centro de Acopio Principal, Calle 45 #23-10',
    descripcion: 'Transporte de tomate cherry',
    numeroContenedores: 2,
    fechaHoraCarga: '2024-11-21T08:00',
    fechaHoraLlegada: '2024-11-21T14:00',
    condicionProductoCarga: 'Excelente'
  }
];

const initialAcopios: AcopioData[] = [];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'siembra' | 'cosecha' | 'transporte' | 'acopio' | 'trazabilidad'>('dashboard');
  const [siembras, setSiembras] = useState<SiembraData[]>(initialSiembras);
  const [cosechas, setCosechas] = useState<CosechaData[]>(initialCosechas);
  const [transportes, setTransportes] = useState<TransporteData[]>(initialTransportes);
  const [acopios, setAcopios] = useState<AcopioData[]>(initialAcopios);

  const screens = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-600' },
    { id: 'trazabilidad', label: 'Trazabilidad', icon: GitBranch, color: 'text-indigo-600' },
    { id: 'siembra', label: 'Siembra', icon: Sprout, color: 'text-green-600' },
    { id: 'cosecha', label: 'Cosecha', icon: Package, color: 'text-yellow-600' },
    { id: 'transporte', label: 'Transporte', icon: Truck, color: 'text-orange-600' },
    { id: 'acopio', label: 'Acopio', icon: Warehouse, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Sprout className="w-8 h-8" />
            <div>
              <h1 className="text-2xl">AgroTrace</h1>
              <p className="text-green-100 text-sm">Sistema de Trazabilidad Agrícola</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {screens.map((screen) => {
              const Icon = screen.icon;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(screen.id as any)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    activeScreen === screen.id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{screen.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeScreen === 'dashboard' && (
          <Dashboard 
            siembras={siembras}
            cosechas={cosechas}
            transportes={transportes}
            acopios={acopios}
          />
        )}

        {activeScreen === 'trazabilidad' && (
          <TrazabilidadScreen 
            siembras={siembras}
            cosechas={cosechas}
            transportes={transportes}
            acopios={acopios}
          />
        )}
        
        {activeScreen === 'siembra' && (
          <SiembraScreen 
            siembras={siembras}
            onAddSiembra={(siembra) => setSiembras([...siembras, siembra])}
            onUpdateSiembra={(updated) => setSiembras(siembras.map(s => s.id === updated.id ? updated : s))}
          />
        )}

        {activeScreen === 'cosecha' && (
          <CosechaScreen 
            cosechas={cosechas}
            siembras={siembras}
            onAddCosecha={(cosecha) => setCosechas([...cosechas, cosecha])}
            onUpdateCosecha={(updated) => setCosechas(cosechas.map(c => c.id === updated.id ? updated : c))}
          />
        )}

        {activeScreen === 'transporte' && (
          <TransporteScreen 
            transportes={transportes}
            cosechas={cosechas}
            onAddTransporte={(transporte) => setTransportes([...transportes, transporte])}
            onUpdateTransporte={(updated) => setTransportes(transportes.map(t => t.id === updated.id ? updated : t))}
          />
        )}

        {activeScreen === 'acopio' && (
          <AcopioScreen 
            acopios={acopios}
            transportes={transportes}
            cosechas={cosechas}
            onAddAcopio={(acopio) => setAcopios([...acopios, acopio])}
            onUpdateAcopio={(updated) => setAcopios(acopios.map(a => a.id === updated.id ? updated : a))}
          />
        )}
      </main>
    </div>
  );
}
