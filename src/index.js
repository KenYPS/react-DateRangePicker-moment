import * as React from 'react'
import styled from 'styled-components'
import DateContainer from './DateContainer'
import moment from 'moment'
// reducer
import { initialState, reducer, ContextStore } from './reducer'
import Calendar from './calender/index'
// hook
import useOutsideClick from './hooks/useOutsideClickAlert'

const DateRangePickerComp = function ({
  startDate = moment(),
  endDate = moment(),
  onChange = () => {},
}) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [startActive, setStartActive] = React.useState(false)
  const [endActive, setEndActive] = React.useState(false)
  const [calendarPosition, setCalendarPosition] = React.useState('left')

  const wrapperRef = React.useRef(null)

  useOutsideClick(wrapperRef, cancelDatePickActive, startActive || endActive)

  // set calendar position to right or left
  React.useEffect(() => {
    const calendarDom = wrapperRef.current
    const offsetRight =
      window.innerWidth - calendarDom.offsetLeft - calendarDom.offsetWidth

    if (656 - calendarDom.offsetWidth > offsetRight) {
      setCalendarPosition('right')
    }
  }, [])

  const handleStartState = () => {
    setStartActive((pre) => !pre)
    setEndActive(false)
  }

  const handleEndState = () => {
    setEndActive((pre) => !pre)
    setStartActive(false)
  }

  const handleActiveState = (type) => {
    if (type === 'start') return handleStartState()
    handleEndState()
  }

  function cancelDatePickActive() {
    setEndActive(false)
    setStartActive(false)
  }

  const checkBothTypeIsSelected = (startDate, endDate) =>
    moment.isMoment(startDate) && moment.isMoment(endDate)

  const checkSelectedBeforeStart = (startDate, selectedDate) =>
    moment(selectedDate).isBefore(startDate)
  const checkSelectedAfterEnd = (endDate, selectedDate) =>
    moment(selectedDate).isAfter(endDate)

  const handleDayClick = React.useCallback(
    (selecteDate) => {
      let ifSelectedBefore = false
      let ifSelectedAfter = false

      let dateType = (startActive && 'startDate') || (endActive && 'endDate')

      if (dateType === 'startDate') {
        ifSelectedAfter = checkSelectedAfterEnd(endDate, selecteDate)
        handleEndState()
      }
      if (dateType === 'endDate' && !moment.isMoment(startDate)) {
        handleStartState()
      }
      if (dateType === 'endDate' && checkBothTypeIsSelected) {
        ifSelectedBefore = checkSelectedBeforeStart(startDate, selecteDate)
      }
      if (ifSelectedBefore || ifSelectedAfter) {
        dateType = 'startDate'
        return onChange({ startDate: selecteDate, endDate: '' })
      }

      if (dateType === 'startDate') {
        return onChange({ startDate: selecteDate, endDate: endDate })
      }

      onChange({ startDate, endDate: selecteDate })
    },
    [endActive, endDate, onChange, startActive, startDate]
  )

  return (
    <ContextStore.Provider value={{ state, dispatch }}>
      <DateRangePicker ref={wrapperRef}>
        <DatesWrap>
          <DateContainer
            label="開始"
            selectedDate={startDate}
            onClick={handleActiveState.bind(null, 'start')}
            className={startActive && 'active'}
          />
          <DateContainer
            label="結束"
            selectedDate={endDate}
            onClick={handleActiveState.bind(null, 'end')}
            className={endActive && 'active'}
          />
        </DatesWrap>
        {(startActive || endActive) && (
          <React.Suspense fallback={<div></div>}>
            <Calendar
              calendarPosition={calendarPosition}
              handleDayClick={handleDayClick}
              startDate={startDate}
              endDate={endDate}
            />
          </React.Suspense>
        )}
      </DateRangePicker>
    </ContextStore.Provider>
  )
}

const DatesWrap = styled.div`
  display: flex;
  width: 360px;
  position: relative;
`
const DateRangePicker = styled.div`
  width: 100%;
`
export default DateRangePickerComp