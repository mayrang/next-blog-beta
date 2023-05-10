평소처럼 코딩을 하다가 node 버전을 올려야할 일이 생겨서 구글링을 해봤다.

## 1\. n 으로 시도

```
npm cache clean -f // npm 캐시 삭제
npm install -g n
```

먼저 위 명령어를 사용해 n 을 설치하려고 했는데

[##_Image|kage@XFWmT/btrVCf1v4cv/KjMvZ2JIuQ6QhtrKKKaubk/img.png|CDM|1.3|{"originWidth":756,"originHeight":145,"style":"alignCenter","caption":"error.."}_##]

안된다..

에러를 검색해보니 윈도우에서는 n을 사용할 수 없는 것 같아 다른 방법을 찾아보기로 했다.

## 2\. nvm 사용

([https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases))  
먼저 위 링크 git 저장소로 가서 nvm-setup.zip 파일을 다운로드 한 다음  
압축을 풀고 nvm-setup.exe를 실행하여 설치한다.

그리고 Windows PowerShell을 실행하여 아래 명령어를 입력하면 된다.

```
npm install v18.13.0 // 23-01-07 기준 lts 버전 설치
npm use 18.13.0 // 해당 버전 활성화
```

마지막으로 node 버전을 확인하면 끝!

```
node -v
```

---

### 참고 블로그

#### [https://jsikim1.tistory.com/158](https://jsikim1.tistory.com/158)

#### [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)