// const fs = require("fs")
// // const { Location, ReturnType, CodeLanguage } = require("@chainlink/functions-toolkit")
// // Loads environment variables from .env file 
// require("dotenv").config()

// const Location = {
//   Inline: 0,
//   Remote: 1,
// }

// const CodeLanguage = {
//   JavaScript: 0,
// }

// const ReturnType = {
//   uint: "uint256",
//   uint256: "uint256",
//   int: "int256",
//   int256: "int256",
//   string: "string",
//   bytes: "Buffer",
//   Buffer: "Buffer",
// }
// // Configure the request by setting the fields below
// const requestConfig = {
//   // Location of source code (only Inline is currently supported)
//   codeLocation: Location.Inline,
//   secretsLocation: Location.Inline,
//   // Code language (only JavaScript is currently supported)
//   codeLanguage: CodeLanguage.JavaScript,
//   // String containing the source code to be executed
//   source: fs.readFileSync("./promptToAttributes.js").toString(),
//   // Optional. Secrets can be accessed within the source code with `secrets.varName` (ie: secrets.apiKey). The secrets object can only contain string values.
//   secrets: { openaiKey: process.env.OPENAI_KEY },
//   walletPrivateKey: process.env["PRIVATE_KEY"],
//   // Optional if secrets are expected in the sourceLocation of secrets (only Remote or DONHosted is supported)
//   // secretsLocation: Location.DONHosted,
//   // Args (string only array) can be accessed within the source code with `args[index]` (ie: args[0]).
//   args: ["Let say hello by Vietnamese"],
//   // Expected type of the returned value
//   expectedReturnType: ReturnType.string,
// }

// module.exports = requestConfig
