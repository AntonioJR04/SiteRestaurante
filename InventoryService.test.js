const InventoryService = require('../src/InventoryService');
const MenuService = require('../src/MenuService');
const Ingredient = require('../src/Ingredient');

describe('InventoryService (Estoque e Custos)', () => {
    let menuService;
    let inventoryService;
    let arroz, feijao, bife;
    let pratoExecutivo;

    beforeEach(() => {
        menuService = new MenuService();
        inventoryService = new InventoryService(menuService);
        
        arroz = inventoryService.addIngredient("Arroz (Kg)", 100, 'kg', 5.00, 10); 
        feijao = inventoryService.addIngredient("Feijão (Kg)", 50, 'kg', 8.00, 5);
        bife = inventoryService.addIngredient("Bife (Unidade)", 20, 'unidade', 12.00, 2); 
        
        const receitaPrato = [
            { ingredientId: arroz.id, quantityUsed: 0.2 }, 
            { ingredientId: feijao.id, quantityUsed: 0.1 }, 
            { ingredientId: bife.id, quantityUsed: 1 },    
        ];
        
        pratoExecutivo = menuService.create(
            "Prato Executivo", 
            "Arroz, feijão e bife", 
            25.00, 
            "prato.jpg", 
            "Prato", 
            receitaPrato 
        );
    });

    test('deve calcular o custo da receita corretamente', () => {
        const cost = inventoryService.calculateRecipeCost(pratoExecutivo.recipe);
        expect(cost).toBe(13.80);
    });
    
    test('deve alertar sobre itens com estoque abaixo do nível mínimo', () => {
        bife.stockQuantity = 1; 
        
        const lowStock = inventoryService.checkLowStock();
        
        expect(lowStock.length).toBe(1);
        expect(lowStock[0].name).toBe('Bife (Unidade)');
    });
    
    test('não deve retornar itens se o estoque estiver OK', () => {
        const lowStock = inventoryService.checkLowStock();
        expect(lowStock.length).toBe(0);
    });

    test('deve dar baixa no estoque dos ingredientes após a venda de 5 pratos', () => {
        const quantitySold = 5;
        
        inventoryService.deductStock(pratoExecutivo.id, quantitySold);

        expect(arroz.stockQuantity).toBe(99); 
        
        expect(feijao.stockQuantity).toBe(49.5); 
        
        expect(bife.stockQuantity).toBe(15);
    });
    
    test('deve lançar erro se o estoque for insuficiente para o pedido', () => {
        const largeOrder = 21; 
        
        expect(() => inventoryService.deductStock(pratoExecutivo.id, largeOrder))
            .toThrow("Estoque insuficiente de Bife (Unidade) para completar o pedido.");
            
        expect(arroz.stockQuantity).toBe(100); 
        expect(bife.stockQuantity).toBe(20);
    });
});