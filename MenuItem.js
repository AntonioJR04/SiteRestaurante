class MenuItem {
    constructor(id, name, description, price, imageUrl, type, recipe = []) { 
        this.id = id; 
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.type = type; 
        this.recipe = recipe;
    }
}

module.exports = MenuItem;