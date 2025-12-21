import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Wine
} from 'lucide-react';
import { Button } from '../ui/Form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from '../ui/Table';
import { Badge } from '../ui/Badge';
import { formatCurrency, cn } from '../../lib/utils';
import { menuService } from '../../services/menuService';
import { toast } from 'react-hot-toast';

export default function MenuWineList({ onAdd, onEdit, onDelete }) {
    const [wines, setWines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        fetchWines();
    }, []);

    const fetchWines = async () => {
        try {
            setLoading(true);
            const data = await menuService.getWines();
            setWines(data);
        } catch (error) {
            console.error('Error fetching wines:', error);
            toast.error('Erro ao carregar carta de vinhos');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Tem certeza que deseja excluir o vinho "${name}"?`)) {
            try {
                await onDelete(id);
                setWines(wines.filter(w => w.id !== id));
                toast.success('Vinho excluído com sucesso');
            } catch (error) {
                console.error('Error deleting wine:', error);
                toast.error('Erro ao excluir vinho');
            }
        }
    };

    // Sorting & Filtering Logic
    const filteredWines = React.useMemo(() => {
        let result = wines.filter(wine => {
            const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (wine.grape && wine.grape.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesType = filterType === 'all' || wine.wine_type === filterType;
            return matchesSearch && matchesType;
        });

        // Sort logic (Mock for now to match UI)
        return result;
    }, [wines, searchTerm, filterType]);

    const getWineColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'tinto': return 'bg-red-100 text-red-800 border-red-200';
            case 'branco': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
            case 'rose': return 'bg-pink-100 text-pink-800 border-pink-200';
            case 'rosé': return 'bg-pink-100 text-pink-800 border-pink-200';
            case 'espumante': return 'bg-amber-100 text-amber-800 border-amber-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="h-full flex flex-col overflow-y-auto">
            {/* Catalog Section */}
            <div className="flex-1 flex flex-col gap-6">

                {/* Header & Filters */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Wine className="w-5 h-5" />
                                Carta de Vinhos
                            </h2>
                            <p className="text-sm text-gray-500">Gerencie sua seleção de vinhos e espumantes.</p>
                        </div>
                        <Button onClick={onAdd} className="gap-2 shadow-lg hover:shadow-primary/20 transition-all bg-gray-900 text-white hover:bg-gray-800">
                            <Plus className="h-4 w-4" />
                            Novo Vinho
                        </Button>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1 min-w-[250px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                placeholder="Buscar por nome, uva ou safra..."
                                className="w-full pl-9 h-10 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2 items-center flex-1">
                            {/* Type Filter */}
                            <div className="relative">
                                <span className="absolute -top-2 left-2 text-[10px] font-semibold text-gray-500 bg-white px-1">Tipo</span>
                                <select
                                    className="h-10 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 w-[160px]"
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                >
                                    <option value="all">Todos</option>
                                    <option value="Tinto">Tinto</option>
                                    <option value="Branco">Branco</option>
                                    <option value="Rosé">Rosé</option>
                                    <option value="Espumante">Espumante</option>
                                    <option value="Sobremesa">Sobremesa</option>
                                </select>
                            </div>

                            {/* Status Filter (Visual Match) */}
                            <div className="relative">
                                <span className="absolute -top-2 left-2 text-[10px] font-semibold text-gray-500 bg-white px-1">Status</span>
                                <select
                                    className="h-10 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 w-[120px]"
                                    defaultValue="all"
                                >
                                    <option value="all">Todos</option>
                                    <option value="active">Ativos</option>
                                    <option value="inactive">Inativos</option>
                                </select>
                            </div>

                            {/* Sort (Visual Match) */}
                            <div className="relative">
                                <span className="absolute -top-2 left-2 text-[10px] font-semibold text-gray-500 bg-white px-1">Ordenar</span>
                                <select
                                    className="h-10 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 w-[140px]"
                                    defaultValue="name"
                                >
                                    <option value="name">Nome (A-Z)</option>
                                    <option value="price_asc">Menor Preço</option>
                                    <option value="price_desc">Maior Preço</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wine List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        </div>
                    ) : filteredWines.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                            <Wine className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">Nenhum vinho encontrado</h3>
                            <p className="text-gray-500">Tente ajustar seus filtros de busca.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50/50 text-xs hover:bg-gray-50/50">
                                        <TableHead className="w-[300px]">Rótulo</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Uva</TableHead>
                                        <TableHead>Safra</TableHead>
                                        <TableHead>Origem</TableHead>
                                        <TableHead>Preço</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredWines.map((wine) => (
                                        <TableRow key={wine.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {wine.photo_url ? (
                                                        <div className="w-10 h-14 rounded bg-gray-100 flex-shrink-0 overflow-hidden relative border border-gray-200">
                                                            <img
                                                                src={wine.photo_url}
                                                                alt={wine.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = 'https://placehold.co/40x56/e2e8f0/94a3b8?text=Wine';
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-10 h-14 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-300 border border-gray-200">
                                                            <Wine className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-medium text-gray-900">{wine.name}</div>
                                                        {wine.volume && (
                                                            <div className="text-xs text-gray-500">{wine.volume}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={cn("font-medium border shadow-none", getWineColor(wine.wine_type))}>
                                                    {wine.wine_type || 'N/A'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-gray-600 font-medium text-sm">{wine.grape || '-'}</TableCell>
                                            <TableCell className="text-gray-600 text-sm">{wine.vintage || '-'}</TableCell>
                                            <TableCell className="text-gray-600 text-sm">{wine.origin || '-'}</TableCell>
                                            <TableCell className="font-bold text-gray-900">
                                                {formatCurrency(wine.price)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-100">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                                        onClick={() => onEdit(wine)}
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                                                        onClick={() => handleDelete(wine.id, wine.name)}
                                                        title="Excluir"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
