/// <reference types="@workadventure/iframe-api-typings" />

import { EmbeddedWebsite } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

import { levelUp } from "@workadventure/quests";

console.log('Script started successfully');

let currentPopup: any = undefined;
let my_web: any = undefined;


// Waiting for the API to be ready
WA.onInit().then( async () => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    let droneRightBig: EmbeddedWebsite = await WA.room.website.get("drone-right-big");
    let droneLeftBig: EmbeddedWebsite = await WA.room.website.get("drone-left-big");
    let droneRightSmall: EmbeddedWebsite = await WA.room.website.get("drone-right-small");
    let droneLeftSmall: EmbeddedWebsite = await WA.room.website.get("drone-left-small");
    console.log("Julia test")
    // Julia custom

    // dron animation
    WA.room.onEnterLayer("drone_zone").subscribe(() => {
      droneLeftBig.visible = true;
      droneLeftSmall.visible = true;
      droneRightBig.visible = true;
      droneRightSmall.visible = true;
      WA.room.hideLayer("drone-off");
    });
    
  WA.room.onLeaveLayer("drone_zone").subscribe(() => {
    droneLeftBig.visible = false;
    droneLeftSmall.visible = false;
    droneRightBig.visible = false;
    droneRightSmall.visible = false;
    WA.room.showLayer("drone-off");
    });

    // Custom 
    let billboard: EmbeddedWebsite = await WA.room.website.get("billboard")
    WA.room.onEnterLayer("floor").subscribe(() => {
      billboard.visible = false;
      WA.room.hideLayer("roof");
      WA.room.hideLayer("walls-bg-front");
      WA.room.hideLayer("signs");
    });
    
  WA.room.onLeaveLayer("floor").subscribe(() => {
      billboard.visible = true;
      WA.room.showLayer("roof");
      WA.room.showLayer("walls-bg-front");
      WA.room.showLayer("signs");
    });
    WA.room.onEnterLayer("rooms_floor").subscribe(() => {
      WA.room.hideLayer("facade");
      WA.room.hideLayer("facade-furniture-fg");
      WA.room.hideLayer("facade-furniture-bg");
    });
    WA.room.onLeaveLayer("rooms_floor").subscribe(() => {
      WA.room.showLayer("facade");
      WA.room.showLayer("facade-furniture-fg");
      WA.room.showLayer("facade-furniture-bg");
    });
    WA.room.onEnterLayer("room_walls_remove").subscribe(() => {
      WA.room.hideLayer("facade");
      WA.room.hideLayer("facade-furniture-fg");
      WA.room.hideLayer("facade-furniture-bg");
    });
    WA.room.onEnterLayer("room_walls_remove").subscribe(() => {
      WA.room.hideLayer("facade");
      WA.room.hideLayer("facade-furniture-fg");
      WA.room.hideLayer("facade-furniture-bg");
    });
    
  WA.room.onLeaveLayer("room_walls_remove").subscribe(() => {
      WA.room.showLayer("facade");
      WA.room.showLayer("facade-furniture-fg");
      WA.room.showLayer("facade-furniture-bg");
    });
  
    // JULIA test object
    WA.room.area.onEnter("my_test").subscribe(() => {
      billboard.visible = false;
      WA.room.hideLayer("furniture-fg");
    });
    
    WA.room.area.onLeave("my_test").subscribe(() => {
      billboard.visible = true;
      WA.room.showLayer("furnture-fg");
    });
    // !!!!!JULIA TESTING NONE TOUCH THIS CODE!!!!
    WA.room.onEnterLayer('test_popup').subscribe(() => {
        
      currentPopup = WA.ui.openPopup("test_popup_var","Airtable",[{
          label: "Open",
          className: "primary",
          callback: async () => {
              // Close the popup when the "Close" button is pressed.
              my_web = await WA.ui.website.open({
                  url: "https://airtable.com/embed/shrpPfr22Yp1RuDW3?backgroundColor=transparent&layout=card",
                  position: {
                      vertical: "middle",
                      horizontal: "middle",
                  },
                  size: {
                      height: "60vh",
                      width: "50vw",
                  },
              });
              
          }
      },
      {
      label: "Close",
        className: "primary",
        callback: (popup) => {
            // Close the popup when the "Close" button is pressed.
            popup.close();
            if (my_web !== undefined) {
              my_web.close();
              my_web = undefined;
            }
            
        }
        
      }
      ]);
  })

  WA.room.onLeaveLayer('test_popup').subscribe(closePopUp)
    
    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

// Victor Quest

    WA.room.onEnterLayer("drone_zone").subscribe( async () => {
          await levelUp("TEST_Iryna", 10);
          console.log('Victor Test passed');
          });

  }).catch(e => console.error(e));




    

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
    if (my_web !== undefined) {
      my_web.close();
      my_web = undefined;
    }
}

export {};