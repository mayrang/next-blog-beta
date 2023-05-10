저번 Schedule 캘린더 Array 코드에서 추가된 부분이 있어서 추가 포스팅하게 됐다

```
const checkPost = posts.filter((post) => {
      return (
        dayjs(dayFormat, "YYYYMMDD").isSameOrAfter(dayjs(post.date)) &&
        dayjs(dayFormat, "YYYYMMDD").isSameOrBefore(dayjs(post.date).add(post.time, "millisecond"))
      );
    });
```

먼저 위 코드는 해당날짜에 걸치는 스케줄 배열을 가져오는 코드이다. 해당 코드에서 dayjs의 isSameOrAfter와 isSameOrBefore 함수를 썼다. 이 함수들은 지정한 시각이 특정 시각보다 이전인지, 이후인지를 구하는 코드로 아래와 같이 dayjs 모듈에 extend 시켜줘야 한다.

```
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
```

참고로 dayjs는 매우 가벼운 용량을 자랑하는 날짜 라이브러리로 나중에 시간이 되면 관련 포스팅을 써볼까 한다. 

그리고 클라이언트에 스케줄 달력을 그리는 과정에서 각 날짜의 스케줄목록에서 가장 높은 index값을 구해서 해당날짜 객체에 저장할 필요를 느꼈다. 

해당 필드 이름은 maxIndex로 하고, 해당 날짜에 스케줄이 아예 없으면 -1을 넣기로 했다.

```
 // 이전 달
 if (prevLastDay !== 6) {
    for (let i = 0; i < prevLastDay + 1; i++) {
      weekArray.unshift({ date: prevLastDate - i, type: "prev", maxIndex: -1 });
      count++;
    }
  }
  
 // 다음 달
for (let i = 1; i < 7 - nextDay; i++) {
weekArray.push({ date: i, type: "next", maxIndex: -1 });
if (count === 6) {
  monthArray.push(weekArray);
  weekArray = [];
  count = 0;
} else {
  count++;
}
}
```

먼저 이전 달과 다음 달의 해당하는 날짜 객체들에는 스케줄 목록이 존재하지 않으므로 -1을 넣어준다.

```
{scheduleId: 4, content: '일정4', date: M, time: 3119800000, index: 2, start: false}
```

참고로 스케줄 목록은 위와 같은 객체로 구성된 배열이다.

```
if (indexingPost && indexingPost.length > 0) {
  maxIndex = indexingPost.reduce((prev, value) => (prev.index >= value.index ? prev : value)).index;
} else {
  maxIndex = -1;
}
```

그리고 해당 달의 날짜 객체를 구하는 부분에서는 먼저 해당 날짜의 스케줄 목록이 1개 이상 있는지 검사하고 있을 때에는 스케줄 목록에서 가장 높은 index 값을 구해서 maxIndex 변수에 저장하고 없을 때에는 -1을 저장한다. 

위 코드를 다 완성하고 나면 아래와 같은 날짜 객체가 나오게 된다. 

```
{date: 9, dayFormat: '20230109', posts: Array(4), maxIndex: 3}
```

여행 출발까지 2시간도 안 남은 상태에서 급하게 글을 쓰느라 횡설수설한 포스팅이 된 것 같은데, 다음 포스팅에서는 이렇게 만들어진 날짜 객체 배열(정확히는 2중 배열)을 가지고 본격적으로 화면에 그려보도록 하겠다.