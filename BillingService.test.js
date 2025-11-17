const BillingService = require('../src/BillingService');
const TableService = require('../src/TableService');
const MenuService = require('../src/MenuService'); 
const Table = require('../src/Table'); 

describe('BillingService (Financeiro e Cobrança)', () => {
    let menuService;
    let tableService;
    let billingService;
    let feijoada, refrigerante;
    let table1, order1;

    beforeEach(() => {
        menuService = new MenuService();
        tableService = new TableService(menuService);
        billingService = new BillingService(tableService, menuService);
        
        feijoada = menuService.create("Feijoada", "completa", 50.00, "img.jpg", "Prato"); 
        refrigerante = menuService.create("Coca-Cola", "lata", 10.00, "img.jpg", "Bebida"); 

        table1 = tableService.tables[0];
        order1 = tableService.registerOrder(table1.id, [
            { menuItemId: feijoada.id, quantity: 1 },
            { menuItemId: refrigerante.id, quantity: 2 },
        ]);
    });

    test('deve calcular o subtotal, taxa de serviço (10%) e o total sem desconto', () => {
        const result = billingService.calculateTotal(order1.id);
        
        expect(result.subtotal).toBe(70.00);
        expect(result.serviceFee).toBe(7.00); 
        expect(result.total).toBe(77.00);
        expect(result.discountAmount).toBe(0.00);
    });

    test('deve aplicar um desconto de 10% no total (incluindo taxa de serviço)', () => {
        const result = billingService.calculateTotal(order1.id, 0.10); 
        expect(result.discountAmount).toBe(7.70);
        expect(result.total).toBe(69.30);
    });
    
    test('deve processar pagamento em dinheiro, fechar o pedido e liberar a mesa', () => {
        const totalPaid = 80.00; 
        const requiredTotal = 77.00; 
        
        const result = billingService.processPayment(order1.id, 'DINHEIRO', totalPaid);
        
        expect(tableService.getTableStatus(table1.id)).toBe('LIVRE');
        
        const closedOrder = tableService.orders.find(o => o.id === order1.id);
        expect(closedOrder.status).toBe('FECHADO');
        
        expect(result.change).toBe(3.00); 
        
        expect(result.receipt).toContain(`NOTA FISCAL - Pedido #${order1.id}`);
        expect(result.receipt).toContain(`Total: R$77.00`);
    });

    test('deve lançar erro se o valor pago for insuficiente', () => {
        const totalPaid = 70.00; 
        
        expect(() => billingService.processPayment(order1.id, 'CARTAO', totalPaid))
            .toThrow("Pagamento insuficiente. Total necessário: R$77.00.");
            
        expect(tableService.getTableStatus(table1.id)).toBe('OCUPADA');
    });

    test('deve lançar erro ao tentar calcular ou pagar um pedido já fechado', () => {
        billingService.processPayment(order1.id, 'PIX', 77.00); 
        
        expect(() => billingService.calculateTotal(order1.id))
            .toThrow(`Pedido ${order1.id} já está fechado/pago.`);
            
        expect(() => billingService.processPayment(order1.id, 'DINHEIRO', 77.00))
            .toThrow(`Pedido ${order1.id} já está fechado/pago.`);
    });
});