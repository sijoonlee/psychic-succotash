import React, { useState, useRef } from 'react'
import { observer } from 'mobx-react'
import { observable, autorun, when } from 'mobx';
import styled from 'styled-components'
//import { v4 as uuid} from 'uuid';

import TagsList from './TagsList'
import TodoListItem from './TodoListItem'
import AppendingLogView from './AppendingLogView'

import {TodoStatus, createTodoStore} from '../store/TodoStore'

import storesContext from '../context/MainContext'

const useStores = () => React.useContext(storesContext)


function TodoList({ className }) {
    const typedTodo = useRef(null);

    //const [ store ] = useState(createTodoStore());

    const { todoStore, appendingLogStore } = useStores();
    
    return (
        <div className={className}>
            <header>
                <h1 className="title">TODO List Example</h1>
            </header>
            <div className="flexContainer">
                <section className="flexLeft">
                    <section>
                        <input ref={typedTodo}/>
                        <button onClick={() => {
                            if(typedTodo.current.value.trim().length > 0) {
                                todoStore.addItem(typedTodo.current.value.trim())
                                //appendingLogStore.add(`Todo Item [${typedTodo.current.value.trim()}] added`)
                            }
                            typedTodo.current.value = '';
                        }}>
                            Add New Item
                        </button>
                        <ul>
                            {todoStore.activeItems.map(item => (
                                <TodoListItem
                                    key={item.id}
                                    name={item.name}
                                    tags={[...item.tags]}
                                    status={TodoStatus[item.status]}
                                    onComplete={() => {
                                        const before = TodoStatus[item.status]
                                        todoStore.setStatusNext(item.id)
                                        const after = TodoStatus[item.status]
                                        appendingLogStore.add(`Todo Item [${item.name}] Status Changed: ${before} -> ${after}`)
                                        
                                    }}
                                    onChange={(e) => {
                                        appendingLogStore.add(`Todo Item Name [${item.name}] Changed: ${e}`)
                                        todoStore.setItemName(item.id, e.target.text)
                                    }}
                                    onTagClick={(e) => {
                                        const tag = e.target.value;
                                        if(todoStore.hasTag(item.id, tag)){
                                            todoStore.deleteTag(item.id, tag)
                                            appendingLogStore.add(`Todo Item [${item.name}]: Tag [${tag}] Deleted`)
                                        } else {
                                            todoStore.addTag(item.id, tag)
                                            appendingLogStore.add(`Todo Item [${item.name}]: Tag [${tag}] Added`)
                                        }
                                        
                                    }}
                                />
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2 className="completedTitle">Completed Items</h2>
                        <ul className="completedItemList">
                            {todoStore.completedItems.map(item => (
                                <li className="completedItem" key={item.id}>
                                    <div className="completedItemName">{item.name}</div> 
                                    {[...item.tags].map(t => <div className="completedItemTag">{t}</div>)}
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>
                <section className="flexRight">
                    <TagsList/>
                </section>

            </div>
            <div className="">
                    <AppendingLogView/>
            </div>
            <footer>
                    
            </footer>
        </div>
    )
}




export default styled(observer(TodoList))`
    background-color: lightgray;

    .title {
        color: orange;
    }
    .flexContainer{
        height:80vh;
        display:flex;
        flex-direction:row;
    }
    .flexLeft, .flexRight{
        width:50%
    }
    ul{
        list-style-type:none;
    }
    .completedItem{
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        background:white;
        border: black 1px solid;
        border-radius:3px;
        margin:2px;
        padding:2px 4px;

    }
    .completedItemName{
        font-size:1em;
        font-weight:bold;
        width:100%;
    }
    .completedItemTag{
        font-size:0.8em;
        border: black 1px solid;
        border-radius:3px;
        padding: 1px 2px;
        margin: 2px;
        background-color: #E9C46A;

    }
`
