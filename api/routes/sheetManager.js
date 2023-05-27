module.exports = app => {
    const controller = app.controllers.sheetManager;
  
    app.route('/api/v1/sheet-information')
      .get(controller.sheetInformation);
  }