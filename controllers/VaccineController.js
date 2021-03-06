const CitizenModel = require('../models/citizen')
const status = require('../helpers/http-status')
const _ = require('lodash');
const clientMysql = require('./Mysql')


class VaccineController {

    async create(req, res) {
        const data = req.body
        const idVaccineWallet = _.get(data, 'idVaccineWallet')
        const vaccineWallet = await clientMysql.vaccineWallets.findByPk(idVaccineWallet)
        const test = vaccineWallet
        if (vaccineWallet) {
            const vaccine = await clientMysql.vaccines.create({
                description: _.get(data, 'description'),
                type: _.get(data, 'type'),
                idVaccineWallet: _.get(vaccineWallet, 'dataValues.id')
            })
            if (vaccine) {
                return res.send({
                    status: status.success,
                    "vaccine registered": vaccine
                })
            }
        }
        else {
            return res.send({
                status: status.not_found
            })
        }
    }

    async update(req, res) { }

    async show(req, res) { }

    async getAll(req, res){}

    async delete(req, res) { }


}

module.exports = new VaccineController()