import * as React from "react";
import styled, { css } from 'styled-components'
import moment from 'moment'
// animation
import SlideInOut from '../styled/transitioin/SlideInOut'

const weekSeq = ['日', 'ㄧ', '二', '三', '四', '五', '六']

export default ({ calendarViewMonth,
    selectedType,
    selectedStartDate,
    selectedEndDate,
    handleDayClick =()=>{}
}) => {
    // get Number
    // sunday - 0
    // saturday - 7
    const firstDateDay = moment(calendarViewMonth).startOf('month').format('d')
    const emptyDayArray = React.useMemo(() => {
        let array = []
        for (let i = 0; i < firstDateDay; i++) {
            array.push(0)
        }
        return array
    }, [firstDateDay])
    const daysArray = getDatesBetweenTwoDates(moment(calendarViewMonth).startOf('month').format('YYYY-MM-DD'), moment(calendarViewMonth).endOf('month').format('YYYY-MM-DD'))
    return <DatePicker>
        <Week>
            {weekSeq.map((v, i) => <Weeklabel key={i}>{v}</Weeklabel>)}
        </Week>
        <SlideInOut
            keyName={calendarViewMonth}
            classNames={selectedType}
        >
            <Days
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                daysArray={daysArray}
                emptyDayArray={emptyDayArray}
                handleDayClick={handleDayClick} />
        </SlideInOut>

    </DatePicker>

};


function Days({ daysArray,
    emptyDayArray,
    selectedStartDate,
    selectedEndDate,
    handleDayClick
}) {

    return <DayWrap>
        {emptyDayArray.map((v, i) => <Empty key={i} />)}
        {daysArray.map((v, i) => {
            const isBetweenDates = moment(v).isBetween(selectedStartDate, selectedEndDate)
            const isStatrtSelected = moment(v).isSame(selectedStartDate,'day')
            const isEndSelected = moment(v).isSame(selectedEndDate,'day')
            return <DayContainer key={v}
                onClick={() => handleDayClick(moment(v))
                }
                isBetweenDates={isBetweenDates}
                isStatrtSelected={isStatrtSelected}
                isEndSelected={isEndSelected}
            >
                <Day
                    isStatrtSelected={isStatrtSelected}
                    isEndSelected={isEndSelected}
                >
                    {i + 1}
                </Day>
            </DayContainer>
        }
        )
        }

    </DayWrap>
}

const getDatesBetweenTwoDates = (startDate, endDate) => {
    let listDate = [];
    let dateMove = moment(startDate);
    let strDate = moment(startDate)
    const endate = moment(endDate)

    while (dateMove <= endate) {
        strDate = moment(dateMove).format('YYYY-MM-DD')
        listDate.push(strDate);
        dateMove.add(1, 'd');
    }
    return listDate

}

const DatePicker = styled.div`
width:100%;
height:100%;
display:grid;
grid-template-rows:22px auto; 
`;

const Week = styled.div`
display: grid;
grid-template-columns:repeat(7, 48px);
justify-items:center;
align-items:center;
`
const Weeklabel = styled.label`
font-size:0.875rem;
`

const DayWrap = styled.div`
width:100%;
height:100%;
display:grid;
/* flex-wrap:wrap; */
grid-template-columns:repeat(7, 48px);
grid-template-rows:repeat(auto-fill, 48px);
grid-row-gap:2px;
box-sizing:border-box;
`

const Day = styled.div`
width:100%;
height:100%;
border-radius:50%;
border:2px solid transparent;
display: flex;
justify-content:center;
align-items:center;
box-sizing:border-box;
${({ isStatrtSelected, isEndSelected }) => (isStatrtSelected || isEndSelected) && css`
    background:#000000;
    background-position:center;
    color:#ffffff;
    border-radius:50%;
`}
`
const DayContainer = styled.div`
cursor: pointer;
box-sizing:border-box;
width:48px;
height:48px;
display: flex;
justify-content:center;
align-items:center;
background: ${({ isBetweenDates }) => isBetweenDates && '#f7f7f7'};
${({ isStatrtSelected }) => (isStatrtSelected) && css`
background: linear-gradient(90deg, #FFFFFF 50%, #F7F7F7 50%);
`}
${({ isEndSelected }) => (isEndSelected) && css`
background: linear-gradient(90deg, #F7F7F7 50%, #FFFFFF 50%);
`}
:hover{
${Day}&{
    border:2px solid #000000;
   }
}
`

const Empty = styled.div`
width:48px;
height:48px;
`