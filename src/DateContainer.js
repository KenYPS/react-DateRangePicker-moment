import * as React from 'react'
import styled from 'styled-components'
import moment from 'moment'
// style
export default function DateContainerComp({
  className,
  label = '開始',
  selectedDate = '請選擇日期',
  onClick,
}) {
  return (
    <DateContainer className={className} onClick={onClick}>
      <TitleName>{label}</TitleName>
      <ChooseDate>
        {moment.isDate(selectedDate) || moment.isMoment(selectedDate)
          ? moment(selectedDate).format('MM/DD')
          : '請選擇日期'}
      </ChooseDate>
    </DateContainer>
  )
}

const DateContainer = styled.div`
  width: 180px;
  height: 68px;
  border: 1px solid transparent;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;

  /* border:1px solid #767676; */

  cursor: pointer;
  padding: 16px 24px;
  :hover,
  &.active {
    border-radius: 10px;
    border: 1px solid #767676;
  }
  &.active {
    background: #4a4a4a4d;
  }
`
const TitleName = styled.div`
  font-size: 0.875rem;
  font-weight: 800;
  text-align: left;
`
const ChooseDate = styled.div`
  font-size: 0.875rem;
  text-align: left;
`
