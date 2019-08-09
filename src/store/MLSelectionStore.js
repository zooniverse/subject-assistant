import { types, getRoot } from 'mobx-state-tree'
import { SELECTION_OPERATORS, SELECTION_THRESHOLDS } from '@util'

const NUM_OF_SAMPLES = 20

const MLSelectionStore = types.model('MLSelectionStore', {
  
  selection: types.array(types.frozen({})),
  sample: types.array(types.frozen({})),
  
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
      
      // Select only the Subject images that fit a criteria
      const selection = images.filter(image => {
        const likelinessToBeEmpty = (1 - image.max_detection_conf) * 100
        
        switch (self.operator) {
          case SELECTION_OPERATORS.GREATER_THAN:
            return self.threshold <= likelinessToBeEmpty
          case SELECTION_OPERATORS.LESS_THAN:
            return self.threshold >= likelinessToBeEmpty
        }
        return false        
      })
      
      // Now from that selection, pick a random smaller sample
      const numOfSamples = Math.min(selection.length, NUM_OF_SAMPLES)
      const startIndex = Math.floor(Math.random() * (selection.length - numOfSamples))
      const endIndex = startIndex + numOfSamples
      
      self.selection = selection
      self.sample = selection.slice(startIndex, endIndex)
    }
    
  }
})

export { MLSelectionStore }
