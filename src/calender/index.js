import * as React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { ContextStore } from '../reducer'

// comp
import MonthPicker from './MonthPicker'
import DatePicker from './DatePicker'

// transition
import GrowShrink from '../styled/transitioin/GrowShrink'

// hook
import useMediaQuery from '../hooks/useMediaQuery'

// media
import { media } from '../cssMix'

function calcWeeksInMonth(momentDate) {
  const monthStartWeekNumber = momentDate.startOf('month').week()
  const distinctWeeks = {
    [monthStartWeekNumber]: true,
  }
  let startOfMonth = momentDate.clone().startOf('month')
  let endOfMonth = momentDate.clone().endOf('month')
  //  this is an 'inclusive' range -> iterates through all days of a month
  for (
    let day = startOfMonth.clone();
    !day.isAfter(endOfMonth);
    day.add(1, 'days')
  ) {
    distinctWeeks[day.week()] = true
  }
  return Object.keys(distinctWeeks).length
}

export default ({ handleDayClick, startDate, endDate, calendarPosition }) => {
  const { state, dispatch } = React.useContext(ContextStore)
  const [inProps, setInProps] = React.useState(false)
  const calendarViewMonth = state.calendarViewMonth
  const selectedType = state.selectedType
  const mediaType = useMediaQuery()
  const calendarAmount = mediaType === 'pc' ? 2 : 1

  const onMonthChangeClick = (value) => {
    dispatch({ type: 'SET_CALENDARVIEW', value })
  }

  // set (in) prop to tranform calendar
  React.useEffect(() => {
    let getWeeksNum
    let getNextMonthWeeksNumb = 0
    getWeeksNum = calcWeeksInMonth(moment(calendarViewMonth))
    if (mediaType === 'pc') {
      getNextMonthWeeksNumb = calcWeeksInMonth(
        moment(calendarViewMonth).add(1, 'M')
      )
    }
    setInProps(getWeeksNum > 5 || getNextMonthWeeksNumb > 5)
  }, [calendarViewMonth, mediaType])

  return (
    <GrowShrink inProps={inProps}>
      <CalendarWrap calendarPosition={calendarPosition}>
        {Array(calendarAmount)
          .fill(0)
          .map((v, i) => (
            <Calendar
              key={i}
              calendarViewMonth={moment(calendarViewMonth).add(i, 'M')}
              onMonthChangeClick={onMonthChangeClick}
              selectedType={selectedType}
              selectedStartDate={startDate}
              selectedEndDate={endDate}
              handleDayClick={handleDayClick}
              // give seq to decide icon appear
              isShowForwarIcon={i > 0 ? false : true}
              isShowBackIcon={mediaType !== 'pc' || i > 0}
            />
          ))}
      </CalendarWrap>
    </GrowShrink>
  )
}

const Calendar = ({
  calendarViewMonth,
  onMonthChangeClick,
  selectedType,
  selectedStartDate,
  selectedEndDate,
  handleDayClick,
  isShowForwarIcon,
  isShowBackIcon,
}) => (
  <StyledCalendar>
      <MonthPicker
        calendarViewMonth={calendarViewMonth}
        onMonthChangeClick={onMonthChangeClick}
        selectedType={selectedType}
        isShowForwarIcon={isShowForwarIcon}
        isShowBackIcon={isShowBackIcon}
      />
      <DatePicker
        calendarViewMonth={calendarViewMonth}
        selectedType={selectedType}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        handleDayClick={handleDayClick}
      />
  </StyledCalendar>
)

// style
const CalendarWrap = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 1px solid black;
  padding: 8px 24px;
  height: 358px;
  width: 776px;
  border-radius: 10px;
  position: absolute;
  background: #ffffff;
  z-index: 10000;
  ${({ calendarPosition }) =>
    calendarPosition === 'right' ? { right: 0 } : { }}
  ${media.tablet`
    width:388px;
`};
`

const StyledCalendar = styled.div`
  box-sizing: border-box;
  margin-top: 10px;
  width: 336px;
  height: 358px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 39px;
`
