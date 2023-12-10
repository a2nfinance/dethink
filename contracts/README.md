
## Utilizing Chainlink technologies
- The smart contract utilizes Chainlink Functions: 
[GenerateAttributesFunctionsConsumer](./contracts/GenerateAttributesFunctionsConsumer.sol)
[GenrateImagesFunctionConsumer](./contracts/GenrateImagesFunctionConsumer.sol)

## Chainlink Subscriptions

|       Subscription ID |
| ----------- | ----------- | 
| Fuji      |  [1867](https://functions.chain.link/fuji/1867)       |

## Contract addresses

|      | GenerateAttributesFunctionsConsumer | GenrateImagesFunctionConsumer |
| ----------- | ----------- | ----------- |
| Fuji | [0xDaBdC71D929005dA6B341f17432C157fe4623E8d]() | [0x0e8ffa7ee53de25c3dbd36a644d3f5ddBB006031]() |  () |

## How to deploy contracts from scratch

### Steps to deploy
- Deploy GenerateAttributesFunctionsConsumer.sol
    - Use: ```npx hardhat deploy-fuction-consumer-attributes  --network {network name} --show-stack-traces ```
- Deploy GenrateImagesFunctionConsumer.sol
    - Use: ```npx hardhat deploy-fuction-consumer-images  --network {network name} --show-stack-traces ```
- Update Request Post API for GenerateAttributesFunctionsConsumer.sol
    - Use: ```npx hardhat update-function-api-attributes --network fuji --consumeraddress {AutomatedFunctionConsumer contract address} --subscriptionid {your chainlink subscription id}  --show-stack-traces```
- Update Request Post API for GenerateImagesFunctionsConsumer.sol
    - Use: ```npx hardhat update-function-api-images --network fuji --consumeraddress {AutomatedFunctionConsumer contract address} --subscriptionid {your chainlink subscription id}  --show-stack-traces```
- Verify contracts:
    - Use: ```npx hardhat verify --network {network name} {contract address}```
### Integrate with Chainlink
- Create a Chainlink subscription ID and add consumer.

Do that on the chain: Fuji.
