const CustomError = require("../utils/CustomError");

class CRUD {
    constructor(Model, serviceName) {
        this.Model = Model;
        this.serviceName = serviceName;
    }

    async getAll() {
        const data = await this.Model.find().lean();
        return data;
    }
    async getOne(_id) {
        const data = await this.Model.findOne({_id}).lean();
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data
    }
    async updateOne(_id, body) {
        const data = await this.Model.findByIdAndUpdate(_id, { $set: body }, { new: true });
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data;
    }
    async deleteOne(_id) {
        const data = await this.Model.findByIdAndDelete(_id);
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data;
    }
}


module.exports = CRUD;