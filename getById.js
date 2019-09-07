'use strict';
const aws = require('aws-sdk');

const dynamoClient = new aws.DynamoDb.DocumentClient();

const params = {
  TableName: process.env.DYNAMODB_TABLE,
  Key: null
};

const getLunchItem = async req => {
  params.Key = {
    id: req
  };
  try {
    const data = await dynamoClient.get(params).promise();
    return {
      statusCode: data.statuCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 404,
      error: error.message
    };
  }
};

exports.handler = async (event, context, callback) => {
  try {
    let request = event.pathParameters.id;
    let response = await getLunchItem(request).catch(res => {
      callback(null, res);
    });
    callback(null, response);
  } catch (error) {
    callback(error);
  }
};
