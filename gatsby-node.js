const axios = require("axios");
const chalk = require("chalk");
const log = console.log;

let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

if (activeEnv === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

exports.sourceNodes = async (
  { actions: { createNode }, createContentDigest, createNodeId },
  { supernode }
) => {
  log(chalk.black.bgWhite(`Getting the data from ${supernode}`));
  if (!supernode) {
    log(
      chalk.bgRed("You seem to be missing api details in your gatsby-config.js")
    );
    return;
  }

  let eachSupernode = [
    axios.get(`https://lora.supernode.matchx.io/api/gateways-loc`),
    axios.get(`https://lora.hunanhuaweikeji.com/api/gateways-loc`),
    axios.get("https://mxcxy.com/api/gateways-loc"),
    axios.get("https://lora.rosanetworks.com/api/gateways-loc"),
    axios.get("https://ausn.matchx.io"),
    axios.get("https://supernode.iot-ducapital.net"),
    axios.get("https://ussn.matchx.io"),
    axios.get("https://k-supernode.com"),
  ];

  const getData = await axios
    .all(eachSupernode)
    .then((responses) => responses.map((resp) => resp.data.result || []))
    .catch(function (error) {
      console.log(error);
    });

  const result = getData.flat();
  if (result) {
    let count = 0;
    result.forEach((location) => {
      count++;
      const nodeContent = JSON.stringify(location);
      const nodeMeta = {
        id: createNodeId(`mxcSupernode-${count}`),
        parent: null,
        children: [],
        internal: {
          type: `mxcSupernode`,
          content: nodeContent,
          contentDigest: createContentDigest(location),
        },
      };
      const node = Object.assign({}, location, nodeMeta);
      createNode(node);
    });
  }
};
