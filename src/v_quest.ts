/// <reference types="@workadventure/iframe-api-typings" />
//import { getQuest } from "@workadventure/quests";
import { levelUp } from "@workadventure/quests";

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;


// Waiting for the API to be ready
WA.onInit().then( async () => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    // quest
    //const quest = await getQuest("1101_ESCAPE_ROOM_FIBONACCI_100_ROADS_OFFICE");
    console.log("TEST JULIA")

    // New Quest

    WA.room.onEnterLayer("drone_zone").subscribe( async () => {
      await levelUp("TEST_Iryna", 10);
      console.log('Test passed');
      });

    
      

    /*
    WA.room.onEnterLayer("exit_zone").subscribe( async () => {
      await levelUp("TEST_Iryna", 10);
      console.log('Test passed');
      });
      //console.log(quest);

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    // TS for escape room
    WA.room.onEnterLayer("tv_zone").subscribe(() => {
      WA.room.showLayer("tv-on");
    });
    
  WA.room.onLeaveLayer("tv_zone").subscribe(() => {
      WA.room.hideLayer("tv-on");
    });

     // Julia custom

    WA.room.onLeaveLayer('clockZone').subscribe(closePopup)

    */

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
