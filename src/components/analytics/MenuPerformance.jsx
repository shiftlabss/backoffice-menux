import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/Table';
import { Eye, MousePointer, ShoppingCart, ArrowRight } from 'lucide-react';

const mockPerformanceData = [
    { id: 1, name: 'Bife Ancho Premium', category: 'Pratos Principais', views: 1240, clicks: 450, atc: 180, orders: 142, margin: 'R$ 85,00', marginPct: '65%', opportunity: 'Estrela' },
    { id: 2, name: 'Risoto de Funghi', category: 'Pratos Principais', views: 980, clicks: 320, atc: 110, orders: 89, margin: 'R$ 45,00', marginPct: '72%', opportunity: 'Normal' },
    { id: 3, name: 'Salmão Grelhado', category: 'Peixes & Frutos do Mar', views: 850, clicks: 210, atc: 60, orders: 45, margin: 'R$ 55,00', marginPct: '45%', opportunity: 'Melhorar Foto' },
    { id: 4, name: 'Petit Gateau', category: 'Sobremesas', views: 650, clicks: 180, atc: 50, orders: 40, margin: 'R$ 22,00', marginPct: '80%', opportunity: 'Alta Margem' },
    { id: 5, name: 'Suco Natural', category: 'Bebidas', views: 420, clicks: 150, atc: 130, orders: 120, margin: 'R$ 12,00', marginPct: '90%', opportunity: 'Subprecificado' },
];

const OpportunityTag = ({ type }) => {
    switch (type) {
        case 'Estrela': return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase tracking-wide">Estrela</span>;
        case 'Melhorar Foto': return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-wide">Melhorar Foto</span>;
        case 'Alta Margem': return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wide">Alta Margem</span>;
        case 'Subprecificado': return <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wide">Ajustar Preço</span>;
        default: return null;
    }
};

export default function MenuPerformance() {
    const [activeFilter, setActiveFilter] = React.useState('all');

    const filteredData = mockPerformanceData.filter(item => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'drinks') return item.category === 'Bebidas';
        if (activeFilter === 'dishes') return item.category !== 'Bebidas';
        return true;
    });

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-wine-600 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-900">Performance do Cardápio</h2>
            </div>

            <Card className="overflow-hidden">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 pb-4 border-b border-gray-100">
                    <CardTitle>Análise Detalhada por Item</CardTitle>
                    <div className="flex gap-2">
                        <Badge
                            variant={activeFilter === 'all' ? 'default' : 'outline'}
                            className={`cursor-pointer hover:bg-gray-50 ${activeFilter !== 'all' ? 'opacity-50' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            Todos
                        </Badge>
                        <Badge
                            variant={activeFilter === 'dishes' ? 'default' : 'outline'}
                            className={`cursor-pointer hover:bg-gray-50 ${activeFilter !== 'dishes' ? 'opacity-50' : ''}`}
                            onClick={() => setActiveFilter('dishes')}
                        >
                            Pratos
                        </Badge>
                        <Badge
                            variant={activeFilter === 'drinks' ? 'default' : 'outline'}
                            className={`cursor-pointer hover:bg-gray-50 ${activeFilter !== 'drinks' ? 'opacity-50' : ''}`}
                            onClick={() => setActiveFilter('drinks')}
                        >
                            Bebidas
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50">
                                <TableHead className="w-[250px]">Item / Categoria</TableHead>
                                <TableHead className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Eye className="w-3 h-3 text-gray-400" /> Vis.
                                    </div>
                                </TableHead>
                                <TableHead className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <MousePointer className="w-3 h-3 text-gray-400" /> Cliques
                                    </div>
                                </TableHead>
                                <TableHead className="text-center w-[80px]">Conv.</TableHead>
                                <TableHead className="text-right">No Carrinho</TableHead>
                                <TableHead className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <ShoppingCart className="w-3 h-3 text-gray-400" /> Pedidos
                                    </div>
                                </TableHead>
                                <TableHead className="text-right">Margem</TableHead>
                                <TableHead className="text-right">Insight</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                                    <TableCell>
                                        <div className="font-semibold text-gray-900">{item.name}</div>
                                        <div className="text-xs text-gray-500">{item.category}</div>
                                    </TableCell>
                                    <TableCell className="text-right text-gray-600">{item.views}</TableCell>
                                    <TableCell className="text-right text-gray-600">{item.clicks}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                                            {Math.round((item.clicks / item.views) * 100)}%
                                            <ArrowRight className="w-3 h-3 opacity-50" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right text-gray-600">{item.atc}</TableCell>
                                    <TableCell className="text-right font-bold text-gray-900">{item.orders}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="font-medium text-green-700">{item.margin}</div>
                                        <div className="text-xs text-green-600/70">{item.marginPct}</div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <OpportunityTag type={item.opportunity} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </section>
    );
}
