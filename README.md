A minimal plugin allowing you to pull publicly accessible data from an MXC Supernode.

Currently it only supports the Gateway Locations API.

## How to Install

Using NPM:
`npm install --save gatsby-source-mxc-supernode`

Using Yarn:
`yarn add gatsby-source-mxc-supernode`

## Initial Setup

Go to your `gatsby-config.js` file and add the following to `plugins: []` :

```
    {
          resolve: `gatsby-source-mxc-supernode`,
          options: {
            supernode: [`https://lora.supernode.matchx.io`,`https://lora.hunanhuaweikeji.com`,'https://mxcxy.com','https://lora.rosanetworks.com','https://k-supernode.com'],
          },
        },
```
