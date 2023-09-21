const fs = require('fs');
const os = require('os');
const moment = require('moment');
const fetch = require("node-fetch");
require("dotenv").config();

async function versionamento() {
    let data, version;

    data = {
        prod: {
            version: '1.0.0',
            data: moment().format("DD/MM/YYYY HH:mm"),
            user: os.userInfo().username
        },
        qa: {
            version: '1.0.0',
            data: moment().format("DD/MM/YYYY HH:mm"),
            user: os.userInfo().username
        }
    }

    if (fs.existsSync('./src/version.json')) {
        await fetch(backendUri() + '/version?key=smart-mobile/version.json', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(dataFetch => {
                if (process.env.ENV === 'prod') {
                    data.prod = dataFetch.prod
                    data.qa = data.prod
                } else if (process.env.ENV === 'dev') {
                    data.qa = dataFetch.qa
                }
            })

        if (process.env.ENV === 'prod') {
            data.prod = addVersion(data.prod);
            data.qa = addVersion(data.qa);
            version = data.prod.version
        } else if (process.env.ENV === 'dev') {
            data.qa = addVersion(data.qa);
            version = data.qa.version
        } else {
            version = '1.0.0-local'
        }
    }

    fs.writeFileSync('./src/version.json', JSON.stringify(data), 'utf-8');
    await fetch(backendUri() + '/version',
        {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                json: data, 
                key: 'smart-mobile/version.json',
                contentType: 'application/json'
            })
        })
        .then(() => {
            console.log(`Versão do aplicativo atualizada para. ${version} no ambiente ${process.env.ENV}`)
        })
        .catch((err) => {
            console.log(err)
        })
}

function addVersion(value) {
    if (process.env.VERSAO_BUILD === 'grande') {
        localizacao_arr = 0;
    } else if (process.env.VERSAO_BUILD === 'medio') {
        localizacao_arr = 1;
    } else {
        localizacao_arr = 2;
    }

    let arr_version = value.version.split('.');
    let num;
    arr_version.map((item, i) => {
        num = parseInt(item);
        if (localizacao_arr === i) {
            num++;
        } else if (i > localizacao_arr) {
            num = 0;
        }
        arr_version[i] = num;
    })
    value.version = arr_version.join('.');

    value.data = moment().format("DD/MM/YYYY HH:mm");

    value.user = os.userInfo().username;

    return value;
}


function backendUri() {
    let environment_prd, environment_qa, environment_local;

    //PRD
    environment_prd = 'https://qzzdm84h5i.execute-api.us-east-1.amazonaws.com/prod'

    //QA
    environment_qa = 'https://osqr3ve4c9.execute-api.us-east-1.amazonaws.com/qas'

    //LOCAL
    environment_local = 'http://localhost:3000/local'

    if (process.env.ENV === 'prod') {
        return environment_prd;
    } else if (process.env.ENV === 'dev') {
        return environment_qa;
    } else {
        return environment_local;
    }
}

versionamento();