import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import storesContext from '../context/MainContext'

const useStores = () => React.useContext(storesContext)

function TodoListItem({ className, name, tags, status, onComplete, onChange, onTagClick }) {
    const { tagStore } = useStores();
    return (
        <li className={className}>
            <button onClick={onComplete}>{status}</button>
            <input onChange={onChange} value={name} />
            <div className="tagsContainer">
                {tags.map(tag => (<div className="tag">{tag}</div>))}
            </div>
            {tagStore.alltags.map(tag => (
                <button value={tag} onClick={onTagClick}>{tag}</button>
            ))}
            
        </li>
    )
}

export default styled(observer(TodoListItem))`
    .tagsContainer{
        padding:3px;
        display:flex;
        flex-direction:row;
    }
    .tag{
        font-size:0.8em;
        border: black 1px solid;
        border-radius:3px;
        padding: 1px 2px;
        margin: 2px;
        background-color: #E9C46A;
    }
`
