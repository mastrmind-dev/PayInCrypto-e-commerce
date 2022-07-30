"use strict";

const dialogflow = require("dialogflow");
const keys = require("../config/keys");

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(
  keys.googleProjectID,
  keys.dialogFlowSessionID
);

module.exports = async(inputText) => {
  return new Promise(//don't forget to return the promise
      async(resolve, reject)=>{
        try {
            const request = {
              session: sessionPath,
              queryInput: {
                text: {
                  text: inputText,
                  languageCode: keys.languageCode,
                },
              },
            };
        
            const response = await sessionClient.detectIntent(request);
            const result = response[0].queryResult;
            //result includes fulfillmentMessages. We should extract the reply from it.
            // console.log(result.fulfillmentMessages[0].text.text[0]);
            resolve(result.fulfillmentText)
          } catch (error) {
            reject(console.log(error));
          }
      }
  )
};
