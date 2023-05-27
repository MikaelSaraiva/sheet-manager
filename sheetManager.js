const { getSheetData } = require('./sheet')


async function getUserInformantion(pacientName) {
    let sheetData = await getSheetData()

    result = await queueInformation(sheetData, filterName(sheetData, pacientName))

    let information = {
        "userName": pacientName,
        "response": result,
    }

    return information;
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

module.exports.getUserInformantion = getUserInformantion