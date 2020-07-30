const axios = require('axios')
const chalk = require('chalk')
const log = console.log

let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

if (activeEnv == 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

exports.sourceNodes = async (
  { actions: { createNode }, createContentDigest, createNodeId },
  { api }
) => {
  log(chalk.black.bgWhite(`Getting the data from ${api}`))
  if (!api) {
    log(
      chalk.bgRed('You seem to be missing api details in your gatsby-config.js')
    )
    return
  }
  let result

  try {
    result = await axios.get(`${api}/api/gateways-loc`, {
      responseType: 'json',
      headers: { 'x-api-key': api },
    })
  } catch (err) {
    log(chalk.bgRed('There was an error'))
    log(err)
  }

  if (result.data) {
    let count = 1
    for (const [key, value] of Object.entries(result.data)) {
      let locObj = result.data[key]

      let count = 0

      locObj.forEach((location) => {
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
}
