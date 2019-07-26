import { types, getRoot } from 'mobx-state-tree'
import { SELECTION_OPERATORS, SELECTION_THRESHOLDS } from '@util'

const NUM_OF_SAMPLES = 20

const MLSelectionStore = types.model('MLSelectionStore', {
  
  selection: types.optional(types.array(types.frozen({})), []),
  sample: types.optional(types.array(types.frozen({})), []),
  
  operator: types.optional(types.string, SELECTION_OPERATORS.GREATER_THAN),
  threshold: types.optional(types.integer, SELECTION_THRESHOLDS.DEFAULT),
  
}).actions(self => {
  return {
    
    reset () {
      self.selection = []
    },
    
    setOperator (val) {
      self.operator = val
    },
    
    setThreshold (val) {
      let num = (val !== '') ? parseInt(val) : 0
      if (!isNaN(num)) self.threshold = num
    },
    
    makeSelection () {
      const root = getRoot(self)
      
      const images = root.mlResults.data.images || []
      
      self.selection = images.slice()
      self.sample = self.selection.slice(0, NUM_OF_SAMPLES)
    }
    
  }
})

export { MLSelectionStore }
