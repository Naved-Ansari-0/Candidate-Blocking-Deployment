function doGet(req){
  var userId = req.parameter.id;
  var idSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("setting").getDataRange().getValues();
  var loginSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("login");

  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var ind = loginSheet.getLastRow()+1;

  loginSheet.getRange(ind,1).setValue(userId);
  loginSheet.getRange(ind,2).setValue(date);
  loginSheet.getRange(ind,3).setValue(h+":"+m+":"+s);

  var output = {};
  output["userType"] = -1;
  output["dataLink"] = idSheet[2][3];
  output["feedbackLink"] = idSheet[2][4];
  output["sourceCodeLink"] = idSheet[2][5];
  output["note"] = idSheet[2][6];

  for(var i=1; i<idSheet.length; i++){
    if(String(idSheet[i][1])==userId){
      output["userType"] = idSheet[i][2];
      output["dataLink"] = idSheet[1][3];
      output["feedbackLink"] = idSheet[1][4];
      output["sourceCodeLink"] = idSheet[1][5];
      output["note"] = idSheet[1][6];
      break;
    }
  }

  return ContentService.createTextOutput(JSON.stringify({data: output})).setMimeType(ContentService.MimeType.JSON);

}
