package model

import (
	"time"
)

// ユーザーデータの定義
var UserInitData = []User{
	{ID: 1, Name: "fuseya"},
	{ID: 2, Name: "kakumu"},
	{ID: 3, Name: "nishi"},
	{ID: 4, Name: "rui"},
	{ID: 5, Name: "suzaki"},
	{ID: 6, Name: "togawa"},
	{ID: 7, Name: "kazuo"},
	{ID: 8, Name: "ishiguro"},
	{ID: 9, Name: "ao"},
	{ID: 10, Name: "ueji"},
	{ID: 11, Name: "ayato"},
	{ID: 12, Name: "fuma"},
}

// time.Date(年, 月, 日, 時, 分, 秒, m秒, time.Local)
var first = time.Date(2023, time.December, 22, 15, 0, 0, 0, time.Local)
var second = time.Date(2023, time.December, 27, 15, 0, 0, 0, time.Local)
var dummyNow = time.Date(2024, time.July, 16, 13, 0, 0, 0, time.Local)

var FeatureDataInitData = []FeatureData{
	{ID: 1, UserID: 1, ActionID: 1, AveragePace: 0.7567, AccelerationStandardDeviation: 0.8597, Date: first},
	{ID: 2, UserID: 1, ActionID: 1, AveragePace: 0.9000, AccelerationStandardDeviation: 1.0142, Date: second},
	{ID: 3, UserID: 2, ActionID: 1, AveragePace: 0.8356, AccelerationStandardDeviation: 4.9175, Date: first},
	{ID: 4, UserID: 2, ActionID: 1, AveragePace: 1.0895, AccelerationStandardDeviation: 7.0567, Date: second},
	{ID: 5, UserID: 3, ActionID: 1, AveragePace: 0.5656, AccelerationStandardDeviation: 0.7082, Date: first},
	{ID: 6, UserID: 3, ActionID: 1, AveragePace: 0.9273, AccelerationStandardDeviation: 0.2387, Date: second},
	{ID: 7, UserID: 4, ActionID: 1, AveragePace: 0.6097, AccelerationStandardDeviation: 1.2692, Date: first},
	{ID: 8, UserID: 4, ActionID: 1, AveragePace: 0.7444, AccelerationStandardDeviation: 1.5606, Date: second},
	{ID: 9, UserID: 5, ActionID: 1, AveragePace: 1.4776, AccelerationStandardDeviation: 2.8749, Date: first},
	{ID: 10, UserID: 5, ActionID: 1, AveragePace: 1.2777, AccelerationStandardDeviation: 2.9507, Date: second},
	{ID: 11, UserID: 6, ActionID: 1, AveragePace: 0.4794, AccelerationStandardDeviation: 0.7631, Date: first},
	{ID: 12, UserID: 6, ActionID: 1, AveragePace: 0.5948, AccelerationStandardDeviation: 1.0404, Date: second},
	{ID: 13, UserID: 7, ActionID: 1, AveragePace: 0.8431, AccelerationStandardDeviation: 0.7080, Date: second},
	{ID: 14, UserID: 8, ActionID: 1, AveragePace: 0.8888, AccelerationStandardDeviation: 1.6120, Date: second},
	{ID: 15, UserID: 9, ActionID: 1, AveragePace: 0.8333, AccelerationStandardDeviation: 7.2507, Date: second},
	{ID: 16, UserID: 10, ActionID: 1, AveragePace: 1.3589, AccelerationStandardDeviation: 1.4508, Date: second},
	{ID: 17, UserID: 11, ActionID: 1, AveragePace: 1.0116, AccelerationStandardDeviation: 2.1764, Date: second},
	{ID: 18, UserID: 12, ActionID: 1, AveragePace: 1.1571, AccelerationStandardDeviation: 2.6615, Date: second},
}

var ActionInitData = []Action{
	{ID: 1, Type: "slice"},
}

var DisplayItemInitData = []DisplayItem{
	{ID: 1, Item: "average pace"},
	{ID: 2., Item: "cutting force fluctuation magnitude"},
}
