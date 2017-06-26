import { DebugElement }           from '@angular/core';
import { tick, ComponentFixture } from '@angular/core/testing';

export * from './router-stubs';

//////////////////  Short Utilities  ///////////////
/** Wait a tick, then detect changes  */
export function advance(f: ComponentFixture<any>): void {
  tick();
  f.detectChanges();
}

/**
 * Create custom DOM event the old fashioned way
 */
 export function newEvent(eventName: string, bubbles = false, cancelable = false) {
   let evt = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'
   evt.initCustomEvent(eventName, bubbles, cancelable, null);
   return evt;
 }

 /** Button events to pass to 'DebugElement.triggerEventHandler' for RouterLink event handler */
 export const ButtonClickEvents = {
   left: { button: 0 },
   right: { button: 2 }
 };

/** Simulate element click. Defaults to mouse left-button click event */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if(el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
