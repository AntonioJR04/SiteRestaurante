const MenuItem = require('./MenuItem');

class MenuService {
    constructor() {
        this.items = [];
        this.nextId = 1; 
    }

create(name, description, price, imageUrl, type, recipe = []) { 
    
    if (!name || !description || !price || price <= 0) {
        throw new Error("Nome, descrição e preço válido são obrigatórios.");
    }
    
    const newItem = new MenuItem(
        this.nextId++,
        name,
        description,
        price,
        imageUrl,
        type,
        recipe
    );
    
    this.items.push(newItem);
    return newItem;
}

    getAll() {
        return this.items;
    }

    getById(id) {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            throw new Error(`Item com ID ${id} não encontrado.`);
        }
        return item;
    }

    update(id, updates) {
        const item = this.getById(id); 
        
        if (updates.price !== undefined && updates.price <= 0) {
            throw new Error("O preço atualizado deve ser um valor positivo.");
        }
        
        Object.assign(item, updates); 
        
        return item;
    }

    delete(id) {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        
        if (this.items.length === initialLength) {
            throw new Error(`Não foi possível excluir. Item com ID ${id} não encontrado.`);
        }
        
        return true; 
    }
}

module.exports = MenuService;