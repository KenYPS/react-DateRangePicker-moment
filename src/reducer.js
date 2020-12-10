import * as React from 'react'
import moment from 'moment'

const SET_CALENDARVIEW = 'SET_CALENDARVIEW'
const SET_DATE = 'SET_DATE'
const initialState = {
  calendarViewMonth: moment().subtract(1, 'M').format('YYYY-MM'),
  selectedStartDate: '',
  selectedEndDate: '',
  selectedType: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CALENDARVIEW:
      const momentTime = state.calendarViewMonth
      const calendarViewMonth = moment(momentTime)
        .add(action.value, 'M')
        .format('YYYY-MM')

      const selectedType = action.value > 0 ? 'add-Month' : 'last-Month'
      return {
        ...state,
        calendarViewMonth,
        selectedType,
      }

    case SET_DATE:
      const type = action.dateType
      const date = action.selecteDate
      return {
        ...state,
        [type]: date,
      }
    default:
      return state
  }
}

const ContextStore = React.createContext(initialState)

export { initialState, reducer, ContextStore }
