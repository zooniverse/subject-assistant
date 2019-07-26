import { types } from 'mobx-state-tree'
import { SELECTION_OPERATORS, SELECTION_THRESHOLDS } from '@util'

const MLSelectionStore = types.model('MLSelectionStore', {
  
  selection: types.optional(types.array(types.frozen({})), []),
  sample: types.optional(types.array(types.frozen({})), []),
  
  operator: types.optional(types.string, SELECTION_OPERATORS.GREATER_THAN),
  threshold: types.optional(types.integer, SELECTION_THRESHOLDS.DEFAULT),
  
}).actions(self => {
  return {
    
    reset () {
      // TODO
    },
    
    setOperator (val) {
      self.operator = val
    },
    
    setThreshold (val) {
      let num = (val !== '') ? parseInt(val) : 0
      if (!isNaN(num)) self.threshold = num
    },
    
    makeSelection () {
      // TODO
    }
    
  }
})

export { MLSelectionStore }
