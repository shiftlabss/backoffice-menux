
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Eye, ShoppingBag, ArrowDown, ArrowUp } from 'lucide-react';
import { Badge } from '../ui/Badge';

const products = [
    { name: 'Bife Ancho Premium', views: 450, sales: 120, conversion: '26%', revenue: 'R$ 7.800', trend: 'up' },
    { name: 'Risoto de Camarão', views: 380, sales: 95, conversion: '25%', revenue: 'R$ 5.200', trend: 'up' },
    { name: 'Petit Gateau', views: 600, sales: 45, conversion: '7.5%', revenue: 'R$ 1.350', trend: 'down' },
    { name: 'Vinho Malbec', views: 200, sales: 80, conversion: '40%', revenue: 'R$ 9.600', trend: 'up' },
    { name: 'Salada Ceasar', views: 150, sales: 12, conversion: '8%', revenue: 'R$ 420', trend: 'down' },
];

export default function ProductInsights() {
    return (
        <Card className="mb-8 border-border overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-muted bg-background/50">
                <CardTitle>Performance dos Produtos</CardTitle>
                <div className="flex gap-2">
                    <Badge variant="outline" className="bg-white hover:bg-white cursor-pointer">Mais Vendidos</Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-[#E5E5E5]">Queda de Vendas</Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-[#E5E5E5]">Alta Margem</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-background hover:bg-background">
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-right"><div className="flex items-center justify-end gap-1"><Eye className="w-3 h-3" /> Views</div></TableHead>
                            <TableHead className="text-right"><div className="flex items-center justify-end gap-1"><ShoppingBag className="w-3 h-3" /> Vendas</div></TableHead>
                            <TableHead className="text-right">Conversão</TableHead>
                            <TableHead className="text-right">Receita</TableHead>
                            <TableHead className="text-right">Tendência</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((p, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                                <TableCell className="text-right text-muted-foreground">{p.views}</TableCell>
                                <TableCell className="text-right text-muted-foreground">{p.sales}</TableCell>
                                <TableCell className="text-right">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${parseFloat(p.conversion) > 20 ? 'bg-green-100 text-green-700' :
                                            parseFloat(p.conversion) < 10 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {p.conversion}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right font-medium text-foreground">{p.revenue}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end">
                                        {p.trend === 'up'
                                            ? <ArrowUp className="w-4 h-4 text-green-500" />
                                            : <ArrowDown className="w-4 h-4 text-red-500" />
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
