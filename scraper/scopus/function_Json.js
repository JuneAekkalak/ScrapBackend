const fs = require('fs');
const path = require('path');
const filePath = '../../../numDoc/numDocInWalailak.json';
require('../../logFileGoogleScholar.json')

const createLogFile = async (data, type) => {
  try {
    let logFilePath;

    if (type === 'scholar') {
      logFilePath = path.join(__dirname, '..', '..', 'logFileGoogleScholar.json');
    } else if (type === 'scopus') {
      logFilePath = path.join(__dirname, '..', '..', 'logFileScopus.json');
    }

    let existingData = [];

    try {
      const existingJson = await fs.promises.readFile(logFilePath, 'utf8');
      existingData = JSON.parse(existingJson);
    } catch (readError) {
      console.error('Error reading existing JSON:', readError);
    }

    const updatedData = [...existingData, data];
    const jsonData = JSON.stringify(updatedData, null, 2);

    await fs.promises.writeFile(logFilePath, jsonData, 'utf8');

    console.log('\n-----------------------------------------------------');
    console.log('JSON file has been successfully created.');
    console.log('Path: ', logFilePath);
    console.log('-----------------------------------------------------\n');
  } catch (err) {
    console.error('An error occurred while writing the file:', err);
  }
};

const createJsonScourceID = async (data) => {
  try {
    let existingData = [];
    const filePath = '../../../numDoc/source_id.json';
    try {
      const existingJson = await fs.promises.readFile(filePath, "utf8");
      existingData = JSON.parse(existingJson);
    } catch (err) {
    }

    const updatedData = [...existingData, data];
    const jsonData = JSON.stringify(updatedData, null, 2);

    await fs.promises.writeFile(filePath, jsonData, "utf8");
  } catch (err) {
    console.error("An error occurred while writing the file:", err);
  }
};


const createJson = async (data) => {
  try {
    let existingData = [];

    try {
      const existingJson = await fs.promises.readFile(filePath, "utf8");
      existingData = JSON.parse(existingJson);
    } catch (err) {
    }

    const updatedData = [...existingData, data];
    const jsonData = JSON.stringify(updatedData, null, 2);

    await fs.promises.writeFile(filePath, jsonData, "utf8");
    console.log("JSON file has been successfully created or updated.");
  } catch (err) {
    console.error("An error occurred while writing the file:", err);
  }
};



const updateJson = async (newNotWu, scopus_id) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const numDocNotWalailak = JSON.parse(data);
    const oldArticle = numDocNotWalailak.find(
      (article) => article.scopus_id === scopus_id
    );

    if (oldArticle) {
      oldArticle.numDocNotWalailak += newNotWu;

      await fs.promises.writeFile(
        filePath,
        JSON.stringify(numDocNotWalailak, null, 2),
        "utf8"
      );

      console.log("JSON data has been successfully updated.");
    } else {
      console.error(`Article with scopus_id ${scopus_id} not found.`);
    }
  } catch (err) {
    console.error("An error occurred while reading/writing the file:", err);
  }
};


const getNumNotWu = async (scopus_id) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const numDocNotWalailak = JSON.parse(data);
    const author = numDocNotWalailak.find(
      (author) => author.scopus_id === scopus_id
    );
    if (author) {
      return author.numDocNotWalailak;
    } else {
      return 0;
    }
  } catch (err) {
    return 0;
  }
};

const readUrlScholarData = async () => {
  try {
    const logDirectory = 'D:/Term_3_2565/Project/json';
    const logFilePath = path.join(logDirectory, 'scholar.json');

    if (!fs.existsSync(logFilePath)) {
      console.log('The log file does not exist.');
      return null;
    }

    const existingJson = await fs.promises.readFile(logFilePath, 'utf8');
    const authorURL = JSON.parse(existingJson);
    return authorURL;
  } catch (err) {
    console.error('An error occurred while reading the file:', err);
    return null;
  }
};

const readUrlScopusData = async () => {
  try {
    const logDirectory = 'D:/Term_3_2565/Project/json';
    const logFilePath = path.join(logDirectory, 'scopus.json');

    if (!fs.existsSync(logFilePath)) {
      console.log('The log file does not exist.');
      return null;
    }

    const existingJson = await fs.promises.readFile(logFilePath, 'utf8');
    const authorURL = JSON.parse(existingJson);
    return authorURL;
  } catch (err) {
    console.error('An error occurred while reading the file:', err);
    return null;
  }
};


module.exports = {
  createJson,
  updateJson,
  getNumNotWu,
  createJsonScourceID,
  createLogFile,
  readUrlScholarData,
  readUrlScopusData
};