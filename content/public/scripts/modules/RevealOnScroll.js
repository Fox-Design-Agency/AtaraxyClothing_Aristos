import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class RevealOnScroll{
    constructor(className, offset){
        this.itemsToReveal = className
        this.hideInitially();
        this.createWaypoints(offset);
    }

    hideInitially(){
        this.itemsToReveal.addClass("reveal-item")
    } // end of hide initially

    createWaypoints(offset){
        this.itemsToReveal.each(function(){
            let currentItem = this;
           new Waypoint({
               element: currentItem,
               handler: function(){
                   $(currentItem).addClass("reveal-item--is-visible");
               },
               offset: offset
           });
        })// end of create waypoint loop
    }// end of create waypoints

} // end of reveal on scroll class

/* needed export to allow import into other modules */
export default RevealOnScroll;