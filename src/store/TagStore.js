//import React from 'react'
import { autorun, observable } from 'mobx';

export default function createTagStore(autorunCallback){

    const self = observable({
        prevLength:2,
        currLength:2,
        tags: new Set(["urgent", "critical"]),
        get alltags(){
            return [ ...self.tags]; // return as array to use map()
        },
        addTag(newTag){
            if(newTag.trim().length > 0) { 
                self.tags.add(newTag)
            }
            self.currLength = self.tags.size
            if(self.currLength > self.prevLength){
                return true;
            } else {
                return false;
            }
        },
        deleteTag(delTag){
            self.tags.delete(delTag)
            self.currLength -= 1;
        },
        updateLength(){
            self.prevLength = self.currLength
        }
    })      

    autorun(()=>{
        // self.alltags.forEach((tag)=>{
        //     console.log(tag)
        // })
        // console.log("prev length", self.prevLength)
        // console.log("curr length", self.currLength)
        if(self.prevLength < self.currLength){
            self.updateLength();
            if(autorunCallback !=null) autorunCallback("added");
        } else if(self.prevLength > self.currLength) {
            self.updateLength();
            if(autorunCallback !=null) autorunCallback("removed");
        }
    })
    // don't understand, but 'when' works only one time
    // when( 
    //     ()=> { return self.currLength !== self.prevLength }, 
    //     ()=> { 
    //         if(self.prevLength < self.currLength){
    //             console.log("added");
    //         } else {
    //             console.log("removed");
    //         }
            
    //         self.updateLength();
    //         console.log(self.prevLength, self.currLength)
    //     }
    // )
    return self;
}
