import React from 'react'

import createTagStore from '../store/TagStore'
import { createAppendingLogStore } from '../store/AppendingLogStore'

const storesContext = React.createContext({
    tagStore: createTagStore(),
    appendingLogStore: createAppendingLogStore()
})
export default storesContext;