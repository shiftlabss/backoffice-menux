import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Button, Input, Label, Textarea, Select } from '../ui/Form';
import { menuService } from '../../services/menuService';
import { AlertCircle, Upload, X, Image as ImageIcon, RefreshCw, Tag, Info, Package, DollarSign, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function ImageUploader({ value, onChange, onError }) {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(value || null);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    useEffect(() => {
        if (value && typeof value === 'string' && value.startsWith('http')) {
            setPreview(value);
        }
    }, [value]);

    const validateFile = (file) => {
        if (!ACCEPTED_TYPES.includes(file.type)) {
            onError('Formato inválido. Use JPG, PNG ou WebP.');
            return false;
        }
        if (file.size > MAX_FILE_SIZE) {
            onError('Arquivo muito grande. Máximo: 5MB.');
            return false;
        }
        return true;
    };

    const handleFileSelect = async (file) => {
        if (!file || !validateFile(file)) return;
        setUploading(true);
        onError(null);
        try {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
            await new Promise(resolve => setTimeout(resolve, 500));
            const fakeUploadedUrl = URL.createObjectURL(file);
            onChange(fakeUploadedUrl);
        } catch (err) {
            console.error(err);
            onError('Erro ao fazer upload. Tente novamente.');
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setPreview(null);
        onChange('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-2 h-full">
            {preview ? (
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white group h-full min-h-[300px] flex items-center justify-center">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain p-4" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"><RefreshCw className="h-5 w-5 text-gray-700" /></button>
                        <button type="button" onClick={handleRemove} className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-lg"><X className="h-5 w-5 text-white" /></button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={cn(
                        "relative flex flex-col items-center justify-center w-full h-full min-h-[300px] border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 group bg-gray-50/50",
                        dragOver ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-300 hover:bg-white"
                    )}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent" />
                            <span className="text-sm text-gray-500">Enviando...</span>
                        </div>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                <ImageIcon className="h-8 w-8 text-gray-300 group-hover:text-purple-500 transition-colors" />
                            </div>
                            <p className="text-sm font-bold text-gray-700 mb-1">Clique ou arraste a imagem</p>
                            <p className="text-xs text-gray-400">JPG, PNG ou WebP • Máx 5MB</p>
                        </>
                    )}
                </div>
            )}
            <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => handleFileSelect(e.target.files?.[0])} className="hidden" />
        </div>
    );
}

