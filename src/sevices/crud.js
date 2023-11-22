const CustomError = require('../utils/CustomError')

class CRUD {
    constructor(Model, serviceName) {
        this.Model = Model
        this.serviceName = serviceName
    }

    async create(fields) {
        const data = await this.Model.create(fields)
        return data
    }

    async getAll({limit=10, sort="createdAt", page=1} = {}, query={}, populate='') {
        // TODO: change pagination to cursor based
        console.log('herrr')
        console.log({limit, sort, page})
        const lmt = limit > 0 && limit <50 ? Number(limit) : 20
        const srt = sort || { createdAt: -1 }
        const pge = page || 1
        const skp = Number(pge * lmt -  lmt) || 0
        const data = await Promise.all([
            this.Model.find(query).sort(srt).skip(skp).limit(lmt).lean().populate(populate),
            this.Model.find(query).countDocuments()
        ])

    if (pge * lmt < data[1]) {
        return {
          page: pge,
          next: pge + 1,
          limit: lmt,
          data: data[0],
          total: data[1],
        };
      }
      return {
        page: pge,
        next: null,
        limit: lmt,
        data: data[0],
        total: data[1],
      };
    }

    async getOne(_id) {
        const data = await this.Model.findOne({ _id }).lean()
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data
    }

    async updateOne(_id, body) {
        const data = await this.Model.findByIdAndUpdate(_id, { $set: body }, { new: true })
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data
    }

    async deleteOne(_id) {
        const data = await this.Model.findByIdAndDelete(_id)
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data
    }
}

module.exports = CRUD
