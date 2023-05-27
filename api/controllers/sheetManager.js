const { getSheetData } = require('./sheet')


module.exports = app => {
    const sheetManagerDB = app.data.sheetManager;
    const controller = {};

    controller.sheetInformation = async (req, res) => {
        let sheetData = await getSheetData()

        result = await queueInformation(sheetData, filterName(sheetData, req.body.name))

        res.status(200).json({
            "result": "sucess",
            "description": `Dados atualizados`,
            "userName": req.body.name,
            "response": result,
        })
    }

    return controller;
}

function filterName(sheetData, pacientName) {
    for (index = 0; index < sheetData.length; index++) {
        if (pacientName === sheetData[index][0]) {
            let pacientData = sheetData[index]
            pacientData[2] = index

            return pacientData
        }
    }
}

function queueInformation(sheetData, pacientData) {
    let informations = {
        pacientPosition: pacientData[2] + 1,
        colors: {
            red: 0,
            yellow: 0,
            green: 0,
            blue: 0
        }
    }

    for (index = 0; index < informations.pacientPosition - 1; index++) {
        if (sheetData[index][1] === "Vermelho") {
            informations.colors.red++
        } else if (sheetData[index][1] === "Amarelo") {
            informations.colors.yellow++
        } else if (sheetData[index][1] === "Verde") {
            informations.colors.green++
        } else if (sheetData[index][1] === "Azul") {
            informations.colors.blue++
        }
    }

    return informations
}

