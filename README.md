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
        supernode: 'https://supernode.matchx.io',
      },
    }
```

`supernode` refers to the supernode URL from which you want to get the API.
