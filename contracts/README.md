
## Utilizing Chainlink technologies
- The smart contract utilizes Chainlink Functions: 
[GenerateAttributesFunctionsConsumer](./contracts/GenerateAttributesFunctionsConsumer.sol)
[GenrateImagesFunctionConsumer](./contracts/GenrateImagesFunctionsConsumer.sol)

## Chainlink Subscriptions

|       | Subscription ID |
| ----------- | ----------- | 
| Fuji      |  [1867](https://functions.chain.link/fuji/1867)       |

## Contract addresses

|      | GenerateAttributesFunctionsConsumer | GenrateImagesFunctionConsumer |
| ----------- | ----------- | ----------- |
| Fuji | [0xe058c5108ad84075cbc53313ad98d015c73ba9bb]() | [0xAe9617BBEF878C0B77D1E8B1f2AA166aE309C2f4]() |  () |

## How to deploy contracts from scratch

### Steps to deploy
- Deploy GenerateAttributesFunctionsConsumer.sol
    - Use: ```npx hardhat deploy-function-consumer-attributes  --network fuji --show-stack-traces ```
- Deploy GenrateImagesFunctionConsumer.sol
    - Use: ```npx hardhat deploy-function-consumer-images  --network fuji --show-stack-traces ```
- Update Request Post API for GenerateAttributesFunctionsConsumer.sol
    - Use: ```npx hardhat update-function-api-attributes --network fuji --consumeraddress {AutomatedFunctionConsumer contract address} --subscriptionid {your chainlink subscription id}  --show-stack-traces```
- Update Request Post API for GenerateImagesFunctionsConsumer.sol
    - Use: ```npx hardhat update-function-api-images --network fuji --consumeraddress {AutomatedFunctionConsumer contract address} --subscriptionid {your chainlink subscription id}  --show-stack-traces```
- Verify contracts:
    - Use: ```npx hardhat verify --network fuji {contract address}```
### Integrate with Chainlink
- Create a Chainlink subscription ID and add consumer.

Do that on the chain: Fuji.
