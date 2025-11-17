const TableService = require('../src/TableService');
const Table = require('../src/Table');
const Order = require('../src/Order');
const MenuService = require('../src/MenuService'); 

describe('TableService (Gestão de Mesas e Pedidos)', () => {
    let menuService;
    let tableService;
    let table1, table2;
    let feijoada, refrigerante;

    beforeEach(() => {
        menuService = new MenuService();
        feijoada = menuService.create("Feijoada", "completa", 59.90, "img.jpg", "Prato");
        refrigerante = menuService.create("Coca-Cola", "lata", 8.00, "img.jpg", "Bebida");
        
        tableService = new TableService(menuService); 
        
        [table1, table2] = tableService.tables; 
    });

    test('deve inicializar mesas com status LIVRE', () => {
        expect(table1).toBeInstanceOf(Table);
        expect(table1.id).toBe(1);
        expect(table1.capacity).toBe(4);
        expect(tableService.getTableStatus(1)).toBe('LIVRE');
    });

    test('deve atualizar o status da mesa corretamente', () => {
        tableService.updateTableStatus(table1.id, 'RESERVADA');
        expect(tableService.getTableStatus(table1.id)).toBe('RESERVADA');
        
        tableService.updateTableStatus(table1.id, 'OCUPADA');
        expect(tableService.getTableStatus(table1.id)).toBe('OCUPADA');
    });

    test('deve lançar erro ao tentar usar status de mesa inválido', () => {
        expect(() => tableService.updateTableStatus(table1.id, 'EM_LIMPEZA'))
            .toThrow("Status de mesa inválido: EM_LIMPEZA");
    });

    test('deve registrar um novo pedido e mudar o status da mesa para OCUPADA', () => {
        const orderItems = [
            { menuItemId: feijoada.id, quantity: 1 },
            { menuItemId: refrigerante.id, quantity: 2 },
        ];
        
        const newOrder = tableService.registerOrder(table2.id, orderItems);
        
        expect(newOrder).toBeInstanceOf(Order);
        expect(newOrder.tableId).toBe(table2.id);
        expect(newOrder.items.length).toBe(2);
        expect(newOrder.status).toBe('EM_PREPARO');
        
        expect(tableService.getTableStatus(table2.id)).toBe('OCUPADA'); 
        
        expect(tableService.getOrdersByTable(table2.id).length).toBe(1);
    });

    test('deve lançar erro se o pedido contiver um item inexistente no cardápio', () => {
        const invalidOrderItems = [
            { menuItemId: 999, quantity: 1 } 
        ];
        
        expect(() => tableService.registerOrder(table1.id, invalidOrderItems))
            .toThrow("Item do pedido inválido: ID 999 não encontrado.");
            
        expect(tableService.getTableStatus(table1.id)).toBe('LIVRE');
    });

    test('deve atualizar o status de um pedido corretamente', () => {
        const orderItems = [{ menuItemId: feijoada.id, quantity: 1 }];
        const order = tableService.registerOrder(table1.id, orderItems);
        
        tableService.updateOrderStatus(order.id, 'PRONTO');
        expect(order.status).toBe('PRONTO');

        tableService.updateOrderStatus(order.id, 'ENTREGUE');
        expect(order.status).toBe('ENTREGUE');
        
        tableService.updateOrderStatus(order.id, 'FECHADO');
        expect(order.status).toBe('FECHADO');
    });

    test('deve lançar erro ao atualizar com status de pedido inválido', () => {
        const orderItems = [{ menuItemId: feijoada.id, quantity: 1 }];
        const order = tableService.registerOrder(table1.id, orderItems);
        
        expect(() => tableService.updateOrderStatus(order.id, 'CANCELADO'))
            .toThrow("Status de pedido inválido: CANCELADO");
    });

    test('deve enviar o pedido para a cozinha logo após o registro', () => {
        const sendSpy = jest.spyOn(tableService, 'sendToKitchen');
        
        const orderItems = [{ menuItemId: feijoada.id, quantity: 1 }];
        const newOrder = tableService.registerOrder(table1.id, orderItems);
        
        expect(sendSpy).toHaveBeenCalledTimes(1);
        
        expect(sendSpy).toHaveBeenCalledWith(newOrder);
        
        sendSpy.mockRestore(); 
    });
});