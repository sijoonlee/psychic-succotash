import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import storesContext from '../context/MainContext'

const useStores = () => React.useContext(storesContext)

function AppendingLogView({ className }) {
    const { appendingLogStore } = useStores();
    return (
        <li className={className}>
            {appendingLogStore.get().map(log => (
                <ul>{log.message} - {log.time}</ul>
            ))}
        </li>
    )
}

export default styled(observer(AppendingLogView))`
    color: blue;
`
