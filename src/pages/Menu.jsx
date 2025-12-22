
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { arrayMove } from '@dnd-kit/sortable';
import { menuService } from '../services/menuService';
import ModuleLayout from '../components/layout/ModuleLayout';
import { SecondaryNavigation } from '../components/ui/SecondaryNavigation';

import MenuCategoryAccordion from '../components/menu/MenuCategoryAccordion';
import MenuProducts from '../components/menu/MenuProducts';
import MenuWineList from '../components/menu/MenuWineList';
import ProductModal from '../components/menu/ProductModal';
import WineModal from '../components/menu/WineModal';
import { Modal } from '../components/ui/Modal';
import { Button, Input } from '../components/ui/Form';
import { toast } from 'react-hot-toast';
import {
    Plus,
    Layers,
    Coffee,
    Wine
} from 'lucide-react';

// ... (SubComponents like SimpleFormModal, SubCategoryModal can remain here or be moved)
function SimpleFormModal({ isOpen, onClose, title, initialValue, onSubmit, label }) {
    const [value, setValue] = useState(initialValue || '');
    useEffect(() => { setValue(initialValue || ''); }, [initialValue, isOpen]);
    const handleSubmit = () => { onSubmit(value); onClose(); };
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-4">
                <Input label={label} value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Salvar</Button>
                </div>
            </div>
        </Modal>
    );
}
function SubCategoryModal({ isOpen, onClose, categories, initialCategoryId, subToEdit, onSubmit }) {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(initialCategoryId || '');
    useEffect(() => {
        if (isOpen) {
            setName(subToEdit?.name || '');
            setCategoryId(subToEdit?.category_id || initialCategoryId || '');
        }
    }, [isOpen, subToEdit, initialCategoryId]);
    const handleSubmit = () => {
        if (!name.trim()) { toast.error("Preencha o nome"); return; }
        if (!categoryId) { toast.error("Selecione uma categoria"); return; }
        onSubmit({ name, categoryId, isEdit: !!subToEdit });
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={subToEdit ? "Editar Subcategoria" : "Nova Subcategoria"}>
            <div className="space-y-4">
                <div className="space-y-1.5 w-full">
                    <label className="text-sm font-medium text-text-primary">Categoria</label>
                    <select className="flex h-12 w-full rounded-md border border-input bg-input px-4 py-3 text-sm" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="" disabled>Selecione</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                </div>
                <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button type="button" onClick={handleSubmit}>Salvar</Button>
                </div>
            </div>
        </Modal>
    );
}

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();

    // Top-Level State derived from URL
    const getActiveView = () => {
        const path = location.pathname.split('/').pop();
        if (path === 'products') return 'products';
        if (path === 'wine-list') return 'wine_list';
        return 'categories';
    };

    const activeView = getActiveView();

    const [categories, setCategories] = useState([]);
    const [highlights, setHighlights] = useState([]);

    // View-Specific State (Selection)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    // Modals State
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isWineModalOpen, setIsWineModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [wineToEdit, setWineToEdit] = useState(null);
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);
    const [catToEdit, setCatToEdit] = useState(null);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [subToEdit, setSubToEdit] = useState(null);

    // Initial Load
    useEffect(() => { loadAllItems(); }, []);

    // Loaders
    const loadAllItems = async () => {
        try {
            const [fullMenu, highlightsData] = await Promise.all([
                menuService.getFullMenu(),
                menuService.getHighlights()
            ]);
            setCategories(fullMenu);
            setHighlights(highlightsData);
        } catch (error) { toast.error("Erro ao carregar cardápio"); }
    };
    const refreshData = () => { loadAllItems(); };

    // Determine default redirect - Render <Navigate> if needed, but DO NOT return early before hooks
    // Note: In this component, we have already called all hooks above.
    // Ideally, we should perform the redirect check here.
    if (location.pathname === '/menu' || location.pathname === '/menu/') {
        return <Navigate to="/menu/categories" replace />;
    }

    // --- Handlers: Category ---
    const handleCreateCategory = async (name) => { try { await menuService.createCategory({ name, sort_order: categories.length }); refreshData(); toast.success("Categoria criada!"); } catch (e) { toast.error("Erro"); } };
    const handleUpdateCategory = async (name) => { if (!catToEdit) return; try { await menuService.updateCategory(catToEdit.id, { name }); refreshData(); toast.success("Categoria atualizada!"); } catch (e) { /* ignore */ } };
    const handleDeleteCategory = async (cat) => { if (confirm(`Excluir ${cat.name}?`)) { try { await menuService.deleteCategory(cat.id); refreshData(); toast.success("Excluída!"); } catch (e) { toast.error("Erro (verifique subcategorias)."); } } };
    const handleCategoryReorder = async (activeId, overId) => {
        const oldIndex = categories.findIndex(c => c.id === activeId);
        const newIndex = categories.findIndex(c => c.id === overId);
        if (oldIndex !== -1 && newIndex !== -1) {
            const newCategories = arrayMove(categories, oldIndex, newIndex);
            setCategories(newCategories);
            try { await menuService.reorderCategories(newCategories.map(c => c.id)); toast.success("Ordem salva"); } catch (e) { refreshData(); }
        }
    };
    // --- Handlers: SubCategory ---
    const handleSubCategorySubmit = async ({ name, categoryId, isEdit }) => {
        try {
            if (isEdit && subToEdit) { await menuService.updateSubCategory(subToEdit.id, { name, category_id: categoryId }); toast.success("Atualizada!"); }
            else { const cat = categories.find(c => c.id === categoryId); await menuService.createSubCategory({ name, category_id: categoryId, sort_order: cat?.subcategories?.length || 0 }); toast.success("Criada!"); }
            refreshData(); setSelectedCategory(categoryId);
        } catch (e) { toast.error("Erro"); }
    };
    const handleDeleteSubCategory = async (sub) => { if (confirm(`Excluir ${sub.name}?`)) { try { await menuService.deleteSubCategory(sub.id); refreshData(); toast.success("Excluída!"); } catch (e) { toast.error("Erro (verifique produtos)."); } } };
    const handleSubCategoryReorder = async (categoryId, activeId, overId) => {
        const category = categories.find(c => c.id === categoryId); if (!category) return;
        const subs = category.subcategories || []; const oldIndex = subs.findIndex(s => s.id === activeId); const newIndex = subs.findIndex(s => s.id === overId);
        if (oldIndex !== -1 && newIndex !== -1) {
            const newSubs = arrayMove(subs, oldIndex, newIndex);
            const newCategories = categories.map(c => c.id === categoryId ? { ...c, subcategories: newSubs } : c);
            setCategories(newCategories);
            try { await menuService.reorderSubCategories(newSubs.map(s => s.id)); toast.success("Ordem salva"); } catch (e) { refreshData(); }
        }
    };
    // --- Handlers: Product ---
    const handleProductSuccess = () => { refreshData(); toast.success(productToEdit ? "Produto atualizado!" : "Produto criado!"); };
    const handleDeleteProduct = async (item) => { if (confirm(`Excluir ${item.name}?`)) { try { await menuService.deleteItem(item.id); refreshData(); toast.success("Excluído!"); } catch (e) { toast.error("Erro"); } } };

    // --- Handlers: Highlights ---
    const handleUpdateHighlights = async (newHighlights) => {
        setHighlights(newHighlights); // Optimistic
        try {
            await menuService.updateHighlights(newHighlights);
            toast.success("Destaques atualizados!");
        } catch (e) {
            toast.error("Erro ao salvar destaques");
            refreshData(); // Revert
        }
    };

    const handleAddToHighlights = async (product) => {
        if (highlights.length >= 3) {
            toast.error("Limite de 3 destaques atingido!");
            return;
        }
        if (highlights.some(h => h.id === product.id)) {
            toast.error("Produto já está nos destaques");
            return;
        }
        await handleUpdateHighlights([...highlights, product]);
    };

    // --- Action Orchestration ---
    const handleSidebarAction = (action) => {
        switch (action) {
            case 'create_category': setCatToEdit(null); setIsCatModalOpen(true); break;
            case 'create_product': setProductToEdit(null); setIsProductModalOpen(true); break;
            case 'create_wine': setWineToEdit(null); setIsWineModalOpen(true); break;
            case 'open_ai_panel': toast("IA: Analisando...", { icon: '⚡️' }); break;
            case 'switch_view_categories': navigate('/menu/categories'); break;
            case 'switch_view_products': navigate('/menu/products'); break;
            case 'bulk_photos': toast("Funcionalidade de upload em massa em breve!", { icon: '🚧' }); break;
            default: console.warn("Unknown action:", action);
        }
    };

    // Navigation configuration for ModuleLayout
    const navItems = [
        { id: 'categories', label: 'Categorias', icon: Layers, onClick: () => navigate('/menu/categories'), isActive: activeView === 'categories' },
        { id: 'products', label: 'Produtos', icon: Coffee, onClick: () => navigate('/menu/products'), isActive: activeView === 'products' },
        { id: 'wine_list', label: 'Carta de Vinhos', icon: Wine, onClick: () => navigate('/menu/wine-list'), isActive: activeView === 'wine_list' },
    ];

    // Render Logic
    const renderContent = () => {
        switch (activeView) {
            case 'categories': return (
                <MenuCategoryAccordion
                    categories={categories}
                    onAddCategory={() => handleSidebarAction('create_category')}
                    onEditCategory={(cat) => { setCatToEdit(cat); setIsCatModalOpen(true); }}
                    onDeleteCategory={handleDeleteCategory}
                    onReorderCategories={handleCategoryReorder}
                    onAddSubcategory={(categoryId) => { setSelectedCategory(categoryId); setSubToEdit(null); setIsSubModalOpen(true); }}
                    onEditSubcategory={(sub) => { setSubToEdit(sub); setIsSubModalOpen(true); }}
                    onDeleteSubcategory={handleDeleteSubCategory}
                    onReorderSubcategories={handleSubCategoryReorder}
                    onFilterBySubcategory={(sub) => { setSelectedSubCategory(sub); navigate('/menu/products'); }}
                />
            );
            case 'products': return (
                <MenuProducts
                    categories={categories}
                    onAdd={() => handleSidebarAction('create_product')}
                    onEdit={(p) => { setProductToEdit(p); setIsProductModalOpen(true); }}
                    onDelete={handleDeleteProduct}
                    highlights={highlights}
                    onUpdateHighlights={handleUpdateHighlights}
                    onAddToHighlights={handleAddToHighlights}
                />
            );
            case 'wine_list': return (
                <MenuWineList
                    onAdd={() => handleSidebarAction('create_wine')}
                    onEdit={(w) => { setWineToEdit(w); setIsWineModalOpen(true); }}
                    onDelete={handleDeleteProduct}
                />
            );
            default: return null;
        }
    };

    return (
        <ModuleLayout title="Cardápio" subtitle="Gerencie seus itens" items={null}>
            <div className="mb-6">
                <SecondaryNavigation items={navItems} />
            </div>
            {renderContent()}

            {/* Modals */}
            <ProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} productToEdit={productToEdit} categories={categories} onSuccess={handleProductSuccess} />
            <WineModal isOpen={isWineModalOpen} onClose={() => setIsWineModalOpen(false)} wineToEdit={wineToEdit} onSave={refreshData} />
            <SimpleFormModal isOpen={isCatModalOpen} onClose={() => setIsCatModalOpen(false)} title={catToEdit ? "Editar Categoria" : "Nova Categoria"} label="Nome" initialValue={catToEdit?.name} onSubmit={catToEdit ? handleUpdateCategory : handleCreateCategory} />
            <SubCategoryModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} categories={categories} initialCategoryId={selectedCategory} subToEdit={subToEdit} onSubmit={handleSubCategorySubmit} />
        </ModuleLayout>
    );
}
