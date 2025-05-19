## Model Server Daemon

使用 systemd service 管理模型推理服务。  
将 `inferserver.service` 文件放到 systemd service 目录下。  
使用 `systemctl [start|stop|restart|kill] inferserver` 执行 [启动|停止|重启|强制停止] 服务。

## Service Continuous Delivery

CD 流程：
 - GitLab 指定分支代码更新
 - GitLab 通过 WebHook 通知 CD Server
 - CD Server 触发代码更新及服务重启

CD 部署：
 - 将 `inferserver_cd.service` 文件放到 systemd service 目录下
 - 使用 systemd 启动 inferserver_cd 服务
 - 在 GitLab Integrations 里注册 WebHook

WebHook：  
`http://172.18.192.200:18003/push_hook`
