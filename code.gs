function readGmail() {
  try{
    var threads = GmailApp.search("in:inbox  is:unread", 0, 50);
    if (threads.length > 0){
//      Logger.log(threads); // prints GmailThread,GmailThread,GmailThread,GmailThread
      for (var t = threads.length-1; t>=0;t--) {
        var messages = threads[t].getMessages();
        Logger.log(messages);
        getIdentifierValue(threads[t]);
      }
    }
  }
  catch (e) {
    Logger.log(e.toString());
  }
}
// getIdentifierValue finds the value for "Hashcash:" field sent in mail 
function getIdentifierValue(thread){
  var msg = thread.getMessages()[thread.getMessageCount() - 1];
  var body = msg.getPlainBody();
  if(body.match("Hashcash")){
    Logger.log("present")
    var dataa =  body.split("Hashcash:")[1].split("\n")[0];
    Logger.log(dataa);
//    var lab
    thread.addLabel(getGmailLabel("hashcashh"));
  }
  else{
    Logger.log("not present")
  }
  
  Logger.log(body);
 

}

function getGmailLabel(name) {
  
  var label = GmailApp.getUserLabelByName(name);
  
  if (!label) {
    label = GmailApp.createLabel(name);
  }
  
  return label;
  
}
//test inbox part : check for replies with money
//function monitorTest(){
//   var label = GmailApp.getUserLabelByName('test');
//   var cmds = label.getThreads();
//   Logger.log(cmds);
//}
////set a time-driven trigger to run this function on the desired frequency
//function monitorEmails() {
//  var label = GmailApp.getUserLabelByName('command');
//  var doneLabel = GmailApp.getUserLabelByName('executed');
//  var cmds = label.getThreads();
//  var max = Math.min(cmds.length,5);
//  for( var i = 0; i < max; ++i ) {
//    var email = cmds[i].getMessages()[0];
//    var functionName = email.getBody();
//    //you may need to do extra parsing here, depending on your usage
//
//    var ret = undefined;
//    try {
//      ret = this[functionName]();
//    } catch(err) {
//      ret = err;
//    }
//    //replying the function return value to the email
//    //this may make sense or not
//    if( ret !== undefined )
//      email.reply(ret);
//    cmds[i].removeLabel(label).addLabel(doneLabel);
//  }
//}
