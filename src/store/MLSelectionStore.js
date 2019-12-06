import { types, getRoot } from 'mobx-state-tree'
import { SELECTION_WITH_IMAGES, SELECTION_OPERATORS, SELECTION_THRESHOLDS } from '@util'

const NUM_OF_SAMPLES = 20

const MLSelectionStore = types.model('MLSelectionStore', {
  
  selection: types.array(types.frozen({})),
  sample: types.array(types.frozen({})),
  
  withImages: types.optional(types.string, SELECTION_WITH_IMAGES.AT_LEAST_ONE_IMAGE),
  operator: types.optional(types.string, SELECTION_OPERATORS.GREATER_THAN),
  threshold: types.optional(types.integer, SELECTION_THRESHOLDS.DEFAULT),
  
}).actions(self => ({
  
  reset () {
    self.selection = []
  },

  setWithImages (val) {
    self.withImages = val
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
    const selection = images    
    .filter(filterImageByDetectionConfidence.bind(this, self.threshold, self.operator))
    .map(parseImageMeta)

    // Now from that selection, pick a random smaller sample
    const numOfSamples = Math.min(selection.length, NUM_OF_SAMPLES)
    const startIndex = Math.floor(Math.random() * (selection.length - numOfSamples))
    const endIndex = startIndex + numOfSamples

    self.selection = selection
    self.sample = selection.slice(startIndex, endIndex)
  },
}))

function filterImageByDetectionConfidence (threshold, operator, image) {
  const likelinessToBeEmpty = (1 - image.max_detection_conf) * 100

  switch (operator) {
    case SELECTION_OPERATORS.GREATER_THAN:
      return threshold <= likelinessToBeEmpty
    case SELECTION_OPERATORS.LESS_THAN:
      return threshold >= likelinessToBeEmpty
  }
  
  return false
}

/*
Our ML provider's datum unit is the Image, and the Image stores the metadata
(describing the Zooniverse Subject) as a string, which we need to convert into
a JS object.
 */
function parseImageMeta (image) {
  let meta = {}
  
  try {
    meta = image && JSON.parse(image.meta)
  } catch (err) {}
  
  return {
    ...image, meta
  }
}

export { MLSelectionStore }
