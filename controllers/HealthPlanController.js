const status = require('../helpers/http-status')
const _ = require('lodash');
const clientMysql = require('./Mysql')


class HealthPlanController {

    /**
     * funcionando
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async create(req, res) {
        const data = req.body
        const susNumber = _.get(data, 'susNumber')
        const citizen = await clientMysql.citizens.findByPk(susNumber)
        if (citizen) {
            const healthPlan = await clientMysql.healthPlans.create({
                description: _.get(data, 'description'),
                citizenSusNumber: _.get(citizen, 'dataValues.susNumber')
            })
            if (healthPlan) {
                return res.send({
                    status: status.success,
                    "healthPlan registered": healthPlan
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

    async getAll(req, res) { }

    /**
     * funcionando
     * @param {} req 
     * @param {*} res 
     * @returns 
     */
    async delete(req, res) {
        try {
            const id = req.params.id
            const healthPlan = await clientMysql.healthPlans.destroy({
                where: {
                    id
                }
            })
            if (healthPlan) return res.send({
                status: status.sucess,
                "healthPlan removed": healthPlan
            })
            else return res.send(status.not_found)
        } catch (error) {
            return res.send(status.server_error)
        }
    }
}

module.exports = new HealthPlanController()