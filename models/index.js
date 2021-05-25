const Sequelize = require("sequelize")
const db = new Sequelize("postgres://localhost:5432/integradorback",{
    logging: false
})

class Product extends Sequelize.Model {}

Product.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    symPrice: {
        type: Sequelize.VIRTUAL,
        get(){
            return `$${this.getDataValue('price')},00`
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        set(){
            if(this.getDataValue('stock') == 0)
            this.available = false
        }
    },
    stock: {
        type: Sequelize.INTEGER
    },
    // category: {
    //     id: Sequelize.INTEGER
    // }
}, { sequelize: db, modelName: 'product'})


class Category extends Sequelize.Model {}
Category.init({
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize:db, modelName: 'category'})


Product.addHook('beforeCreate', (product) => {
    if(product.stock == 0)
    product.name = `-NO DISPONIBLE- ${product.name}`
})


Product.getNoAvailables = () => {
        return findAll({where: stock = 0})
}


Product.prototype.ganancia = () => {
    return this.getDataValue('stock') * this.getDataValue('price')
}


//CORREGIR BELONGS TO MANY
// const ProductCategory = Sequelize.define('product_category', {
//     role: Sequelize.STRING
// })
// Product.belongsToMany(Category, {through: ProductCategory})


module.exports = {
    Product: Product,
    Category: Category,
    db
};  

