const result = `
  {
    "code": 200,
    "message": "成功",
    "result": {
      "data": [
        {"time": "2019-01-24 12:51:00", "ftime": "2019-01-24 12:51:00", "context": "DELIVERED", "location": ""},
        {"time": "2019-01-24 12:51:00", "ftime": "2019-01-24 12:51:00", "context": "DELIVERED", "location": ""},
        {"time": "2019-01-24 09:04:00", "ftime": "2019-01-24 09:04:00", "context": "OUT FOR DELIVERY", "location": ""},
        {"time": "2019-01-24 08:54:00", "ftime": "2019-01-24 08:54:00", "context": "SORTING COMPLETE", "location": ""},
        {"time": "2019-01-23 15:08:00", "ftime": "2019-01-23 15:08:00", "context": "ARRIVAL AT POST OFFICE"},
        {"time": "2019-01-23 14:47:00", "ftime": "2019-01-23 14:47:00", "context": "SHIPMENT ACCEPTED BY USPS"},
        {"time": "2019-01-23 13:53:00", "ftime": "2019-01-23 13:53:00", "context": "ARRIVED USPS SORT FACILITY"},
        {"time": "2019-01-22 22:33:34", "ftime": "2019-01-22 22:33:34", "context": "SCANNED INTO SACK/CONTAINER"}
      ]
    }
  }
`
module.exports = (req, res) => {
  res.end(result)
}