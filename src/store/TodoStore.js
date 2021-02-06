import { observable } from 'mobx';
import { v4 as uuid} from 'uuid';

const TodoStatus = ["Todo", "On Progress", "Finished"];

function next(current){
    current += 1;
    if(current >= TodoStatus.length){
        current = 0;
    }
    return current;
}
    

function createTodoStore() {
        
    const self = observable({
        items: [{
            id: uuid(),
            name: "Sample item",
            status: 0,
            tags: new Set()
        }],

        get activeItems() {
            return self.items.filter(i => i.status !== TodoStatus.length-1);
        },
        get completedItems() {
            return self.items.filter(i => i.status === TodoStatus.length-1);
        },

        addItem(name) {
            self.items.push({
                id: uuid(),
                name,
                status: 0,
                tags: new Set()
            });
        },
        setItemName(id, name) {
            const item = self.items.find(i => i.id === id);
            item.name = name;
        },
        setStatusNext(id) {
            const item = self.items.find(i => i.id === id);
            item.status = next(item.status);
        },
        addTag(id, tag) {
            const item = self.items.find(i => i.id === id);
            item.tags.add(tag)
        },
        deleteTag(id, tag) {
            const item = self.items.find(i => i.id === id);
            item.tags.delete(tag)
        },
        hasTag(id, tag) {
            const item = self.items.find(i => i.id === id);
            return item.tags.has(tag)
        },
        getTags(id){
            const item = self.items.find(i => i.id === id);
            return [ ...item.tags ]
        },
        getCurrStatus(id){
            const item = self.items.find(i => i.id === id);
            return TodoStatus[item.status];
        }
    })

    return self;
}

export { TodoStatus, createTodoStore };