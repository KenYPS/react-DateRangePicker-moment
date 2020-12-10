import * as React from 'react'
import styled from 'styled-components'
import moment from 'moment'

// animation
import SlideInOut from '../styled/transitioin/SlideInOut'

// icon

export default ({
  calendarViewMonth,
  onMonthChangeClick,
  selectedType,
  isShowForwarIcon,
  isShowBackIcon,
}) => {
  const nowYearMonth = moment(calendarViewMonth).format('YYYY年M月')

  return (
    <YearMonthPickArea>
      {isShowForwarIcon ? (
        <IconWrap onClick={onMonthChangeClick.bind(null, -1)}>{'<'}</IconWrap>
      ) : (
        <div></div>
      )}
      <SlideInOut keyName={calendarViewMonth} classNames={selectedType}>
        <YearMonth>{nowYearMonth}</YearMonth>
      </SlideInOut>
      {isShowBackIcon && (
        <IconWrap onClick={onMonthChangeClick.bind(null, 1)}>{'>'}</IconWrap>
      )}
    </YearMonthPickArea>
  )
}

// style

const IconWrap = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  flex: 0 0 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    height: 18px;
    width: 18px;
  }
  :hover {
    background: #0000001a;
  }
`

const YearMonthPickArea = styled.div`
  display: grid;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  width: 100%;
  grid-template-columns: 30px 275px 30px;
  grid-template-areas: 'leftIcon yearmonth rightIcon';
  ${IconWrap}:nth-child(1)& {
    grid-area: leftIcon;
  }
  ${IconWrap}:nth-child(3)& {
    grid-area: rightIcon;
  }
`

// const StyledSlideInOut = styled(SlideInOut)`
// flex:0 0 285px;

// `
const YearMonth = styled.div`
  font-weight: 800;
  text-align: center;
`
