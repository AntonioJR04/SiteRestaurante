class ReportingService {
    /**
     * @param {BillingService} billingService - Para acessar o histórico de vendas (this.sales).
     * @param {InventoryService} inventoryService - Para calcular o custo de cada item vendido.
     * @param {MenuService} menuService - Para buscar o item vendido e sua receita.
     */
    constructor(billingService, inventoryService, menuService) {
        this.billingService = billingService;
        this.inventoryService = inventoryService;
        this.menuService = menuService;
    }


        calculateSaleProfit(orderId) {
        const order = this.billingService.tableService.orders.find(o => o.id === orderId);
        
        if (!order) {
            throw new Error(`Pedido ID ${orderId} não encontrado no sistema.`);
        }
        
        if (order.status !== 'FECHADO') {
             throw new Error("Pedido não está fechado. O lucro só pode ser calculado para vendas finalizadas.");
        }
        
        const sale = this.billingService.sales.find(s => s.orderId === orderId);

        if (!sale) {
             throw new Error(`Falha de lógica grave: Pedido ${orderId} está FECHADO, mas a Venda não foi registrada.`);
        }

        let totalCost = 0;

        for (const item of order.items) {
            const menuItem = this.menuService.getById(item.menuItemId);

            const unitCost = this.inventoryService.calculateRecipeCost(menuItem.recipe); 
            totalCost += unitCost * item.quantity;
        }

        const revenue = sale.total; 
        const profit = revenue - totalCost; 

        return {
            revenue: parseFloat(revenue.toFixed(2)),
            totalCost: parseFloat(totalCost.toFixed(2)),
            profit: parseFloat(profit.toFixed(2)),
        };
    }


    /**
     * Filtra as vendas por período e agrupa os dados de lucro.
     * @param {string} period 'daily', 'weekly', 'monthly'
     */
    generateSalesReport(period = 'daily') {
        const now = new Date();
        let startDate;

        if (period === 'daily') {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        } else if (period === 'weekly') {
            const dayOfWeek = now.getDay(); // 0 (Domingo) a 6 (Sábado)
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
            startDate.setHours(0, 0, 0, 0);
        } else if (period === 'monthly') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else {
            throw new Error(`Período de relatório '${period}' inválido.`);
        }

        const filteredSales = this.billingService.sales.filter(sale => sale.date >= startDate);

        let totalRevenue = 0;
        let totalCost = 0;
        let salesCount = 0;

        for (const sale of filteredSales) {
            const { revenue, totalCost: saleCost } = this.calculateSaleProfit(sale.orderId);
            
            totalRevenue += revenue;
            totalCost += saleCost;
            salesCount++;
        }
        
        const netProfit = totalRevenue - totalCost;

        return {
            period,
            startDate: startDate.toLocaleDateString(),
            endDate: now.toLocaleDateString(),
            salesCount,
            totalRevenue: parseFloat(totalRevenue.toFixed(2)),
            totalCost: parseFloat(totalCost.toFixed(2)),
            netProfit: parseFloat(netProfit.toFixed(2)),
            averageTicket: salesCount > 0 ? parseFloat((totalRevenue / salesCount).toFixed(2)) : 0,
        };
        }
getMenuOrderStatistics() {
        const itemCounts = {};
        let totalItemsSold = 0;

        const allOrders = this.billingService.tableService.orders;

        for (const order of allOrders) {
            if (order.status !== 'FECHADO' && order.status !== 'PAGO') {
                continue; 
            }
            
            for (const item of order.items) {
                const menuItem = this.menuService.getById(item.menuItemId);
                const itemName = menuItem.name;
                const quantity = item.quantity;

                if (itemCounts[itemName]) {
                    itemCounts[itemName].quantity += quantity;
                } else {
                    itemCounts[itemName] = { 
                        name: itemName, 
                        quantity: quantity,
                        id: item.menuItemId,
                        recipeCost: this.inventoryService.calculateRecipeCost(menuItem.recipe),
                        salePrice: menuItem.price
                    };
                }

                totalItemsSold += quantity;
            }
        }

        const statistics = Object.values(itemCounts).map(item => {
            const percentage = totalItemsSold > 0 
                ? (item.quantity / totalItemsSold) * 100 
                : 0;
            
            return {
                ...item,
                percentage: parseFloat(percentage.toFixed(2)) 
            };
        });

        return {
            totalItemsSold,
            itemStatistics: statistics.sort((a, b) => b.quantity - a.quantity) 
        };
    }
}

module.exports = ReportingService;