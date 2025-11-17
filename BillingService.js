class BillingService {
    /**
     * @param {TableService} tableService - Para buscar o pedido.
     * @param {MenuService} menuService - Para buscar o preço dos itens.
     */
    constructor(tableService, menuService) {
        this.tableService = tableService;
        this.menuService = menuService;
        this.sales = []; 
    }


    calculateTotal(orderId, discountRate = 0) {
        const order = this.tableService.orders.find(o => o.id === orderId);
        if (!order) {
            throw new Error(`Pedido com ID ${orderId} não encontrado.`);
        }
        if (order.status === 'FECHADO') {
            throw new Error(`Pedido ${orderId} já está fechado/pago.`);
        }

        let subtotal = 0;
        
        for (const item of order.items) {
            try {
                const menuItem = this.menuService.getById(item.menuItemId);
                subtotal += menuItem.price * item.quantity;
            } catch (e) {
                throw new Error(`Item ${item.menuItemId} no pedido não existe mais no cardápio.`);
            }
        }
        
        const SERVICE_RATE = 0.10; 
        const serviceFee = subtotal * SERVICE_RATE;
        
        const totalWithService = subtotal + serviceFee;
        
        const discountAmount = totalWithService * discountRate;
        const total = totalWithService - discountAmount;

        return {
            subtotal: parseFloat(subtotal.toFixed(2)),
            serviceFee: parseFloat(serviceFee.toFixed(2)),
            discountAmount: parseFloat(discountAmount.toFixed(2)),
            total: parseFloat(total.toFixed(2)),
        };
    }


    processPayment(orderId, paymentMethod, totalPaid) {
        const calculation = this.calculateTotal(orderId);
        const requiredTotal = calculation.total;

        if (totalPaid < requiredTotal) {
            throw new Error(`Pagamento insuficiente. Total necessário: R$${requiredTotal.toFixed(2)}.`);
        }

        if (paymentMethod === 'PIX' || paymentMethod === 'CARTAO') {
            console.log(`Processando ${paymentMethod}... Transação Aprovada.`);
        }

        const order = this.tableService.updateOrderStatus(orderId, 'FECHADO');

        this.tableService.updateTableStatus(order.tableId, 'LIVRE');

        const receipt = this.issueInvoice(orderId, requiredTotal);

        this.sales.push({ 
            orderId, 
            total: requiredTotal, 
            paymentMethod, 
            date: new Date() 
        });

        return {
            receipt,
            change: parseFloat((totalPaid - requiredTotal).toFixed(2))
        };
    }

    issueInvoice(orderId, total) {
        return `NOTA FISCAL - Pedido #${orderId} - Total: R$${total.toFixed(2)} - Emitida em ${new Date().toLocaleDateString()}`;
    }
}

module.exports = BillingService;