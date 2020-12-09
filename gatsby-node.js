const axios = require('axios')
const chalk = require('chalk')
const data = require('./globalLocations.json')
const m2ProData = require('./m2ProLocations.json')

const log = console.log

exports.sourceNodes = async (
    { actions: { createNode, createTypes }, createContentDigest, createNodeId },
    { supernode }
) => {
    log(chalk.black.bgWhite(`Getting the data from ${supernode}`))
    if (!supernode) {
        log(
            chalk.bgRed(
                'You seem to be missing api details in your gatsby-config.js'
            )
        )
        return
    }

    // Get the Gateway Location API using Axios

    const eachGatewayLocation = supernode.map((supernode) => {
        return axios.get(`${supernode}/api/gateways-loc`)
    })

    const getData = await axios
        .all(eachGatewayLocation)
        .then((responses) => responses.map((resp) => resp.data.result || []))
        .catch(function (error) {
            console.log(error)
        })

    // Create Nodes for Gateway Locations

    const result = getData.flat()

    // Introduce custom M2Pro File

    console.log(m2ProData)

    for (let i = 0; i < m2ProData.length; i++) {
        m2ProData[i].location.latitude = +m2ProData[i].location.latitude
        m2ProData[i].location.longitude = +m2ProData[i].location.longitude
    }

    for (let i = 0; i < m2ProData.length; i++) {
        result.push(m2ProData[i])
    }


    // Introduce external data file

    for (let i = 0; i < data.length; i++) {
        data[i].location.latitude = +data[i].location.latitude
        data[i].location.longitude = +data[i].location.longitude
    }
    function setNode(dataSet, type) {
        if (dataSet) {
            let count = 0
            dataSet.forEach((location) => {
                count++
                const nodeContent = JSON.stringify(location)

                const nodeMeta = {
                    id: createNodeId(`${type}-${count}`),
                    parent: null,
                    children: [],
                    internal: {
                        type: type,
                        content: nodeContent,
                        contentDigest: createContentDigest(location),
                    },
                }
                const node = Object.assign({}, location, nodeMeta)
                createNode(node)
            })
        }
    }

    setNode(result, 'mxcSupernode')
    setNode(data, 'lpwanGateways')
}
