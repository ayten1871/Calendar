# LionTravel Calendar

## [![Watch the video](https://i.imgur.com/ePdmklK.jpg)](https://youtu.be/zh0OH0cEMmk)

## Features

-   Enable to move to previous or next month via button click or label click.
-   Accept different key names in json file.
-   Toggle to switch calender view or row version.
-   Display "查看更多" when there are mutiple tour group departure on thes same day.
-   But show all tour group in orders when view in row version.
-   Highlight selected day with yellow background and green border.
-   Show "成行" in orange background color and white font color if the tour group is guaranteed trip.
    -Transform number of price into currency format.

---

## Usage

```javascript
const ModuleDefaults = {
    dataSource: [...], //path of jason file to fetch
    initYearMonth: '201705',
    dataKeySetting: {
        // 保證出團 guaranteed trip
        certain: 'guaranteed',
        //日期
        date: 'date',
        // 價格
        price: 'price',
        //可賣團位
        onsell: 'availableVancancy',
        // 團位
        total: 'totalVacnacy',
        // 狀態
        state: 'status',
    },
    //點上一個月時 when click previous month
    onClickPrev: function (btn, data) {
        console.log(btn, data);
    },
    // 點下一個月時 when click next month
    onClickNext: function (btn, data) {
        console.log(btn, data);
    },
    // 點日期時 when click day which has tour goup
    onClickDate: function (date, data) {
        console.log(date, data);
    },
};
```

## JSON format

```
[  {
    "certain": false,
    "date": "2017/5/05",
    "price": 62083,
    "onsell": 46,
    "total": 337,
    "state": "預定"
},
...
]

```
