const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

const TOKEN_PATH = path.join(process.cwd(), 'src/credentials/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'src/credentials/credentials.json');

const SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.send",
];

module.exports.execute = async (options) => {
    const auth = await authorize();
    return await sendEmail(auth, options);
};

async function sendEmail(auth, options) {
    const { from, to, subject, body} = options;

    const gmail = google.gmail({ 
        version: "v1",
        auth
    });

    const res = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
            raw: createRawMessage({
                from,
                to: {
                    name: to.name,
                    email: to.email
                },
                subject,
                body
            })
        },
    });

    return res.data;
}


const createRawMessage= ({ from, to, subject, body }) => {
    const emailContent = [
        `From: ${from}`,
        `To: ${to.email}`,
        `Subject: ${subject}`,
        '',
        body
    ].join('\r\n');

    const encodedEmail = Buffer.from(emailContent).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    return encodedEmail;
}



async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}



/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.list({
        userId: 'me',
    });
    const labels = res.data.labels;
    if (!labels || labels.length === 0) {
        console.log('No labels found.');
        return;
    }
    console.log('Labels:');
    labels.forEach((label) => {
        console.log(`- ${label.name}`);
    });
}

// authorize().then(listLabels).catch(console.error);
// authorize().then(sendEmail).catch(console.error);