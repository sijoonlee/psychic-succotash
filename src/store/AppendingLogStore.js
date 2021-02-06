import { observable, when, autorun, getDependencyTree  } from 'mobx';

function createAppendingLogStore(){
    const self = observable({
        logs: [
            {
                message:"init", // string
                time:(new Date()).toString() // timestamp string
            }
        ],
        add(message){
            self.logs.push({message, time: (new Date()).toString()})
        },
        get(){
            return self.logs
        }
    })

    return self;
}

export {createAppendingLogStore};