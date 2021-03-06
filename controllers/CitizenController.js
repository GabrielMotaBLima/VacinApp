const CitizenModel = require('../models/citizen')
const status = require('../helpers/http-status')
const _ = require('lodash');
const clientMysql = require('./Mysql')

class CitizenController {
    async getAll(req, res) {
        const citizens = await clientMysql.citizens.findAndCountAll({
            order: [
                ['name', 'ASC'],
                ['susNumber', 'ASC'],
            ],
        })
        if (citizens) return res.send({
            "status": status.sucess,
            "citizens": citizens
        })
        else return res.send(status.not_found)
    }

    async getOrderByCpf(req, res) {
        const citizens = await clientMysql.citizens.findAndCountAll({
            order: [
                ['cpf']
            ]
        })
        if (citizens) return res.send({
            "status": status.sucess,
            "citizens": citizens
        })
        else return res.send(status.not_found)
    }


    /**
     * ESTÁ FUNCIONANDO, ATENÇÃO AO LANÇAR A REQUEST NO POSTMAN PARA NÃO LANÇAR
     * UM SUSNUMBER(PK) QUE JA EXISTA, VAI DAR ERRO
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async create(req, res) {
        try {
            const data = req.body
            const citizen = await clientMysql.citizens.create(data)
            if (citizen) return res.send({
                "status": status.sucess,
                "citizen registered:": citizen
            })
            else return res.send(status.bad_request)
        } catch (error) {
            return res.send(status.server_error)
        }
    }

    /**
     * FUNCIONANDO
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async update(req, res) {
        try {
            const data = req.body
            const susNumber = req.params
            const citizen = await clientMysql.citizens.update(data, {
                where: {
                    susNumber,
                }
            })
            if (citizen) return res.send({
                "status": status.sucess,
                "citizen updated to": citizen
            })
            else return res.send(status.bad_request)
        } catch (error) {
            return res.send(status.server_error)
        }
    }

    /**
     * FUNCIONANDO
     * @param {} req 
     * @param {*} res 
     * @returns 
     */
    async show(req, res) {
        try {
            const susNumber = req.params.id;
            const citizen = await clientMysql.citizens.findOne({
                where: {
                    susNumber
                }
            })
            if (citizen) return res.send({
                status: status.sucess,
                "citizen": citizen
            })
            else return res.send(status.not_found)

        } catch (error) {
            return res.send(status.server_error)
        }
    }

    /**
     * FUNCIONANDO
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async delete(req, res) {
        try {
            const susNumber = req.params.id
            const citizen = await clientMysql.citizens.destroy({
                where: {
                    susNumber
                }
            })
            if (citizen) return res.send({
                "send": status.sucess,
                "citizen removed": citizen
            })
            else return res.send(status.not_found)

        } catch (error) {
            return res.send(status.server_error)
        }
    }
}

module.exports = new CitizenController()