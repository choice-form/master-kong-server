# 康师傅日式 Q 面份量研究

## 流程

后台

1. 线下邀约第一份问卷，回收问卷结果
2. 解析吃方便面的时间。
3. 按吃方便面的时间，生成 3 份推送，推送问卷，间隔 1 小时

前台

1. 用户列表 - 推送次数、回复次数
2. 问卷回复列表

问卷

1. 设置回复完成 webhooks

- 第一份问卷 `/v1/push-log/first?answer={{answer}}&result={{result}}&resultId={{resultId}}&surveyId={{surveyId}}`

- 第二份问卷 `/v1/push-log/latest?answer={{answer}}&result={{result}}&resultId={{resultId}}&surveyId={{surveyId}}`
