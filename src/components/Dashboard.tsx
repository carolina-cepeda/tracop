import { SiembraData, CosechaData, TransporteData, AcopioData } from '../App';
import { Sprout, Package, Truck, Warehouse, TrendingUp, Calendar } from 'lucide-react';

interface DashboardProps {
  siembras: SiembraData[];
  cosechas: CosechaData[];
  transportes: TransporteData[];
  acopios: AcopioData[];
}

export function Dashboard({ siembras, cosechas, transportes, acopios }: DashboardProps) {
  const stats = {
    totalSiembras: siembras.length,
    siembrasActivas: siembras.filter(s => s.estado === 'En curso').length,
    totalCosechas: cosechas.length,
    totalCosechado: cosechas.reduce((sum, c) => sum + c.cantidadCosechada, 0),
    transportesActivos: transportes.filter(t => t.estado === 'En tránsito').length,
    totalAcopios: acopios.length,
  };

  const cards = [
    {
      title: 'Siembras Activas',
      value: stats.siembrasActivas,
      icon: Sprout,
      color: 'bg-green-500',
      detail: `${stats.totalSiembras} total`
    },
    {
      title: 'Cosechas',
      value: stats.totalCosechas,
      icon: Package,
      color: 'bg-yellow-500',
      detail: `${stats.totalCosechado.toLocaleString()} kg total`
    },
    {
      title: 'En Transporte',
      value: stats.transportesActivos,
      icon: Truck,
      color: 'bg-orange-500',
      detail: 'En tránsito'
    },
    {
      title: 'Recepciones',
      value: stats.totalAcopios,
      icon: Warehouse,
      color: 'bg-purple-500',
      detail: 'En centro de acopio'
    },
  ];

  // Actividad reciente
  const recentActivity = [
    ...siembras.map(s => ({ type: 'Siembra', data: s, date: s.fechaSiembra })),
    ...cosechas.map(c => ({ type: 'Cosecha', data: c, date: c.fechaCosecha })),
    ...transportes.map(t => ({ type: 'Transporte', data: t, date: t.fechaHoraCarga })),
    ...acopios.map(a => ({ type: 'Acopio', data: a, date: a.fechaHoraRecepcion })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{card.title}</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl text-gray-900">{card.value}</p>
                <span className="text-sm text-gray-500">{card.detail}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900">Actividad Reciente</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600">
                    {activity.type === 'Siembra' && (activity.data as SiembraData).codigoLote}
                    {activity.type === 'Cosecha' && (activity.data as CosechaData).codigoLoteCosecha}
                    {activity.type === 'Transporte' && (activity.data as TransporteData).empresaTransportista}
                    {activity.type === 'Acopio' && (activity.data as AcopioData).productoRecibido}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estado de Siembras */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-gray-900 mb-4">Estado de Siembras</h2>
          <div className="space-y-4">
            {Object.entries(
              siembras.reduce((acc, s) => {
                acc[s.estado] = (acc[s.estado] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([estado, count]) => {
              const percentage = (count / siembras.length) * 100;
              return (
                <div key={estado}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{estado}</span>
                    <span className="text-gray-600">{count} lotes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
