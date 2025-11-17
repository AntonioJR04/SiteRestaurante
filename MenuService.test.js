const MenuService = require('../src/MenuService');
const MenuItem = require('../src/MenuItem');

describe('MenuService (CRUD para Cardápio)', () => {
    let service;
    let createdItem;

    beforeEach(() => {
        service = new MenuService(); 
        
        createdItem = service.create(
            "Feijoada Clássica",
            "Feijoada completa com acompanhamentos",
            59.90,
            "feijoada.jpg",
            "Prato"
        );
    });

    test('deve cadastrar um novo item (Prato) com sucesso e atribuir um ID', () => {
        expect(createdItem).toBeInstanceOf(MenuItem);
        expect(createdItem.id).toBe(1); 
        expect(createdItem.name).toBe("Feijoada Clássica");
        expect(service.getAll().length).toBe(1);
    });
    
    test('deve lançar erro se o nome ou preço estiver faltando ou for inválido', () => {
        expect(() => service.create(null, "desc", 10, "img.jpg", "Bebida"))
            .toThrow("Nome, descrição e preço válido são obrigatórios.");

        expect(() => service.create("Bebida", "desc", 0, "img.jpg", "Bebida"))
            .toThrow("Nome, descrição e preço válido são obrigatórios.");
    });

    test('deve retornar todos os itens cadastrados', () => {
        service.create("Coca-Cola", "Lata 350ml", 8.00, "coke.jpg", "Bebida");
        
        const allItems = service.getAll();
        
        expect(allItems.length).toBe(2);
        expect(allItems[1].name).toBe("Coca-Cola");
    });
    
    test('deve retornar um item específico pelo ID', () => {
        const item = service.getById(createdItem.id);
        expect(item.name).toBe("Feijoada Clássica");
        expect(item.price).toBe(59.90);
    });
    
    test('deve lançar erro ao buscar item com ID inexistente', () => {
        expect(() => service.getById(999))
            .toThrow("Item com ID 999 não encontrado.");
    });


    test('deve editar o preço e a imagem de um item existente', () => {
        const updatedItem = service.update(createdItem.id, { 
            price: 65.50,
            imageUrl: "nova-feijoada.jpg"
        });

        expect(updatedItem.price).toBe(65.50);
        expect(updatedItem.imageUrl).toBe("nova-feijoada.jpg");

        expect(updatedItem.name).toBe("Feijoada Clássica");
    });

    test('deve lançar erro ao tentar atualizar o preço para um valor inválido (zero)', () => {
        expect(() => service.update(createdItem.id, { price: 0 }))
            .toThrow("O preço atualizado deve ser um valor positivo.");
    });

    test('deve excluir um item com sucesso e reduzir a contagem', () => {
        const initialCount = service.getAll().length;
        
        const result = service.delete(createdItem.id);

        expect(result).toBe(true); 
        expect(service.getAll().length).toBe(initialCount - 1); 

        expect(() => service.getById(createdItem.id))
            .toThrow(); 
    });
    
    test('deve lançar erro ao tentar excluir um item inexistente', () => {
        const initialCount = service.getAll().length;
        
        expect(() => service.delete(999))
            .toThrow("Não foi possível excluir. Item com ID 999 não encontrado.");

        expect(service.getAll().length).toBe(initialCount);
    });
});