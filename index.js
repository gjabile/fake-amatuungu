const express = require('express');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//Test request handlers
app.get("/api/test", function(req, res){
    res.send("Testing Request");
})

//HTTP requests that the USSD will send
app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    //initialize a string variabe that can be edited
    let userinput = text;
    console.log("Text:", userinput); 
    //initialize a variable to store animal info
    let userAnimal;
    //intialize a variable to store animal disease intent
    let userAnimalDiseaseIntent;
    //initialize variable to store animal disease
    let animalDisease;


    //initialize response body (this will be sent back to API)
    let response = '';
    let counter = returnstringlength(userinput);
    let language = '';
    //very counter
    console.log("Counter:", counter);
    
    function askLanguage () {
          response = `CON Select:
          1. English
          2. Runyunkole`;
      
          checkIfZero (counter, res, response);
          //route to next functions
          if (userinput[0] == '1') language='english';//set to english
          else if (userinput[0] == '2') language='runyunkole';//set to runyunkole
    }

    askLanguage();

    

    const mainmenu = () => {
      if (language == 'english') {
        response = `CON Welcome to Amatuungo Aid. What can we help you with?

            Select:
            1. Livestock Feed & Nutrition
            2. Animal Disease Management
            3. Breeding & Reproduction Information`;
      }
      else {
        response = `CON CON Twakwakiira aha Amatuungo Aid! Tukuyambe omuki erizooba?
        Toroonaho:
        1. Ebikwatana n'okurya kwa amatuungo
        2. Ebikwatana aha ndwara za amatuungo
        3. Ebyokuzaala na breeding`;
      }
                
        checkIfZero (counter, res, response);
        shortenuserinput();
        //route to next functions
        if (userinput[0] == '1') livestockProblem();//send to livestock
        else if (userinput[0] == '2') animalDiseaseManagementProblem ();//send to animal disease mgmt
        else if (userinput[0] == '3')  breedingInfo ();//breeding info

    };

    mainmenu ();

    function livestockProblem () {
        //askAnimal();
        askNutritionQuestion();
        giveNutritionInfo();
        

    };

    function askNutritionQuestion () {
        if (language == 'english') {
          response =  `CON You selected 1. Livestock Feed & Nutrition 
          Learn more about:
          1. Basic Nutrition
          2. Supplements for better dairy production
          3. Feeding during dry seasons.`;
        }
        else {
          response = `CON Watoroona Ebyokurya byamatungo.
          Okumanya ebikukiraho:
          1.Okurya okwabulijjo
          2.Ebilisa
          3.Ebyokurya omukyanda `;
        }
        //check if this is the farthest they've got
        checkIfZero (counter, res, response);
        //remove choice from input
        shortenuserinput();
        //route to next functions
        if (userinput[0] == '1') {
            basicNutritionInfo();
        }
        else if (userinput[0] == '2') {
            promptSupplementInfo();           
        }
        else if (userinput[0] == '3') {
            promptDryFeeding();
        }

    };



    function promptDryFeeding () {
        response = `CON For dry season learn more about:
        1. Forage grasses
        2. Crop Residue for Roughage`;
        
        //check if this is the farthest they've got
        checkIfZero (counter, res, response);
        //remove choice from input
        shortenuserinput();
        //route to next functions
        if (userinput[0] == '1') {
            forageGrassInfo();
        }
        else if (userinput[0] == '2') {
            cropResidueInfo();           
        }

    };

    function forageGrassInfo () {
        if (language == 'english') {
          response = `END Napier grass
          Type: Forage
          Use for: Dairy & Beef Cattle
          Uses: Fresh cut, carry forage, and silage
          Advantages: High yield, High nutrient content, Drought Resistant`;
        }
        else {
          response = `END 1.Omutete
          - Ekika: Forage.
          Omuteete niguriibwa ente z'amate n'enyama. Kandi nigukora na sayilegi.
          Ebirungi by'omuteete.
          - Obwingi bwagwo niburetera ente kwiguta.
          -  Gwine ekirisa kyamani omu biro byagwo ebihikire.
          - Niguhangaara omu mushana ( omukyanda).
          Akabi k'omuteete
          - Nigwenda okugureberera munonga n'okushoroma.
          - Nigubaasa kusisikara waba otaguhaire bwire. `;
        }
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };

    function cropResidueInfo () {
      if (language == 'english') {
        response = `END Maize Stover
        Type: Crop Residue
        Use for: Cattle
        Uses: Roughage during dry season 
        Advantages: By product of maize farming, cost effective`;
      }
      else {
        response = `END 2.CHACHU
        - Ekika: Ebishushu by'ebicoori.
        Chachu nekira kukoresibwa omu bwire bwekyanda ente zitaine binyatsi bwingi.
        Ebirungi bya chachu
        - Nerahuka kureebeka.
        Negura sente nkye.
        Akabi ka chachu
        Ekirisa nikikye kukiza obubyatsi obwa butosha.
        - Chachu neyenda kugyongyeramu ebindi birungo kendal ngu egire ekiriisa kyamani. `;
      }
        
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };



    function promptSupplementInfo () {
        if (language == 'english') {
          response = `CON Supplements:
          \n Learn more about:
          1. Dairy meal Concentrates
          2. Leguminous Shrub`;
        }
        else {
          response = `CON Supplements:
          \n Learn more about:
          1. Dairy meal Concentrates
          2. Leguminous Shrub
          Runyunkole coming soon`;
        }
        
        //check if this is the farthest they've got
        checkIfZero (counter, res, response);
        //remove choice from input
        shortenuserinput();
        //route to next functions
        if (userinput[0] == '1') {
            dairyMealInfo();
        }
        else if (userinput[0] == '2') {
            leguminousShrubInfo();           
        }

    };

    function basicNutritionInfo () {
      if (language == 'english') {
        response =  `END For energy:
        Cattles need forages to ensure balanced diet
        Cattle need to spend 6-8 hours grazing and browsing
        Provide clean water at all times (4 times/day)`;
      }
      else {
        response = `END For energy:
        Cattles need forages to ensure balanced diet
        Cattle need to spend 6-8 hours grazing and browsing
        Provide clean water at all times (4 times/day)
        Runyunkole coming soon `;
      }
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };

    function dairyMealInfo () {
        if (language == 'english') {
          response = `END Dairy Meal Concentrates
        Type: Processed Feeds
        Use for: Dairy cows
        Uses: Enhance milk yield and quality
        Advantages: Balanced nutrients, easy to store`;
        }
        else {
          response = `END Dairy Meal Concentrates
        Type: Processed Feeds
        Use for: Dairy cows
        Uses: Enhance milk yield and quality
        Advantages: Balanced nutrients, easy to store
        Runyunkole coming soon`;
        }
        
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };

    function leguminousShrubInfo () {
        response = `END Leguminous Shrub
        Type: Supplement
        Use for: Cattle
        Uses: Protein Supplement
        Advantages: Beneficial for lactating animals`;
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };

    function animalDiseaseManagementProblem () {
           
        //askAnimal();
        //response = `CON You selected ${userAnimal}`;
        askAnimalDiseaseIntent();
       
        if (userAnimalDiseaseIntent === 'Disease Identification') {
            
            identifyDisease();
           
             
        }
        else if (userAnimalDiseaseIntent === 'Disease Treatment'){
            askTreatmentQuestion();

        }
        else if (userAnimalDiseaseIntent === 'Disease Prevention'){
            askPreventionQuestion();

        }

        
    };

    function askAnimalDiseaseIntent () {

      if (language == 'english') {
        response = `CON You selected Animal Disease Management
      What do you need help with?
      Select:
           1. Disease Identification 
           2. Disease Treatment
           3. Disease Prevention`;
      }
      else {
        response = `CON Watoorana Ebikwatana aha ndwara za amatuungo. Tukuyambe omu ki?
        1. okumanya endwara
        2. obujanjabi bwe endwara
        3. okwehara endwara`;
      }

      console.log ("entered askanimaldiseasteintent");
      
      
      //check if this is the farthest they've got
      checkIfZero (counter, res, response);
      //remove choice from input
      shortenuserinput();
      //route to next functions
      if (userinput[0] == '1') {
          userAnimalDiseaseIntent = `Disease Identification`;
      }
      else if (userinput[0] == '2') {
          userAnimalDiseaseIntent  = `Disease Treatment`;
      }
      else if (userinput[0] == '3') {
          userAnimalDiseaseIntent = `Disease Prevention`;
      }

  };

    function askPreventionQuestion () {
      if (language == 'english') {
        response = `CON You selected disease control. Which disease would you like to learn more about?

Select:
1. Mastitis
2. Brucellosis
3. East Coast Fever
4. Foot & Mouth Disease`;
      }
      else {
        response = `CON Watoorana okwehara endwara, hati noza kutoorana kurigirira  kuruga omu ndwire eziri ahansi.

Toorana aha:
1. Efumbi
2. Burusela
3. Amashuyo
4. Ejwa(Kalusu).`;
      }       
          
          
          //check if this is the farthest they've got
          checkIfZero (counter, res, response);
          //remove choice from input
          console.log ("userinput: ", userinput);
          shortenuserinput();
          console.log ("userinput: ", userinput);
          //route to next functions
          if (userinput[0] == '1') {
            if (language == 'english') {
              response = `END To prevent mastitis:
Keep udders as clean as possible while milking.
Clean udder before & after milking
Milk cows with mastitis last to avoid spreading infection.`;
            }
            else {
              response = `END Efumbi:
- Obuyonjo omu ikamiro.
- Kama ente ezirwaire aha muheru..`;
            }   
              
          }
          else if (userinput[0] == '2') {
            if (language == 'english') {
              response = `END To control and prevent brucellosis:
Isolate cows that have abortions for 3 weeks
Disposed of any contaminated materials
Contact a lab or vet to test infected blood`;
            }
            else {
              response = `END Burusela
- Shorora ente ezitorogire kuheza esabiiti 3.
- Kyebeza eshagama yamatungo gawe norabira omu mushaho.
- ihamu amatungo agarwaire.`;
            }   
          }
          else if (userinput[0] == '3') {
            if (language == 'english') {
              response = `END To control east coast fever, control ticks that carry them.`;
            }
            else {
              response = `END Okwita engoha ezirikureeta endwara.`;
            }   
          }
          else if (userinput[0] == '4') {
            if (language == 'english') {
              response = `END Food and Mouth disease treatment.
Isolate infected animals from healthy animals
Vaccinate animals to keep them from becoming lame`;
            }
            else {
              response = ` END Ejwa (Kalusu):
- Okushorora ente ezirwaire okazita hare n'ezitarwaire.
- Okutsirika ente okuzitangira endwara.`;
            }   

          //check if this is the farthest they've got
          checkIfZero (counter, res, response);
          //remove choice from input
          shortenuserinput();
          }
          //check if this is the farthest they've got
          checkIfZero (counter, res, response);
          //remove choice from input
          shortenuserinput();


    };

    function askTreatmentQuestion () {
      if (language == 'english') {
        response = `CON You selected Disease Treatment: Which disease treatment do you want to learn about:

Select. 
1. Mastitis
2. Brucellosis
3. East Coast Fever
4. Food & Mouth Disease`;
      }
      else {
        response = `CON Watoorana obujanjabi, hati noza kutoorana kurigirira aha ndwara ye ente yawe. kuruga omu ndwire eziri ahansi.

Toorana aha:
1. Efumbi
2. Burusela
3. Amashuyo
4. Ejwa(Kalusu).`;
      }       
          
          
          //check if this is the farthest they've got
          checkIfZero (counter, res, response);
          //remove choice from input
          console.log ("userinput: ", userinput);
          shortenuserinput();
          console.log ("userinput: ", userinput);
          //route to next functions
          if (userinput[0] == '1') {
            if (language == 'english') {
              response = `END Mastitis needs to be treated as soon as possible with antibiotics applied directly on the udders. `;
            }
            else {
              response = `END Obujanjabi
- Yeta omushaho ateere ente omubazi.
- Reeba ngu wakama ente omuhako gwagumiraho ( wagihaazya).`;
            }   
              
          }
          else if (userinput[0] == '2') {
            if (language == 'english') {
              response = `END Brucellosis requires vet intervention. `;
            }
            else {
              response = `END Burusela teyine mubazi
Nitubasa kusindiikira omushaho obubaka, akaboona kukuyamba.`;
            }   
          }
          else if (userinput[0] == '3') {
            if (language == 'english') {
              response = `END East Coast Fever requires vet intervention.`;
            }
            else {
              response = `END Yeta omushaho ateere ente omubazi.`;
            }   
          }
          else if (userinput[0] == '4') {
            if (language == 'english') {
              response = `END Food and Mouth disease treatment.
Give cattle plenty of water and keep them out of sun
Give soft, fresh grass and encourage eating
Give antibiotics to prevent bacterial infection`;
            }
            else {
              response = `END Ejwa(Kalusu):
- Okuziha amazi, nokizirinda kuza aha mushana.
- Okuziha obunyatsi bworobi.
- Okuziha omubazi kuzibira ebironda kugibwamu obukooko.`;
            }   
          }
          //check if this is the farthest they've got
          checkIfZero (counter, res, response);
          //remove choice from input
          shortenuserinput();
    };

    
    function identifyDisease() {    
      
      if (language == 'english') {
        response = `CON You selected disease Identification. \nWhich disease signs and symptoms are you able to identify from the ones listed below.\nSelect:\n1. Mastitis\n2. Brucellosis\n3.East Coast Fever\n4. Foot & Mouth Disease.`;
      }
      else {
        response = `CON Watoorana okumanya endwara, hati noza kutoorana kurigirira aha bubonera bwe ente yawe. kuringa omu endwiire eziri ahansi.\nToorana aha:\n1. Efumbi\n2. Burusela\n3. Amashuyo\n4. Ejwa(Kalusu).`;
      }       
          
          
          //check if this is the farthest they've got
          checkIfZero (counter, res, response);
          //remove choice from input
          console.log ("userinput: ", userinput);
          shortenuserinput();
          console.log ("userinput: ", userinput);
          //route to next functions
          if (userinput[0] == '1') {
            if (language == 'english') {
              response = `END Signs of Mastitis:
              The milk color looks different
              the Teats are swollen and tender(sometimes there are wounds or cracks on the teats)
              The animals resist being milked
              The udder is hot(looks redden and sometimes looks  swollen or hard)
              often only one teats has signs of the diseases
              The udder becomes dark blue/black`;
            }
            else {
              response = `END Obubonero
Amate nigahinduka omu ndebeka( Orushagama).
Okuzimba amabere n'omuhako.
Okuhaya ( okwanga kukamwa).
Okukira, ibeere rimwe niryo rikworeka obubonero)`;
            }   
              
          }
          else if (userinput[0] == '2') {
            if (language == 'english') {
              response = `END Signs of Brucellosis:
They have abortion about 5-6 months after mated
uterus becomes infected
the animals produce weak offspring
male animals have swollen joints especially the limbs`;
            }
            else {
              response = `END Obubonero
Okutorooga bwanyima y'ameezi 4_5 yaheza kwema.
Nyinenda kurwara.
Amatungo kuzara enyena zamani makye munonga.
Enimi nizihaga omungingo.`;
            }   
          }
          else if (userinput[0] == '3') {
            if (language == 'english') {
              response = `END Signs of East Coast Fever: 
Lymph nodes under the skin swells up under the ears where the ticks bite
The animals has  high fever
they look tired, weak
eat little and looks thin
sometimes they cough and show signs of pneumonia
some animals have diarrhea with blood in the faeces
occasionally the eyes becomes cloudy and animals blinks often`;
            }
            else {
              response = `END Obubonero:
Obuzimba ahansi yamatu.
Okutungura, n'amaani makye.
Amaisho kugiramu omwika.`;
            }   
          }
          else if (userinput[0] == '4') {
            if (language == 'english') {
              response = `END Signs of Foot & Mouth Disease:
The animals are very lame
The animals are weak and tired
Have high fever
Lack of appetite
Produce no milk`;
            }
            else {
              response = `END Obubonero
Obumuga omu matungo.
Oburihe.
Ebironda omukanwa n'aha rurimi.
Okucwera orufuzi obutosha.
Okutungura.
Obutakamwa mate marungi agabutosha`;
            }   
          }
          //check if this is the farthest they've got
          checkIfZero (counter, res, response);
          //remove choice from input
          shortenuserinput();
  
      
  };




    function connectVet() {
        response = `END ` + response + `${animalDisease} needs further assistance from a vet. We have sent your case file to your vet. They will respond in 1-2 days `;
        shortenuserinput();
        checkIfZero (counter, res, response);

    };

    function promptDeviceConnection() {
        response = `END ` + response + `${animalDisease} diagnosis can be confirmed using our device...`;
        shortenuserinput();
        checkIfZero (counter, res, response);
    };

    function giveTreatmentInfo () {
        response = `END ` + response + `${animalDisease} can be treated using... (insert treatment information)`;
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };

    function outbreakInfo () {
        response = `END You selected 3. Outbreak Information
            Here is the latest outbreak information in your region...`;
        console.log("Entered outbreak");
        console.log("user: ", userinput);
        shortenuserinput();
        console.log("user: ", userinput);
        checkIfZero (counter, res, response);
    };

    function breedingInfo () {
        askBreedingQuestion();
    };

    function askBreedingQuestion () {
      
      if (language == 'english') {
        response = `CON You selected breeding and reproduction information.  What would you like to learn more about?\nSelect:\n1. Ankole Cattle Breed\n2. Ankole Cattle Cross Breeding\n3. Breeding improvement strategies`;
      }
      else {
        response = `CON Watoorana eby’okucooka amatungo\nToorana:\n1. Ente z'enyankore \n2.Okuhindura omu bika by'ente.\n3. Okutunguura omutindo gw'ente`;
      }

      console.log ("entered askanimaldiseasteintent");
      
      
      //check if this is the farthest they've got
      checkIfZero (counter, res, response);
      //remove choice from input
      shortenuserinput();
              //route to next functions
        if (userinput[0] == '1') {
            basicAnkoleInfo();
        }
        else if (userinput[0] == '2') {
            promptCrossBreedingInfo();           
        }
        else if (userinput[0] == '3') {
            promptBreedingImprovement();
        }

    };



    function promptBreedingImprovement () {
      if (language == 'english') {
        response = `CON You selected breeding improvement strategies. Select which strategy you’d like to learn more about:\n1. Artificial Insemination\n2. Selective Breeding Programs`;
      }
      else {
        response = `CON Watoorana Okutunguura omutindo gw'ente.Toorana aha\n1. Okwemesa amaizi genimi eyekika ekyokwenda.\n2. Okwegyesa abariisa aha miringo yokuriisamu amatungo gaabo.`;
      }
        //check if this is the farthest they've got
        checkIfZero (counter, res, response);
        //remove choice from input
        shortenuserinput();
        //route to next functions
        if (userinput[0] == '1') {
            aiInfo();
        }
        else if (userinput[0] == '2') {
            selectiveBreedingInfo();           
        }

    };

    function aiInfo () {
      if (language == 'english') {
        response = `END Artificial Insemination\nImplement AI programs to introduce superior genetics from high yielding dairy or beef breeds enhancing productivity.`;
      }
      else {
        response = `END Okwemesa amaizi genimi eyekika ekyokwenda. Ekinikibasa kwongyera aha bwingyi bwa maate ne enyama ye ente.`;
      }
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };

    function selectiveBreedingInfo () {
      if (language == 'english') {
        response = `END Selected Breeding Programs.\nThis involves developing and practicing support selective programs focused on desired traits such as  milk yield etc.`;
      }
      else {
        response = `END Okwegyesa abariisa aha miringo yokuriisamu amatungo gaabo. Kurigirira aha kibakwenda kutunga bwanyima puroguramu ezi.`;
      }
        
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };



    function promptCrossBreedingInfo() {
      if (language == 'english') {
        response = `CON Select which cross  breeding you’d like to learn more about:\n1. Friesian & Ankole\n2. Boran & Ankole`;
      }
      else {
        response = `CON Toorana ekiika ekyokwenda okumanaya ho:\n1. Enjungu n'enyankore/n2. Burani n'enyankore.`;
      }
        
        //check if this is the farthest they've got
        checkIfZero (counter, res, response);
        //remove choice from input
        shortenuserinput();
        //route to next functions
        if (userinput[0] == '1') {
            freisanInfo();
        }
        else if (userinput[0] == '2') {
            boranInfo();           
        }

    };

    function basicAnkoleInfo () {
      if (language == 'english') {
        response = `END Ankole Cattle Breed:\nBenefits: Good for local environment, provides milk & meat, easy to manage\nDisadvantages: Produces less milk compared to exotic dairy breeds, slower growth rate`;
      }
      else {
        response = `END Ebirungi byazo
\n Okuhangaara omu bunaku bwomushana hariho amaizi makye n'obunyatsi bukye. \n Ziine amate marungi n'enyama nungi. \nTizikwenda kureeberera munonga  ahabwokuba tizikukira kurwaara.\nAkabi kaazo\n- Ziine amate makye.\n- Nizikura mpora.`;
      }
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };

    function freisanInfo () {
      if (language == 'english') {
        response = `END Friesian & Ankole cross breeding can improve milk production.`;
      }
      else {
        response = `END Enjungu n'enyankore.
Nikyongyera aha mate.`;
      }
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };

    function boranInfo () {
      if (language == 'english') {
        response = `END Boran & Ankole cross breeding and enhance meat production qualities and maintain resistance.`;
      }
      else {
        response = `END Burani n'enyankore. Nikyongyera aha nyama.`;
      }
        shortenuserinput();
        checkIfZero (counter, res, response);
    
    };


    function askAnimal () {
        response = response + `\n What animal is your question related to?
        Select:
            1. Cattle
            2. Sheep
            3. Goat
            4. Chicken`;
        //check if this is the farthest they've got
        checkIfZero (counter, res, response);
        //remove choice from input
        shortenuserinput();
        //route to next functions
        if (userinput[0] == '1') {
            userAnimal = 'Cattle';
        }
        else if (userinput[0] == '2') {
            userAnimal = 'Sheep';
        }
        else if (userinput[0] == '3') {
            userAnimal = 'Goat';
        }
        else if (userinput[0] == '4') {
            userAnimal = 'Chicken';
        }
    };

    

    
    function giveNutritionInfo () {
        response = `END You selected ${userAnimal}. Here is how to feed your ${userAnimal}...`;
        shortenuserinput();
        checkIfZero (counter, res, response);

    };

    function giveBreedingInfo () {
        response = `END You selected ${userAnimal}. Here is how to breed your ${userAnimal}...`;
        shortenuserinput();
        checkIfZero (counter, res, response);

    };




    function checkIfZero (value, res, response)  {
        //if all inputs have been read, send response
        if (value ===0) {            
            console.log("entered checkIfZero and is zero");
            res.send(response);

        }
        //else, continue in the rest of the flow
        else if (value ===1){
            console.log("entered checkIfZero and counter is 1");
            counter = counter -1;
            
        }
        else {
            console.log("Counter before:", counter);
            counter = counter -2;
            console.log("Counter after:", counter);

        }

        
        
    };

    //return legnth of string function:
    function returnstringlength (string) {
        return string.length;
    };

    //function to shorten the string
    function shortenuserinput () {
        //shorten if length = 3
        console.log("entered shorten user input");
        if (userinput.length >2) {
        userinput = userinput.slice(2);
        console.log("userinput after shortening:", userinput);
        }
        else {
            userinput = '';
        }
    };

    
});




//PORT
const PORT = process.env.PORT || 3003


//APP Listen
app.listen(PORT, () => 
    console.log(`Ussd Serverlisten on http://localhost:${PORT}`)
);