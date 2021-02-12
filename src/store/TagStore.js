//import React from 'react'
import { observable } from 'mobx';

export default function createTagStore(){
    const self = observable({
        tags: new Set(["urgent", "critical"]),
        get alltags(){
            return [ ...self.tags]; // return as array to use map()
        },
        addTag(newTag){
            if(newTag.trim().length > 0) { 
                self.tags.add(newTag) 
                return true;
            } else {
                return false;
            }
        },
        deleteTag(delTag){
            self.tags.delete(delTag)
        }
    })      

    return self;
}
