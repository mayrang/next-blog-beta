동아리 프로젝트를 진행 중 next.js 13 버전에 맞게 마이그레이션을 하던 도중 발생한 에러였다.

참고로 현재 프론트엔드는 Next.js 13 버전과 React 18 버전을 사용하고 있고, 백엔드는 Node Express를 쓰고 Docker를 사용하고 있다.

해당 에러는 server component 상에서  백엔드로 fetch함수를 이용하여 http 요청을 보낼때 발생한 에러로 아래와 같은 에러가 발생했었다.

[##_Image|kage@bbiN3n/btsf2pjsWPX/oCkcG8eLezYyt6FqcCTbkk/img.png|CDM|1.3|{"originWidth":259,"originHeight":32,"style":"alignCenter","caption":"fetch failed 에러.."}_##]

구글링을 해본 결과 fetch의 url을 localhost 대신 127.0.0.1와 같은 ip 주소를 직접 적어주면 된다고 한다.

(node 17,18 버전 때문이라는데 잘은 모르겠다..)

[https://github.com/vercel/next.js/issues/44062](https://github.com/vercel/next.js/issues/44062)

 [TypeError: fetch failed in server componant since next 13.0.6 · Issue #44062 · vercel/next.js

Verify canary release I verified that the issue exists in the latest Next.js canary release Provide environment information Operating System: Platform: linux Arch: x64 Version: #62-Ubuntu SMP Tue N...

github.com](https://github.com/vercel/next.js/issues/44062)

나는 현재 docker를 사용중이기 때문에 local ip 주소인 127.0.0.1을 사용할 순 없었고 terminal 창에 아래와 같이 backend 컨테이너의 ip 주소를 확인한 다음 .env 파일에 넣어 사용했다.

```
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 백엔드 컨테이너 이름
```

```
const result = await fetch(`http://${process.env.NETWORK_BACK_NODE_ADRESS}:4000/about/notice/${id}`);
```

이렇게 하고 실행해본 결과 backend에 요청이 잘 간다. 

하지만 container를 삭제하고 다시 만들거나 했을때는 백엔드 컨테이너의 ip주소를 다시 찾아서 .env파일을 수정해줘야 해서 너무 번거롭다. 다른 방법이 있으면 추후 수정해야겠다.

ps. 해당에러를 해결하는데만 밤을 샌 것 같은데 nextjs 13 버전으로 마이그레이션 하면서 별별 에러를 다 보는 거 같다....

출처:

[https://github.com/vercel/next.js/issues/44062](https://github.com/vercel/next.js/issues/44062)

 [TypeError: fetch failed in server componant since next 13.0.6 · Issue #44062 · vercel/next.js

Verify canary release I verified that the issue exists in the latest Next.js canary release Provide environment information Operating System: Platform: linux Arch: x64 Version: #62-Ubuntu SMP Tue N...

github.com](https://github.com/vercel/next.js/issues/44062)

[https://stackoverflow.com/questions/74854996/next-js-fetch-get-an-econnrefused-error-in-docker-strapi-as-backend](https://stackoverflow.com/questions/74854996/next-js-fetch-get-an-econnrefused-error-in-docker-strapi-as-backend)

 [Next.js fetch get an ECONNREFUSED error in Docker (Strapi as backend)

Good day everyone. I set up a simple next.js page to get data from Strapi via API. It runs fine locally. But when I run them in Docker, I got a ECONNREFUSED error. here is the error: error - TypeEr...

stackoverflow.com](https://stackoverflow.com/questions/74854996/next-js-fetch-get-an-econnrefused-error-in-docker-strapi-as-backend)