
import React from 'react';
import { Card } from '../ui/Card';
import { Trophy, TrendingUp, TrendingDown, Eye, DollarSign } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';

const ProductCard = ({ label, product, value, sub, icon: Icon, color, isNegative }) => (
    <div className="bg-white p-3 rounded-xl border border-border flex flex-col justify-between min-h-[90px] shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-default">
        <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-bold uppercase text-gray-600 tracking-wide">{label}</span>
            <Icon className={`w-3.5 h-3.5 ${color}`} />
        </div>
        <div>
            <h4 className="text-sm font-bold text-gray-900 truncate" title={product}>{product}</h4>
            <div className={`text-xs font-semibold mt-0.5 ${isNegative ? 'text-red-600' : 'text-gray-600'}`}>
                {value} <span className="font-normal text-gray-400 ml-1">{sub}</span>
            </div>
        </div>
    </div>
);

const productsData = [
    { name: 'Bife Ancho Premium', category: 'Carnes', conversion: '26%', revenue: 'R$ 7.800' },
    { name: 'Risoto de Camarão', category: 'Pratos', conversion: '25%', revenue: 'R$ 5.200' },
    { name: 'Vinho Malbec', category: 'Bebidas', conversion: '40%', revenue: 'R$ 9.600' },
    { name: 'Petit Gateau', category: 'Sobremesas', conversion: '7.5%', revenue: 'R$ 1.350' },
    { name: 'Salada Ceasar', category: 'Entradas', conversion: '8%', revenue: 'R$ 420' },
];

export default function ProductPerformance() {
    return (
        <Card className="border-none shadow-none bg-transparent">

            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-gray-900 rounded-full"></span>
                Performance de Produtos
            </h3>

            {/* 2.3 a) Highlight Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-4 mb-6">
                <ProductCard
                    label="Mais Vendido"
                    product="Bife Ancho"
                    value="120 un."
                    icon={Trophy}
                    color="text-amber-500"
                />
                <ProductCard
                    label="Maior Margem"
                    product="Vinho Malbec"
                    value="65%"
                    sub="mg."
                    icon={DollarSign}
                    color="text-green-500"
                />
                <ProductCard
                    label="Queda Vendas"
                    product="Petit Gateau"
                    value="-15%"
                    sub="vs sem."
                    isNegative={true}
                    icon={TrendingDown}
                    color="text-red-500"
                />
                <ProductCard
                    label="Mais Visualizado"
                    product="Salada Ceasar"
                    value="600"
                    sub="views"
                    icon={Eye}
                    color="text-blue-500"
                />
            </div>

            {/* 2.3 b) Detailed Table */}
            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto w-full">
                    <Table>
                        <TableHeader className="bg-background">
                            <TableRow className="border-b border-border hover:bg-background">
                                <TableHead className="h-9 text-xs font-bold text-muted-foreground uppercase w-[40%] pl-4 whitespace-nowrap">Produto</TableHead>
                                <TableHead className="h-9 text-xs font-bold text-muted-foreground uppercase hidden sm:table-cell whitespace-nowrap">Categoria</TableHead>
                                <TableHead className="h-9 text-xs font-bold text-muted-foreground uppercase text-right whitespace-nowrap">Conv.</TableHead>
                                <TableHead className="h-9 text-xs font-bold text-muted-foreground uppercase text-right pr-4 whitespace-nowrap">Receita</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productsData.map((prod, i) => (
                                <TableRow key={i} className="border-b border-muted last:border-0 hover:bg-background transition-colors">
                                    <TableCell className="py-3 font-medium text-sm text-foreground pl-4 whitespace-nowrap">{prod.name}</TableCell>
                                    <TableCell className="py-3 text-xs text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                                        <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-medium">{prod.category}</span>
                                    </TableCell>
                                    <TableCell className="py-3 text-xs font-medium text-right text-foreground whitespace-nowrap">{prod.conversion}</TableCell>
                                    <TableCell className="py-3 text-xs font-bold text-right text-foreground pr-4 whitespace-nowrap">{prod.revenue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Card>
    );
}
