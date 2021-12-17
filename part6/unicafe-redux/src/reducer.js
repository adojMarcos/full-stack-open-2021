const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let obj = {...state}
  switch (action.type) {
    case 'GOOD':
      obj.good++
      return obj
    case 'OK':
      obj.ok++
      return obj
    case 'BAD':
      obj.bad++
      return obj
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer