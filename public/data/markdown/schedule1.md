먼저 캘린더에 일정 목록들을 표시하기 위한 배열을 만들기 위해서 utils폴더에 displaySchedule.js 파일을 만들어주었다.

우선 필요한 변수들을 선언해 준다.

```
//월 배열
  let monthArray = [];
  //주 배열
  let weekArray = [];
  //전날의 스케쥴 목록
  let prevDayPost = [];
  // YYYYMMDD 형식으로 저장할 문자열 변수
  let dayFormat = "";
  // 일요일인지 확인하기 위한 count 변수
  let count = 0;
  
   //이전 날짜
  let prevLastDate = new Date(year, month - 1, 0).getDate();
  let prevLastDay = new Date(year, month - 1, 0).getDay();

  //다음 날짜
  const nextDay = new Date(year, month, 0).getDay();
  const nextDate = new Date(year, month, 0).getDate();
```

prevLastDate는 바로 이전 달의 마지막날이 며칠인지에 대한 변수이고, prevLastDay는 그날이 무슨 요일인지 표시하는 변수로  0은 일요일, 1은 월요일... 6은 토요일 이런 식으로 저장되게 된다.

그리고 먼저 달력에서 이전 달의 날짜들을 표시하기 위한 코드들을 만들어준다.

[##_Image|kage@bcCHKY/btrXVxySU43/U7Pk4Ny9Oo2UmvZElxiH4k/img.png|CDM|1.3|{"originWidth":817,"originHeight":136,"style":"alignCenter","caption":"이 부분.."}_##]

```
if (prevLastDay !== 6) {
    for (let i = 0; i < prevLastDay + 1; i++) {
      weekArray.unshift({ date: prevLastDate - i, type: "prev" });
      count++;

    }
  }
```

먼저 prevLastDay가 일요일(6)인지 확인한다. 마지막 날짜가 토요일이면 이번달 1일의 날짜가 일요일이라는 뜻으로 이전 달의 날짜들을 표시할 필요가 없기 때문이다. 그리고 반복문을 돌려서 weekArray에 날짜를 의미하는 date 프로퍼티에 날짜를 넣어주고 type 프로퍼티에 이전달의 날짜를 의미하는 prev 문자열을 넣어준다.

23년 2월을 예로 들면 이전 달인 1월의 마지막 날짜의 요일인 2(화요일)에 +1만큼 반복문을 돌면서 i가 0일 때는 prevLastDate(31)-0인 31, i가 1일 때는 30, i가 2일 때는 29를 weekArray에 거꾸로 넣어줘서 결과적으로는 아래와 같은 객체가 나오게 되는 것이다.

```
[
  {date: 29, type: "prev"},
  {date: 30, type: "prev"},
  {date: 31, type: "prev"}
]
```

다음은 이번달의 달력을 채울 차례이다.

```
for (let i = 1; i < nextDate + 1; i++) {
    let indexingPost = [];
    dayFormat =
      year.toString() +
      (parseInt(month) < 10 ? "0" + month.toString() : month.toString()) +
      (i < 10 ? "0" + i.toString() : i.toString());
    const checkPost = posts.filter((post) => {
      return (
        dayjs(dayFormat, "YYYYMMDD").isSameOrAfter(dayjs(post.date)) &&
        dayjs(dayFormat, "YYYYMMDD").isSameOrBefore(dayjs(post.date).add(post.time, "millisecond"))
      );
    });

    const sortedPost = checkPost.sort((a, b) => a.date - b.date || a.time - b.time);
    if (dayjs(dayFormat, "YYYYMMDD").get("day") === 0 || i === 1) {
      indexingPost = sortedPost.map((post, idx) => {
        return {
          ...post,
          index: idx,
          start: true,
        };
      });
    } else {
      for (const post of checkPost) {
        const findIndex = prevDayPost.find((prevPost) => prevPost.scheduleId === post.scheduleId);
        if (findIndex) {
          indexingPost.push({ ...post, index: findIndex.index, start: dayjs(post.date).get("date") === i });
        } else {
          const index = isNaN(indexingPost[indexingPost.length - 1]?.index)
            ? 0
            : indexingPost[indexingPost.length - 1].index + 1;

          indexingPost.push({ ...post, index, start: dayjs(post.date).get("date") === i });
        }
      }
    }
    indexingPost = indexingPost.sort((a, b) => a.index - b.index);

    const holiday = holidays?.find((holiday) => holiday.locdate?.toString() === dayFormat);
 
    if (holiday) {
      weekArray.push({ date: i, dayFormat, posts: [...indexingPost], holiday: holiday });
    } else {
      weekArray.push({ date: i, dayFormat, posts: [...indexingPost] });
    }

    prevDayPost = [...indexingPost];
    if (count === 6) {
      monthArray.push(weekArray);
      weekArray = [];
      count = 0;
    } else {
      count++;
    }
  }
```

간단하게 설명을 하자면 그 달의 일 수만큼 반복문을 돌리면서 먼저 index 프로퍼티를 추가해 넣을 배열 변수를 초기화하고, 해당 날짜를 YYYYMMDD 형식의 문자열로 변환해 저장하는 dayFormat 변수를 만든다. 

그리고 checkPost로 해당 날짜에 걸쳐있는 스케줄 목록들을 저장하고, 그 목록을 첫 번째로 빠른 시각순으로 정렬하고 시각이 똑같으면 스케줄 기간이 긴 순으로 정렬해서 sortedPost 변수에 저장한다. 

그리고 해당날짜가 일요일인지, 혹은 그 달의 1일인지를 체크한다. 만약 해당 조건문이  참이면 sortedPost의 각 스케줄 안에 순서대로 index를 넣고, start 필드에 true 값을 넣어줘 indexingPost에 저장하고, 거짓이면 checkPost를 반복문 돌리면서 전날 스케줄 목록(prevDayPost)에 있는 스케줄인지를 찾고, 있으면 전날 스케줄의 index를 넣고 없으면 마지막 스케줄의  index +1을 해서 넣는다. 그러고 나서 indexingPost를 index순으로 정렬하고, 해당 날짜가 공휴일인지 체크한 뒤에 weekArray에 넣는다. 그리고 전날의 스케줄을 뜻하는 prevDayPost에 indexingPost를 넣는다. 마지막으로 해당날짜가 일요일이면 monthArray에 weekArray를 넣고 weekArray와 count를 초기화시키고 아니면 count++를 해준다. 

```
for (let i = 1; i < 7 - nextDay; i++) {
    weekArray.push({ date: i, type: "next" });
    if (count === 6) {
      monthArray.push(weekArray);
      weekArray = [];
      count = 0;
    } else {
      count++;
    }
  }

  return monthArray;
```

마지막으로 해당 달의 다음 달 부분을 추가하기 위한 반복문을 짜고 완성된 monthArray를 반환해주면 된다.

사실 위에 코드가 많이 지저분하지만 나중에 테스트를 해보면서 차근차근 고쳐나가야 할것같다. 

다음 포스트에서는 반환한 monthArray 배열을 가지고 클라이언트에 그리는 과정을 포스팅해보려고 한다.