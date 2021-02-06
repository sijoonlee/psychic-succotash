import React, { useRef } from 'react'
import { observer } from 'mobx-react'
import storesContext from '../context/MainContext'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const useStores = () => React.useContext(storesContext)

function TagsList({ className }) {
    const { tagStore } = useStores();
    const typedTag = useRef(null);
    return (
        <div className={className}>
            <div className="newTagForm">
                <input className="newTagInput" type="text" ref={typedTag}></input>
                <div className="newTagClick" onClick={()=>tagStore.addTag(typedTag.current.value)}>Click to Add</div>
            </div>
            <div className="tagItemsContainer">
                {tagStore.alltags.map(tag => (
                    <div className="tagItem">
                        <div className="tagDelete" onClick={()=>tagStore.deleteTag(tag)}><FontAwesomeIcon icon={faTrash} /></div>
                        <div className="tagName">{tag}</div>
                    </div>
                ))}
            </div>
            
        </div>);
}

export default styled(observer(TagsList))`
    background-color:white;
    .tagItemsContainer{
        display:flex;
        flex-direction:column;
        margin:2px;
    }
    .tagItem{
        display:flex;
        flex-direction:row;
    }
    .newTagForm{
        display:flex;
        flex-direction:row;
    }
`