export default function ProductModal({ isOpen, onClose, productToEdit, initialCategoryId, initialSubCategoryId, categories, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        price: '',
        short_description: '',
        photo_url: '',
        is_active: true,
        ingredients: '',
        category_id: initialCategoryId || '',
        subcategory_id: initialSubCategoryId || ''
    });

    useEffect(() => {
        if (isOpen) {
            setError(null);
            setImageError(null);
            if (productToEdit) {
                setFormData({
                    name: productToEdit.name,
                    code: productToEdit.code,
                    price: productToEdit.price,
                    short_description: productToEdit.short_description || '',
                    photo_url: productToEdit.photo_url || '',
                    is_active: productToEdit.is_active,
                    ingredients: productToEdit.ingredients || '',
                    category_id: initialCategoryId || '',
                    subcategory_id: productToEdit.subcategory_id || initialSubCategoryId || ''
                });
                fetchSubCategories(initialCategoryId);
            } else {
                setFormData({
                    name: '',
                    code: '',
                    price: '',
                    short_description: '',
                    photo_url: '',
                    is_active: true,
                    ingredients: '',
                    category_id: initialCategoryId || '',
                    subcategory_id: initialSubCategoryId || ''
                });
                if (initialCategoryId) fetchSubCategories(initialCategoryId);
            }
        }
    }, [isOpen, productToEdit]);

    const fetchSubCategories = async (catId) => {
        if (!catId) {
            setSubCategories([]);
            return;
        }
        try {
            const subs = await menuService.getSubCategories(catId);
            setSubCategories(subs);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'category_id') {
            setFormData(prev => ({ ...prev, category_id: value, subcategory_id: '' }));
            fetchSubCategories(value);
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
    };

    const handleImageChange = (url) => setFormData(prev => ({ ...prev, photo_url: url }));

    const handleGenerateAI = async () => {
        if (!formData.name) {
            setError("Digite o nome do produto para gerar a descrição.");
            return;
        }
        setLoadingAI(true);
        setError(null);
        try {
            const { description, ingredients } = await menuService.generateProductDetails(formData.name);
            setFormData(prev => ({
                ...prev,
                short_description: description,
                ingredients: ingredients
            }));
        } catch (err) {
            console.error("AI Error:", err);
            setError("Erro ao gerar conteúdo com IA. Tente novamente.");
        } finally {
            setLoadingAI(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (!formData.category_id || !formData.subcategory_id) throw new Error("Categoria e Subcategoria são obrigatórias.");
            if (!formData.name) throw new Error("Nome do produto é obrigatório.");
            if (!formData.code) throw new Error("Código do produto é obrigatório.");
            if (!formData.price) throw new Error("Preço é obrigatório.");

            const payload = {
                ...formData,
                price: parseFloat(formData.price.toString().replace(',', '.').replace('R$', '').trim())
            };

            if (productToEdit) await menuService.updateItem(productToEdit.id, payload);
            else await menuService.createItem(payload);

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail?.message || err.message || "Erro ao salvar produto.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={productToEdit ? "Editar Produto" : "Novo Produto"} className="max-w-5xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                        <AlertCircle className="h-4 w-4" /> {error}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT COLUMN: Visuals */}
                    <div className="lg:w-1/3 flex flex-col gap-4">
                        <div className="h-[380px]">
                            <ImageUploader value={formData.photo_url} onChange={handleImageChange} onError={setImageError} />
                        </div>
                        {imageError && <p className="text-xs text-red-500">{imageError}</p>}

                        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex gap-3">
                            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-blue-800">Dica de Conversão</p>
                                <p className="text-xs text-blue-700/80">
                                    Fotos com fundo transparente e boa iluminação aumentam em até 30% a conversão de vendas no cardápio digital.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Details */}
                    <div className="lg:w-2/3 space-y-6">

                        {/* 1. Basic Info Header */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-8">
                                <Label htmlFor="name" className="text-gray-500 text-xs uppercase tracking-wider mb-1 block">Nome do Produto</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ex: Coca-Cola Lata 350ml"
                                    className="text-xl font-bold h-12 border-gray-200 focus:border-purple-500"
                                />
                            </div>
                            <div className="col-span-4">
                                <Label htmlFor="price" className="text-gray-500 text-xs uppercase tracking-wider mb-1 block">Preço de Venda</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">R$</span>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0,00"
                                        className="pl-10 text-xl font-bold text-green-700 h-12 border-gray-200 focus:border-green-500 bg-green-50/30"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Classification & Code Grid */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-purple-600" /> Classificação & Código
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label>Código PDV</Label>
                                    <div className="relative">
                                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            name="code"
                                            value={formData.code}
                                            onChange={handleChange}
                                            placeholder="Ex: 1020"
                                            className="pl-9 bg-white"
                                            maxLength={10}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Categoria</Label>
                                    <Select name="category_id" value={formData.category_id} onChange={handleChange} className="bg-white">
                                        <option value="">Selecione...</option>
                                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </Select>
                                </div>
                                <div>
                                    <Label>Subcategoria</Label>
                                    <Select name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} disabled={!formData.category_id} className="bg-white">
                                        <option value="">Selecione...</option>
                                        {subCategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* 3. Description */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label className="mb-0">Descrição Detalhada</Label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleGenerateAI}
                                    disabled={loadingAI || !formData.name}
                                    className={cn(
                                        "h-7 text-xs gap-1.5 transition-all",
                                        loadingAI ? "opacity-70 cursor-wait" : "hover:bg-purple-50 text-purple-600 hover:text-purple-700"
                                    )}
                                >
                                    <Sparkles className={cn("w-3.5 h-3.5", loadingAI && "animate-pulse")} />
                                    {loadingAI ? "Gerando..." : "Gerar com Maestro"}
                                </Button>
                            </div>
                            <Textarea
                                name="short_description"
                                value={formData.short_description}
                                onChange={handleChange}
                                rows={4}
                                className="resize-none border-gray-200 focus:border-purple-500"
                                placeholder="Descreva os ingredientes, modo de preparo ou detalhes que valorizem o produto..."
                            />
                        </div>

                        {/* 3.1. Ingredients */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label className="mb-0">Ingredientes</Label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleGenerateAI}
                                    disabled={loadingAI || !formData.name}
                                    className={cn(
                                        "h-7 text-xs gap-1.5 transition-all",
                                        loadingAI ? "opacity-70 cursor-wait" : "hover:bg-purple-50 text-purple-600 hover:text-purple-700"
                                    )}
                                >
                                    <Sparkles className={cn("w-3.5 h-3.5", loadingAI && "animate-pulse")} />
                                    {loadingAI ? "Gerando..." : "Gerar com Maestro"}
                                </Button>
                            </div>
                            <Textarea
                                name="ingredients"
                                value={formData.ingredients}
                                onChange={handleChange}
                                rows={2}
                                className="resize-none border-gray-200 focus:border-purple-500 mt-1"
                                placeholder="Lista de ingredientes (ex: Trigo, Leite, Ovos...)"
                            />
                        </div>

                        {/* 4. Active Status Toggle */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <div>
                                <p className="text-sm font-bold text-foreground">Status do Produto</p>
                                <p className="text-xs text-gray-500">Defina se o produto está visível para venda.</p>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                </div>
                                <span className={cn("text-sm font-medium", formData.is_active ? "text-green-600" : "text-gray-400")}>
                                    {formData.is_active ? 'Ativo e Visível' : 'Inativo / Oculto'}
                                </span>
                            </label>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t border-gray-100 flex justify-end gap-3 z-10">
                    <Button variant="outline" onClick={onClose} type="button" className="border-gray-200 text-gray-600 hover:bg-gray-50">Cancelar</Button>
                    <Button onClick={handleSubmit} disabled={loading} className="bg-[#121212] hover:bg-gray-900 text-white min-w-[140px] shadow-lg shadow-gray-200">
                        {loading ? 'Salvando...' : 'Salvar Produto'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
