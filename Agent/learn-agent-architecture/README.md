##  Context management
context management 会在下一次 model call 前整理旧内容，视情况删除、换成 stub、保存到外部，或浓缩成摘要，让 session 能继续使用。
当 context 被填满时：
* API 可能直接拒绝请求。
* 每次调用都会变慢、变贵。
* 过时或低价值的内容会干扰当前任务需要的信息。(Context rot 上下文腐烂)

budget   -> 把巨大的 tool 结果存到磁盘，留下一段预览
snip     -> 丢掉中段的旧轮次，保留开头和最近的结尾
micro    -> 把旧的 tool 结果本体换成一个 stub
collapse -> 可选的独立 context 系统
auto     -> 用 LLM 把整段历史摘要成一则消息
--- 以上都做了还是 prompt_too_long 时 ---
reactive -> 截掉开头并重新摘要，有重试上限

## Memory
记忆必须做到：

* 判断哪些内容值得长期保存。
* 把这些内容写到对话之外的存储空间。
* 每次只找回与当前任务相关的项目。
* 定期整理过时或重复的信息。

一共有四种操作：

* Selection 决定要存储什么。只存储那些无法靠 grep、git 或项目文件再次推导出来的事实。
* Recall 在查询时执行。它对现有记忆排序，把选中的内文注入这一轮的 messages[]：包成 <system-reminder> 区块，接在 user 消息前面。
* Extraction 在执行结束时执行。它写入新的记忆文件。
* Consolidation 很少执行。它合并重复项并清除过时项目。

## Task
* 你现在是创建了一个有依赖关系的任务列表，那什么时候调用能？并且怎么调用呢？
* 什么时候需要制定计划
* 那下次执行时怎么知道哪些任务是属于一个列表里面的，难道根据任务划分到不同文件夹吗？

## BackGround-execution
background execution 必须：
* 判断哪些操作适合用非阻塞方式执行。
* 启动工作后立刻返回 handle。
* 追踪 running、completed、failed 和 killed 等状态。
* 工作完成后，再把通知送回 loop。

## Scheduling
* 定时任务的开发

## Worktree isolation
* 工作目录隔离

## Coordination
* 协同工作

## Protocols
* 协议

## Autonomy
* 自我组织， 而不是集中派工

## MCP/plugins/channels

## Observability & evaluation
* 过程记录和评估


