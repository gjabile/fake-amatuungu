// helper function files for USSD logic
//initialize an object to store user's language preference
let language = '';
//const db = require('../firebase'); 

// Return the number of segments separated by the delimiter
function returnstringlength(string) {
  if (string.length ==0 || string ==null){
    return 0;
  }
  console.log(string.split('*').length)
  return string.split('*').length;
}
// Check if the counter is zero and handle the response accordingly

function checkIfZero(counter, res, response) {
  // if all inputs have been read, send response
  return null;
  if (counter === 0) {
    res.send(response);
    return null;
}
  // if (counter < 1) {
  //     console.log("entered checkIfZero and is zero");
  //     //res.setHeader('Content-Type', 'text/plain');
  //     res.send(response);
  //     return counter = counter - 1;
  // }
    else {
       console.log("Counter before:", counter);
       counter = counter - 1;
       console.log("Counter after:", counter);
       return counter;
   }
}
// Shorten the user input by removing the first segment
function shortenUserInput(userinput) {
  console.log("entered shortenuserinput");
  let segments = userinput.split('*');
  if (segments.length > 1) {
      segments.shift(); // Remove the first segment
      userinput = segments.join('*');
      console.log("userinput after shorten:", userinput);
      return userinput;
  } else {
      return '';
  }
}

/*
//ask for English or Runyunkole
async C(counter, res, response, userinput) {
    console.log('entered ask language');
    try {
        const fieldValue = await getMessage('ussdMessages', 'mainMenu', 'selectLanguage');
        response = fieldValue;
        console.log('Field value:', fieldValue);
       
        //check if this is the farthest they've got
        counter = checkIfZero (counter, res, response);
        

        if (userinput[0] == '1') {
            // Set to English
            language = 'english';
        } else if (userinput[0] == '2') {
            // Set to Runyunkole  
            language = 'runyunkole';   
        }
        console.log(language);
        

        return {counter, userinput, language};
    } catch (error) {
        console.error('Error retrieving field value:', error);
    }
}


//get response from data// level 1 only
async function getMessage(collectionName, documentId, fieldName) {
    try {
      console.log("stopped here");
      const docRef = await db.collection(collectionName).doc(documentId);
      const doc = await docRef.get();
      if (!doc.exists) {
        console.log('No such document!');
        return null;
      } else {
        const data = await doc.data();
        if (data.hasOwnProperty(fieldName)) {
          return data[fieldName];
        } else {
          console.log('Field does not exist in the document!');
          return null;
        }
      }
    } catch (error) {
      console.error('Error getting document:', error);
      return null;
    }
  }

  //get message but more hierarchy and levels
  async function getMessage2(collectionName1, documentId1, collectionName2, documentId2, language) {
    try {
      const docRef = await db.collection(collectionName1).doc(documentId1).collection(collectionName2).doc(documentId2);
      const doc = await docRef.get();
      if (!doc.exists) {
        console.log('No such document!');
        return null;
      } else {
        const data = await doc.data();
        if (data.hasOwnProperty(language)) {
          return data[language];
        } else {
          console.log('Field does not exist in the document!');
          return null;
        }
      }
    } catch (error) {
      console.error('Error getting document:', error);
      return null;
    }
  }
  


*/
module.exports = {
    returnstringlength,  
    checkIfZero,
    shortenUserInput,
    //askLanguage,
    //getMessage,
    //getMessage2
};