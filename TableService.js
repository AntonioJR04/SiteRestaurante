const Table = require('./Table');
const Order = require('./Order');

class TableService {
    /**
     * @param {MenuService} menuService Instância do serviço de cardápio para validação de itens.
     */
    constructor(menuService) {
        this.menuService = menuService;
        this.tables = [];
        this.orders = [];
        this.nextTableId = 1;
        this.nextOrderId = 1;

        this.createTable(4);
        this.createTable(2);
        this.createTable(6);
    }

    
    createTable(capacity) {
        if (capacity <= 0) {
            throw new Error("A capacidade da mesa deve ser positiva.");
        }
        const newTable = new Table(this.nextTableId++, capacity);
        this.tables.push(newTable);
        return newTable;
    }

    getTableStatus(id) {
        const table = this.tables.find(t => t.id === id);
        if (!table) {
            throw new Error(`Mesa com ID ${id} não encontrada.`);
        }
        return table.status;
    }

    updateTableStatus(id, newStatus) {
        const table = this.tables.find(t => t.id === id);
        if (!table) {
            throw new Error(`Mesa com ID ${id} não encontrada.`);
        }
        const validStatuses = ['LIVRE', 'OCUPADA', 'RESERVADA'];
        if (!validStatuses.includes(newStatus)) {
            throw new Error(`Status de mesa inválido: ${newStatus}`);
        }
        table.status = newStatus;
        return table;
    }
    

    /**
     * Registra um novo pedido para uma mesa.
     * @param {number} tableId - ID da mesa que fez o pedido.
     * @param {Array<{menuItemId: number, quantity: number}>} items - Lista de itens e quantidades.
     * @returns {Order} O pedido criado.
     */
        registerOrder(tableId, items) {
        const table = this.tables.find(t => t.id === tableId);
        if (!table) {
            throw new Error(`Não é possível registrar pedido: Mesa ${tableId} não existe.`);
        }

        for (const item of items) {
            try {
                this.menuService.getById(item.menuItemId);
            } catch (error) {
                throw new Error(`Item do pedido inválido: ID ${item.menuItemId} não encontrado.`);
            }
        }

        const newOrder = new Order(this.nextOrderId++, tableId, items, 'EM_PREPARO');
        this.orders.push(newOrder);

        if (table.status === 'LIVRE' || table.status === 'RESERVADA') {
            this.updateTableStatus(tableId, 'OCUPADA');
        }
        
        this.sendToKitchen(newOrder); 
        
        return newOrder;
    }

    /**
     * Atualiza o status de um pedido.
     */
    updateOrderStatus(orderId, newStatus) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) {
            throw new Error(`Pedido com ID ${orderId} não encontrado.`);
        }
        
        const validStatuses = ['EM_PREPARO', 'PRONTO', 'ENTREGUE', 'FECHADO'];
        if (!validStatuses.includes(newStatus)) {
             throw new Error(`Status de pedido inválido: ${newStatus}`);
        }
        
        order.status = newStatus;
        return order;
    }
    
    /**
     * Simula o envio do pedido para a cozinha.
     * No mundo real, isso seria uma chamada a outro sistema/fila (como RabbitMQ).
     */
    sendToKitchen(order) {
        return `Pedido ${order.id} enviado para preparo.`; 
    }

    getOrdersByTable(tableId) {
        return this.orders.filter(o => o.tableId === tableId);
    }
}

module.exports = TableService;