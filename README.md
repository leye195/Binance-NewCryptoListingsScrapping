# Binance-NewCryptoListingsScrapping

### 바이낸스 공지사항 스크랩핑

신규 디지털 자산 상장 Scrapping With NodeJS, Puppeteer (키워드: Will Listing 포함 부분 추출)

### Puppeteer

- Puppeteer는 Headless Chrome 혹은 Chromium을 제어하는 라이브러리로 웹페이지 크롤링, 웹페이지 자동화 테스트 도구

### node-schedule

- node-schedule를 활용 스케줄러 설정

```
*　　　　　　*　　　　　　*　　　　　　*　　　　　　*
분(0-59)　 시간(0-23)　　일(1-31)　　월(1-12)　　요일s(0-7)

job = schedule.scheduleJob("*/10 * * * * *", async ()=>{})
```
