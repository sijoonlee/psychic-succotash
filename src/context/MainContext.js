import React from 'react'

import { createTodoStore } from '../store/TodoStore'
import createTagStore from '../store/TagStore'
import { createAppendingLogStore } from '../store/AppendingLogStore'

const log = createAppendingLogStore();
const storesContext = React.createContext({
    todoStore: createTodoStore((msg)=>{console.log(msg);log.add(msg)}),
    tagStore: createTagStore((msg)=>{console.log(msg);log.add(msg)}),
    appendingLogStore: log//createAppendingLogStore()
})
export default storesContext;