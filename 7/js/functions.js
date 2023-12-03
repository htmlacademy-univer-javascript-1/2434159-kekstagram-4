const checkStrokeLength = (str, maxLength) => str.length <= maxLength;

const isPalindromeStr = (str) => {
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str.at(i) !== str.at(len - 1 - i)) {
      return false;
    }
  }
  return true;
};

function checkWorkTime(dayBegin, dayEnd, meetingBegin, duration) {
  const beginTime = dayBegin.split(':');
  const endTime = dayEnd.split(':');
  const meetingBeginTime = meetingBegin.split(':');
  const dayBeginMinutes = (+beginTime[0]) * 60 + (+beginTime[1]);
  const dayEndMinutes = (+endTime[0]) * 60 + (+endTime[1]);
  const meetingBeginMinutes = (+meetingBeginTime[0]) * 60 + (+meetingBeginTime[1]);
  return dayBeginMinutes <= meetingBeginMinutes && meetingBeginMinutes + duration <= dayEndMinutes;
}
