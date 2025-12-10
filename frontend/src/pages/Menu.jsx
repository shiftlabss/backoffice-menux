
import React, { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { menuService } from '../services/menuService';
import ModuleLayout from '../components/layout/ModuleLayout';
import MenuOverview from '../components/menu/MenuOverview';
import MenuInsights from '../components/menu/MenuInsights';
import MenuCategoryAccordion from '../components/menu/MenuCategoryAccordion';
import MenuProducts from '../components/menu/MenuProducts';
import MenuWineList from '../components/menu/MenuWineList';
import ProductModal from '../components/menu/ProductModal';
import WineModal from '../components/menu/WineModal';
import { Modal } from '../components/ui/Modal';
import { Button, Input } from '../components/ui/Form';
import { toast } from 'react-hot-toast';
import {
    LayoutDashboard,
    Layers,
    Coffee,
    Wine,
    Zap,
    Plus
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
    // Top-Level State
    const [activeView, setActiveView] = useState('overview');
    const [categories, setCategories] = useState([]);

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
            const fullMenu = await menuService.getFullMenu();
            setCategories(fullMenu);
        } catch (error) { toast.error("Erro ao carregar cardápio"); }
    };
    const refreshData = () => { loadAllItems(); };

    // ... (Keep existing handlers: handleCreateCategory, handleUpdateCategory, etc. - omitting for brevity but standard implementation)
    // --- Handlers: Category ---
    const handleCreateCategory = async (name) => { try { await menuService.createCategory({ name, sort_order: categories.length }); refreshData(); toast.success("Categoria criada!"); } catch (e) { toast.error("Erro"); } };
    const handleUpdateCategory = async (name) => { if (!catToEdit) return; try { await menuService.updateCategory(catToEdit.id, { name }); refreshData(); toast.success("Categoria atualizada!"); } catch (e) { } };
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
        // ... (Same implementation as before)
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

    // --- Action Orchestration ---
    const handleSidebarAction = (action) => {
        switch (action) {
            case 'create_category': setCatToEdit(null); setIsCatModalOpen(true); break;
            case 'create_product': setProductToEdit(null); setIsProductModalOpen(true); break;
            case 'create_wine': setWineToEdit(null); setIsWineModalOpen(true); break;
            case 'open_ai_panel': toast("IA: Analisando...", { icon: '⚡️' }); break;
            case 'switch_view_categories': setActiveView('categories'); break;
            case 'switch_view_products': setActiveView('products'); break;
            case 'bulk_photos': toast("Funcionalidade de upload em massa em breve!", { icon: '🚧' }); break;
            default: console.warn("Unknown action:", action);
        }
    };

    // Navigation configuration for ModuleLayout
    const navItems = [
        { id: 'overview', label: 'Visão Geral', subtitle: 'Resumo do cardápio', icon: LayoutDashboard, onClick: () => setActiveView('overview') },
        { id: 'insights', label: 'Insights IA', subtitle: 'Análise inteligente', icon: Zap, onClick: () => setActiveView('insights') },
        { id: 'categories', label: 'Categorias', subtitle: 'Organização estrutural', icon: Layers, onClick: () => setActiveView('categories') },
        { id: 'products', label: 'Produtos', subtitle: 'Todos os itens', icon: Coffee, onClick: () => setActiveView('products') },
        { id: 'wine_list', label: 'Carta de Vinhos', subtitle: 'Gestão da adega', icon: Wine, onClick: () => setActiveView('wine_list') },
        // Actions
        { id: 'new_cat', label: '+ Categoria', icon: Plus, onClick: () => handleSidebarAction('create_category') },
        { id: 'new_prod', label: '+ Produto', icon: Plus, onClick: () => handleSidebarAction('create_product') },
    ].map(item => ({ ...item, isActive: activeView === item.id }));

    // Render Logic
    const renderContent = () => {
        switch (activeView) {
            case 'overview': return <MenuOverview data={categories} onAction={handleSidebarAction} />;
            case 'insights': return <MenuInsights data={categories} onAction={handleSidebarAction} />;
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
                    onFilterBySubcategory={(sub) => { setSelectedSubCategory(sub); setActiveView('products'); }}
                />
            );
            case 'products': return (
                <MenuProducts
                    categories={categories}
                    onAdd={() => handleSidebarAction('create_product')}
                    onEdit={(p) => { setProductToEdit(p); setIsProductModalOpen(true); }}
                    onDelete={handleDeleteProduct}
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
        <ModuleLayout title="Cardápio" subtitle="Gerencie seus itens" items={navItems}>
            {renderContent()}

            {/* Modals */}
            <ProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} productToEdit={productToEdit} categories={categories} onSuccess={handleProductSuccess} />
            <WineModal isOpen={isWineModalOpen} onClose={() => setIsWineModalOpen(false)} wineToEdit={wineToEdit} onSave={refreshData} />
            <SimpleFormModal isOpen={isCatModalOpen} onClose={() => setIsCatModalOpen(false)} title={catToEdit ? "Editar Categoria" : "Nova Categoria"} label="Nome" initialValue={catToEdit?.name} onSubmit={catToEdit ? handleUpdateCategory : handleCreateCategory} />
            <SubCategoryModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} categories={categories} initialCategoryId={selectedCategory} subToEdit={subToEdit} onSubmit={handleSubCategorySubmit} />
        </ModuleLayout>
    );
}
