const ReportingService = require('../src/ReportingService');
const BillingService = require('../src/BillingService');
const InventoryService = require('../src/InventoryService');
const MenuService = require('../src/MenuService');
const TableService = require('../src/TableService');

describe('ReportingService (Relatórios e Lucro)', () => {
    let menuService, tableService, billingService, inventoryService, reportingService;
    let feijoada, arroz, bife;
    let order1, order2, order3;
    let table1, table2;

    jest.useFakeTimers();

    beforeEach(() => {
        menuService = new MenuService();
        tableService = new TableService(menuService);
        inventoryService = new InventoryService(menuService);
        billingService = new BillingService(tableService, menuService);
        reportingService = new ReportingService(billingService, inventoryService, menuService);

        arroz = inventoryService.addIngredient("Arroz", 100, 'kg', 5.00, 10); 
        bife = inventoryService.addIngredient("Bife", 20, 'unidade', 15.00, 2); 

        const receitaFeijoada = [
            { ingredientId: arroz.id, quantityUsed: 0.1 }, 
            { ingredientId: bife.id, quantityUsed: 1 },   

        ];
        feijoada = menuService.create("Feijoada", "completa", 35.00, "img.jpg", "Prato", receitaFeijoada); 
      
        table1 = tableService.tables[0];
        table2 = tableService.tables[1];

        jest.setSystemTime(new Date('2025-10-13T10:00:00.000Z')); 
        order1 = tableService.registerOrder(table1.id, [{ menuItemId: feijoada.id, quantity: 2 }]); 
        billingService.processPayment(order1.id, 'CARTAO', 77.00); 

        jest.setSystemTime(new Date('2025-10-12T15:00:00.000Z')); 
        order2 = tableService.registerOrder(table2.id, [{ menuItemId: feijoada.id, quantity: 1 }]); 
        billingService.processPayment(order2.id, 'PIX', 38.50); 
        
        jest.setSystemTime(new Date('2025-09-01T15:00:00.000Z')); 
        order3 = tableService.registerOrder(table1.id, [{ menuItemId: feijoada.id, quantity: 1 }]); 
        billingService.processPayment(order3.id, 'DINHEIRO', 38.50); 
        
        jest.setSystemTime(new Date('2025-10-13T12:00:00.000Z')); 
    });
    
    afterAll(() => {
        jest.useRealTimers(); 
    });

    test('deve calcular corretamente o custo, receita e lucro de uma venda', () => {
        const profitDetails = reportingService.calculateSaleProfit(order1.id);

        expect(profitDetails.revenue).toBe(77.00);     
        expect(profitDetails.totalCost).toBe(31.00);   
        expect(profitDetails.profit).toBe(46.00);       
    });

    test('deve lançar erro se tentar calcular lucro de um pedido não fechado', () => {
        const orderDraft = tableService.registerOrder(table1.id, [{ menuItemId: feijoada.id, quantity: 1 }]);
        
        expect(() => reportingService.calculateSaleProfit(orderDraft.id))
            .toThrow("Pedido não está fechado. O lucro só pode ser calculado para vendas finalizadas.");
    });

    test('deve gerar relatório DIÁRIO com dados corretos (apenas Venda 1)', () => {
        const report = reportingService.generateSalesReport('daily');

        expect(report.salesCount).toBe(1); 
        expect(report.totalRevenue).toBe(77.00);
        expect(report.totalCost).toBe(31.00);
        expect(report.netProfit).toBe(46.00);
        expect(report.averageTicket).toBe(77.00);
        expect(report.period).toBe('daily');
    });

    test('deve gerar relatório SEMANAL com dados corretos (Venda 1 + Venda 2)', () => {
        const report = reportingService.generateSalesReport('weekly');
        
        const expectedRevenue = 77.00 + 38.50; 
        const expectedCost = 31.00 + 15.50;

        expect(report.salesCount).toBe(2);
        expect(report.totalRevenue).toBe(expectedRevenue); 
        expect(report.totalCost).toBe(expectedCost);      
        expect(report.netProfit).toBe(69.00);
        expect(report.averageTicket).toBe(57.75); 
    });

    test('deve gerar relatório MENSAL, excluindo vendas do mês anterior', () => {
        const report = reportingService.generateSalesReport('monthly');
        
        const expectedRevenue = 77.00 + 38.50; 

        expect(report.salesCount).toBe(2);
        expect(report.totalRevenue).toBe(expectedRevenue);
    });
     test('deve registrar e exibir a porcentagem e quantidade dos itens pedidos', () => {

        const suco = inventoryService.addIngredient("Laranja", 50, 'unidade', 1.00, 5); 
        const receitaSuco = [
            { ingredientId: suco.id, quantityUsed: 2 }, 
        ];
        const sucoLaranja = menuService.create("Suco de Laranja", "natural", 8.00, "img.jpg", "Bebida", receitaSuco);
        
 
        jest.setSystemTime(new Date('2025-10-13T16:00:00.000Z'));
        const order4 = tableService.registerOrder(table2.id, [{ menuItemId: sucoLaranja.id, quantity: 4 }]); 
        billingService.processPayment(order4.id, 'DINHEIRO', 35.20); 
        
        const stats = reportingService.getMenuOrderStatistics();

        expect(stats.totalItemsSold).toBe(8);
        expect(stats.itemStatistics).toHaveLength(2); 

        const feijoadaStats = stats.itemStatistics.find(item => item.name === feijoada.name);
        expect(feijoadaStats.quantity).toBe(4);
        expect(feijoadaStats.percentage).toBe(50.00);
        expect(feijoadaStats.salePrice).toBe(35.00);

        const sucoStats = stats.itemStatistics.find(item => item.name === sucoLaranja.name);
        expect(sucoStats.quantity).toBe(4);
        expect(sucoStats.percentage).toBe(50.00);
        expect(sucoStats.recipeCost).toBe(2.00); 
    });
    

});