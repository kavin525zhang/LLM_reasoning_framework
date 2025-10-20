# MCP
## 四款MCP客户端  
* [Claude Desktop](https://docs.anthropic.com/en/home)   
* [Cherry Studio]()
* [Cursor]()
* [DeepChat]()
* [ChatWise]()

## stdio
### 测试
* VSCODE安装ROO CODE CHINESE
* 配置模型  
![模型配置](model_setting.png)
* 允许MCP  
![允许MCP](MCP_agree.png)
* 配置mcp_settings  
* 问答页面  
![问答页面](response.png)  

要将此服务器注册到Claude Desktop，可以使用FastMCP的CLI工具：```fastmcp install calculator_stdio.py```

## sse
### 测试
* 启动服务端，获取服务链接（例如http://127.0.0.1:8000/sse）
```python weather_sse.py```  
* 启动客户端
```./Cherry-Studio-1.2.10-x86_64.AppImage``` 
* 配置MCP  
    - 点击左下角的`设置`按钮，点击列表中的`MCP服务器`按钮  
    - 点击`添加服务器`按钮，主要配置名称、类型(sse)、URL(服务链接)  
    - 点击左上角`助手`，新建助手，对话框下面的按钮中找到`MCP 服务器`配置上面的服务器  
    - 同时还可以配置模型以及其他  
* 客户端脚本  
```python sse_client.py```

## function call 与 MCP  
当 LLM 发起了一个 function calling 后，这个 calling 最终会需要外部系统进行执行，而 MCP 正是提供了一个通用的协议框架调用外部系统执行这个 function calling。  
* MCP 标准化了 LLM 应用与外部系统的以下交互过程：  
    * 动态地提供对可用函数的标准化的描述（比如通过 tools/list API）；  
    * 标准化对外部系统的调用与结果的处理（MCP 规范了 MCP server 需要有哪些 API 能力，以及 API 的请求/相应数据结构）。 
* 如果没有 MCP 这样的协议规范，不同团队的 LLM 应用需要：  
    * 自行维护可用函数列表； 
    * 外部系统的接入需要进行针对适配，不具有通用性。 

## 注意事项 
* system_prompt对输出有影响，干掉就能正常输出，但可能也跟内容有关系（可以多测试几组）  
* 问题比较大的是模型输出后，需要从结果正则提取tool_call，这时由于格式的不一样会报错，需要改写处理逻辑

## 参考资料
* [Python FastMCP实现MCP实践全解析](https://blog.csdn.net/lingding_cn/article/details/147355620)
* [MCP-Chinese](https://github.com/liaokongVFX/MCP-Chinese-Getting-Started-Guide)
* [mcp_demo](https://github.com/aixiaoxin123/mcp_demo_project)
* [Awesome-MCP-ZH](https://github.com/yzfly/Awesome-MCP-Z?)
* [mindmap-mcp-server](https://github.com/YuChenSSR/mindmap-mcp-server)
* [elasticsearch-mcp](https://github.com/cr7258/hands-on-lab/tree/main/ai/claude/mcp/client/elasticsearch-mcp-client-example)
* [MCP传输机制Stdio与SSE](https://zhuanlan.zhihu.com/p/1891623741584294739)
* [MCP](https://modelcontextprotocol.io/examples)
* [MCP_examples](https://github.com/modelcontextprotocol/python-sdk)
* [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers?tab=readme-ov-file)