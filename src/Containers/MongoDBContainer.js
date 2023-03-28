import mongoose from "mongoose";

class MongoDBContainer {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }
/**
 * 
 * @returns a MongoDb Container that can be extended through the DAO and the methods to be used for handling the information
 */
  async getAll() {
    const response = await this.model.find().lean();
    return response;
  }

  async save(element) {
    const response = await this.model.create(element);
    console.log(response)
    return response;
  }

  async getById(id) {
    const response = await this.model.findById(id);

    return response;
  }

  async getOne(options) {
    const response = await this.model.findOne(options).lean();
    return response;
  }

  async updateById(id, newData) {
    const response = await this.model.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return response;
  }

  async deleteById(id) {
    const response = await this.model.findByIdAndDelete(id);
    return response;
  }


   async updateStockByCode (code, stock) {
    try {
      const updatedProduct = await this.model.findOneAndUpdate(
        { code },
        { $set: { stock } },
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating stock: ${error.message}`);
    }
  };
  
  async getByCode (code) {
    try {
      const product = await this.model.findOne({ code });
      return product;
    } catch (error) {
      throw new Error(`Error getting product by code: ${error.message}`);
    }
  };

  async updateStock (id, newStock) {
    const result = await this.model.updateOne(
      { _id: id },
      { $set: { stock: newStock } }
      
    )
    console.log(`id ${id} and stock ${newStock}`)
    return result.nModified;
  };

}

export { MongoDBContainer };
