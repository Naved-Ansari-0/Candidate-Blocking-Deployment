function doGet(req){

  var input = req.parameter.feedback;
  var pos = input.indexOf('/');
  var email = input.substring(0,pos);
  var message = input.substring(pos+1);

  if(email.length==0 || message.length==0)
    return ContentService.createTextOutput("UNSUCCESSFUL");

  var feedbackSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("feedback");
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var ind = feedbackSheet.getLastRow()+1;

  feedbackSheet.getRange(ind,1).setValue(email);
  feedbackSheet.getRange(ind,2).setValue(date);
  feedbackSheet.getRange(ind,3).setValue(h+":"+m+":"+s);
  feedbackSheet.getRange(ind,4).setValue(message);

  return ContentService.createTextOutput("SUCCESSFUL");

}
