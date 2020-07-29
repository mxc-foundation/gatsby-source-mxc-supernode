/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.org/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
 // exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")


const axios = require('axios').default


const POST_NODE_TYPE = `Location`

$counter = 0;


exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
}) =>{
const { createNode, touchNode, deleteNode } = actions
const data = await axios.get("https://supernode.matchx.io/api/gateways-loc")
$counter = 0

const locations = data.data


data.data.location.forEach(location =>
    $counter++,
    createNode({
        
        ...location,
        id: createNodeId(`${POST_NODE_TYPE}-${counter}`),
        parent: null,
        children: [],
        internal: {
            type: POST_NODE_TYPE,
            content: JSON.stringify(location),
            contentDigest: createContentDigest(location),
        },
    })
    )}