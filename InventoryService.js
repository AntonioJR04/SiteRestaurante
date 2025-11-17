const Ingredient = require('./Ingredient');

class InventoryService {
    /**
     * @param {MenuService} menuService - Para buscar as receitas dos itens.
     */
    constructor(menuService) {
        this.menuService = menuService;
        this.ingredients = [];
        this.nextIngredientId = 1;
    }

    
    addIngredient(name, stockQuantity, unit, costPerUnit, minStockLevel) {
        const newIngredient = new Ingredient(
            this.nextIngredientId++,
            name,
            stockQuantity,
            unit,
            costPerUnit,
            minStockLevel
        );
        this.ingredients.push(newIngredient);
        return newIngredient;
    }
    
    getIngredientById(id) {
        const ingredient = this.ingredients.find(i => i.id === id);
        if (!ingredient) {
            throw new Error(`Ingrediente com ID ${id} não encontrado.`);
        }
        return ingredient;
    }


    calculateRecipeCost(recipe) {
        let totalCost = 0;
        for (const { ingredientId, quantityUsed } of recipe) {
            const ingredient = this.getIngredientById(ingredientId);
            totalCost += ingredient.costPerUnit * quantityUsed;
        }
        return parseFloat(totalCost.toFixed(2));
    }
    
    checkLowStock() {
        const lowStockItems = this.ingredients.filter(ing => 
            ing.stockQuantity <= ing.minStockLevel
        );
        return lowStockItems;
    }

    deductStock(menuItemId, quantitySold) {
        let menuItem;
        try {
            menuItem = this.menuService.getById(menuItemId); 
        } catch (e) {
            throw new Error(`Item de menu com ID ${menuItemId} não encontrado.`); 
        }
        
        if (!menuItem.recipe || menuItem.recipe.length === 0) {
             throw new Error(`Item ${menuItemId} não tem receita cadastrada.`); 
        }

        
        const ingredientsToDeduct = [];

        for (const { ingredientId, quantityUsed } of menuItem.recipe) {
            const ingredient = this.getIngredientById(ingredientId);
            const totalDeduction = quantityUsed * quantitySold;
            
            if (ingredient.stockQuantity < totalDeduction) {
                throw new Error(`Estoque insuficiente de ${ingredient.name} para completar o pedido.`);
            }
            
            ingredientsToDeduct.push({ ingredient, totalDeduction });
        }


        for (const { ingredient, totalDeduction } of ingredientsToDeduct) {
            ingredient.stockQuantity -= totalDeduction;
        }

        return true;
    }
}

module.exports = InventoryService;