# **PayInCrypto e-commerce**
## **Intro**
**“PayInCrypto”** is an e-commerce website which is based on cryptocurrency. It is supposed to have poducts to be sold. All the transactions in this site will be done in cryptocurrency. A specific cryptocurrency token has been created for this website. Users (buyers) can should have Ether (Ethereum’s native cryptocurrency) and they should exchange their Ether with this website’s cryptocurrency token to buy items as that token is the only valid cryptocurrency in this website. The website is connected with a **Cryptocurrency exchange system** and a **Cryptocurrency payment gateway** which are specifically built for this exact project**.** Exchange system is for exchanging Ether with the website’s cryptocurrency token while payment gateway is for sending those tokens to the seller without touching the crypto wallet.
## **Components**
Apart from common functionalities of an e-commerce site this site includes,

- A Chatbot
- A Chat app
- A Crypto exchange system
- A Crypto payment gateway
## **Technologies**
### For web development
- React.js
- Express.js
### For chatbot
- Dialogflow
### For chat app
- React chat engine
### For blockchain development
- Solidity
- Truffle
- Web3.js

## **Other dependencies**
- The blockchain apps (cryptocurrency exchange system and cryptocurrency payment gateway) are supposed to run on Ethereum blockchain. But for demonstration purposes I used ***Ganache*** to make a virtual blockchain on my device and allow those two apps to run on it.
- ***Metamask*** web browser extension is a mandatory dependency in here. Ganache’s fake Ethers are sent to that wallet and website’s cryptocurrency tokens are also sent to that wallet.
