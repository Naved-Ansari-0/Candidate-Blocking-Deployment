function doGet(req){
  var userType = req.parameter.UserType;
  var output = [];

  if(userType!=userType1 && userType !=userType2){
    return ContentService.createTextOutput(JSON.stringify({data: output})).setMimeType(ContentService.MimeType.JSON);
  }

  var flag = (userType==userType1)?true:false;

  var values = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data").getDataRange().getValues();

  var branch = ["", "CE","CSE", "EE", "EL", "ME", "IT", "MCA"];

  for(var i=1; i<values.length; i++){
    if(String(values[i][1]).length>0 && String(values[i][2]).length>0){
      row = {};
      row["RollNo"] = values[i][1];
      row["Name"] = values[i][2];
      var t = values[i][1]%1000;
      row["Branch"] = branch[Math.floor(t/100)];
      row["Gender"] = values[i][3];
      row["PhoneNo"] = flag?values[i][4]:"";
      row["Email"] = flag?values[i][5]:"";
      row["Companies"] = values[i][6];
      row["Packages"] = values[i][7];
      output.push(row);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({data: output})).setMimeType(ContentService.MimeType.JSON);

}
