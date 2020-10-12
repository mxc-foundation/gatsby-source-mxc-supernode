const axios = require('axios')
const chalk = require('chalk')
const log = console.log

exports.sourceNodes = async (
    { actions: { createNode }, createContentDigest, createNodeId },
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

    const eachGatewayLocation = supernode.map(supernode => {
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
    if (result) {
        let count = 0
        result.forEach((location) => {
            count++
            const nodeContent = JSON.stringify(location)
            const nodeMeta = {
                id: createNodeId(`mxcSupernode-${count}`),
                parent: null,
                children: [],
                internal: {
                    type: `mxcSupernode`,
                    content: nodeContent,
                    contentDigest: createContentDigest(location),
                },
            }
            const node = Object.assign({}, location, nodeMeta)
            createNode(node)
        })
    }
}
