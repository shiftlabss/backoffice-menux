import React, { useState, useEffect } from 'react';
import { X, Upload, Wine, Info, Plus, Tag } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button, Input, Label, Textarea, Select } from '../ui/Form';
import { toast } from 'react-hot-toast';
import { menuService } from '../../services/menuService';
import { cn } from '../../lib/utils';

const AROMA_CATEGORIES = {
    'Frutas Pretas': ['Amora', 'Ameixa', 'Groselha', 'Mirtilo', 'Cassis'],
    'Frutas Vermelhas': ['Cereja', 'Morango', 'Framboesa', 'Groselha'],
    'Amadeirado': ['Carvalho', 'Baunilha', 'Tabaco', 'Cedro', 'Chocolate', 'Café'],
    'Especiarias': ['Pimenta', 'Cravo', 'Canela', 'Noz-moscada'],
    'Floral/Herbal': ['Violeta', 'Rosa', 'Menta', 'Eucalipto'],
    'Outros': ['Couro', 'Terra', 'Mineral', 'Mel']
};

export default function WineModal({ isOpen, onClose, wineToEdit, onSave }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        photo_url: '',
        category_id: '',
        subcategory_id: '',
        wine_type: 'Tinto',
        grape: '',
        vintage: '',
        origin: '',
        alcohol_content: '',
        volume: '750ml',
        pairing_notes: '',
        sensory_intensity: 50,
        sensory_softness: 50,
        sensory_smoothness: 50,
        sensory_sweetness: 50,
        aroma_notes: [],
        is_wine: true
    });

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [customAroma, setCustomAroma] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
            if (wineToEdit) {
                setFormData({
                    ...wineToEdit,
                    description: wineToEdit.short_description,
                    price: wineToEdit.price,
                    sensory_intensity: wineToEdit.sensory_intensity || 50,
                    sensory_softness: wineToEdit.sensory_softness || 50,
                    sensory_smoothness: wineToEdit.sensory_smoothness || 50,
                    sensory_sweetness: wineToEdit.sensory_sweetness || 50,
                    aroma_notes: wineToEdit.aroma_notes || [],
                    is_wine: true
                });
            } else {
                setFormData({
                    name: '',
                    price: '',
                    description: '',
                    photo_url: '',
                    category_id: '',
                    subcategory_id: '',
                    wine_type: 'Tinto',
                    grape: '',
                    vintage: '',
                    origin: '',
                    alcohol_content: '',
                    volume: '750ml',
                    pairing_notes: '',
                    sensory_intensity: 50,
                    sensory_softness: 50,
                    sensory_smoothness: 50,
                    sensory_sweetness: 50,
                    aroma_notes: [],
                    is_wine: true
                });
            }
        }
    }, [isOpen, wineToEdit]);

    const fetchCategories = async () => {
        try {
            const cats = await menuService.getCategories();
            setCategories(cats);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        if (formData.category_id) {
            fetchSubcategories(formData.category_id);
        } else {
            setSubcategories([]);
        }
    }, [formData.category_id]);

    const fetchSubcategories = async (categoryId) => {
        try {
            const subs = await menuService.getSubCategories(categoryId);
            setSubcategories(subs);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAromaToggle = (aroma) => {
        setFormData(prev => {
            const current = prev.aroma_notes || [];
            if (current.includes(aroma)) {
                return { ...prev, aroma_notes: current.filter(a => a !== aroma) };
            } else {
                return { ...prev, aroma_notes: [...current, aroma] };
            }
        });
    };

    const addCustomAroma = (e) => {
        e.preventDefault();
        if (customAroma && !formData.aroma_notes.includes(customAroma)) {
            setFormData(prev => ({
                ...prev,
                aroma_notes: [...(prev.aroma_notes || []), customAroma]
            }));
            setCustomAroma('');
        }
    };

    const RangeSlider = ({ label, leftLabel, rightLabel, name, value, onChange }) => (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
                <span className="text-sm font-bold text-wine-600">{value}%</span>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                name={name}
                value={value}
                onChange={onChange}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-wine-600 hover:accent-wine-700 transition-all"
            />
            <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-medium">
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                short_description: formData.description,
                sort_order: 0,
                code: formData.code || `WINE-${Date.now()}`
            };

            if (wineToEdit) {
                await menuService.updateProduct(wineToEdit.id, payload);
                toast.success('Vinho atualizado com sucesso!');
            } else {
                await menuService.createProduct(payload);
                toast.success('Vinho criado com sucesso!');
            }
            onSave();
            onClose();
        } catch (error) {
            console.error('Error saving wine:', error);
            toast.error('Erro ao salvar vinho details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={wineToEdit ? "Editar Rótulo de Vinho" : "Adicionar Novo Vinho"}
            className="max-w-5xl" // Large modal as requested
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT COLUMN: Visuals & Basics */}
                    <div className="lg:w-1/3 flex flex-col gap-6">
                        {/* Image Upload */}
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center h-[380px] bg-gray-50/50 hover:bg-gray-50 hover:border-wine-300 transition-all cursor-pointer relative group">
                            {formData.photo_url ? (
                                <img
                                    src={formData.photo_url}
                                    alt="Preview"
                                    className="h-full w-full object-contain z-10 drop-shadow-xl"
                                />
                            ) : (
                                <div className="text-center text-gray-400 group-hover:text-wine-500 transition-colors">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                                        <Wine className="w-8 h-8 opacity-50" />
                                    </div>
                                    <span className="text-sm font-medium">Clique para fazer upload da garrafa</span>
                                    <p className="text-xs text-gray-300 mt-1">PNG transparente recomendado</p>
                                </div>
                            )}
                            <input
                                type="text"
                                name="photo_url"
                                placeholder="Ou cole a URL da imagem aqui"
                                className="absolute bottom-4 left-4 right-4 text-xs border border-gray-200 p-2 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-wine-500"
                                value={formData.photo_url}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Quick Tip */}
                        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex gap-3">
                            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-800 leading-relaxed">
                                <span className="font-bold block mb-1">Categorização Importante</span>
                                Selecione a Categoria e Subcategoria corretas para que este vinho apareça nos filtros do cardápio digital (ex: "Vinhos" &gt; "Tintos").
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Everything else */}
                    <div className="lg:w-2/3 space-y-8">

                        {/* 1. Header Info */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-8">
                                <Label htmlFor="name" className="text-gray-500 text-xs uppercase tracking-wider mb-1 block">Nome do Rótulo</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ex: Angelica Zapata Malbec Alta"
                                    className="text-xl font-bold h-12 border-gray-200 focus:border-wine-500"
                                    required
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
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Technical Details Grid */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-wine-600" /> Ficha Técnica
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <Label className="text-xs">Tipo</Label>
                                    <Select name="wine_type" value={formData.wine_type} onChange={handleChange} className="bg-white">
                                        {['Tinto', 'Branco', 'Rosé', 'Espumante', 'Sobremesa', 'Fortificado'].map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-xs">Safra</Label>
                                    <Input name="vintage" value={formData.vintage} onChange={handleChange} placeholder="Ex: 2018" className="bg-white" />
                                </div>
                                <div>
                                    <Label className="text-xs">Uva (Casta)</Label>
                                    <Input name="grape" value={formData.grape} onChange={handleChange} placeholder="Ex: Malbec" className="bg-white" />
                                </div>
                                <div>
                                    <Label className="text-xs">Origem</Label>
                                    <Input name="origin" value={formData.origin} onChange={handleChange} placeholder="País/Região" className="bg-white" />
                                </div>
                                <div>
                                    <Label className="text-xs">Volume</Label>
                                    <Input name="volume" value={formData.volume} onChange={handleChange} className="bg-white" />
                                </div>
                                <div>
                                    <Label className="text-xs">Teor Alcoólico</Label>
                                    <Input name="alcohol_content" value={formData.alcohol_content} onChange={handleChange} placeholder="%" className="bg-white" />
                                </div>
                                <div className="col-span-2">
                                    <Label className="text-xs">Harmonização (Resumo)</Label>
                                    <Input name="pairing_notes" value={formData.pairing_notes} onChange={handleChange} placeholder="Ex: Carnes e queijos" className="bg-white" />
                                </div>
                            </div>
                        </div>

                        {/* 3. Categorization */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label>Categoria Principal</Label>
                                <Select name="category_id" value={formData.category_id} onChange={handleChange} required className="border-gray-200">
                                    <option value="">Selecione...</option>
                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </Select>
                            </div>
                            <div>
                                <Label>Subcategoria</Label>
                                <Select name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} required disabled={!formData.category_id} className="border-gray-200">
                                    <option value="">Selecione...</option>
                                    {subcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                                </Select>
                            </div>
                        </div>

                        {/* 4. Description */}
                        <div>
                            <Label>Descrição / Notas de Sommelier</Label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Descreva os detalhes sensoriais e a história deste rótulo..."
                                className="resize-none border-gray-200 focus:border-wine-500"
                            />
                        </div>

                        {/* 5. Sensory Profile Tabs/Sections */}
                        <div className="pt-6 border-t border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Sliders */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-900 mb-2">Estrutura e Corpo</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <RangeSlider label="Corpo" leftLabel="Leve" rightLabel="Encorpado" name="sensory_intensity" value={formData.sensory_intensity} onChange={handleChange} />
                                        <RangeSlider label="Taninos" leftLabel="Macio" rightLabel="Tânico" name="sensory_smoothness" value={formData.sensory_smoothness} onChange={handleChange} />
                                        <RangeSlider label="Acidez" leftLabel="Baixa" rightLabel="Alta/Fresco" name="sensory_softness" value={formData.sensory_softness} onChange={handleChange} />
                                        <RangeSlider label="Doçura" leftLabel="Seco" rightLabel="Doce" name="sensory_sweetness" value={formData.sensory_sweetness} onChange={handleChange} />
                                    </div>
                                </div>

                                {/* Aromas */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 mb-4">Notas Aromáticas</h3>
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 h-full">
                                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                            {Object.entries(AROMA_CATEGORIES).map(([cat, aromas]) => (
                                                <div key={cat}>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{cat}</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {aromas.map(aroma => (
                                                            <button
                                                                key={aroma}
                                                                type="button"
                                                                onClick={() => handleAromaToggle(aroma)}
                                                                className={cn(
                                                                    "px-2.5 py-1 rounded-md text-xs font-medium transition-all border",
                                                                    formData.aroma_notes.includes(aroma)
                                                                        ? "bg-wine-600 text-white border-wine-600 shadow-sm"
                                                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                                                )}
                                                            >
                                                                {aroma}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <Input
                                                value={customAroma}
                                                onChange={(e) => setCustomAroma(e.target.value)}
                                                placeholder="+ Adicionar nota personalizada"
                                                className="text-xs h-8 bg-white"
                                                onKeyDown={(e) => e.key === 'Enter' && addCustomAroma(e)}
                                            />
                                            <Button type="button" onClick={addCustomAroma} size="sm" variant="secondary" className="h-8 w-8 p-0"><Plus className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t border-gray-100 flex justify-between items-center z-10">
                    <div className="text-xs text-gray-400">
                        * Campos obrigatórios
                    </div>
                    <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={onClose} className="border-gray-200 text-gray-600 hover:bg-gray-50">Cancelar</Button>
                        <Button type="submit" disabled={loading} className="bg-[#121212] hover:bg-gray-900 text-white min-w-[140px] shadow-lg shadow-gray-200">
                            {loading ? 'Salvando...' : 'Salvar Vinho'}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
