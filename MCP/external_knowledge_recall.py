# calculator_stdio.py
import requests
from fastmcp import FastMCP
 
# 创建MCP服务器实例
mcp = FastMCP("external_knowledge_recall", stateless_http=True)
 
@mcp.tool("DKM全文检索接口")
def recall_from_ES(query: str) -> list:
    """
    通过关键词匹配，从ElasticSearch等文本数据库中召回跟问题相关片断
    参数：
        query（str）: 用户问题，用于数据库搜索相关文本
    """
    try:
        url = "http://10.60.252.223:30179/WebCore"
        headers = {
            "Cookie": "xxx"
        }
        params = {
            "from": 0,
            "size": 10,
            "_source": {"excludes": ["filecontent"]},
            "sort": [{"_score": "desc"}],
            "query": {
                "query_string": {
                    "query": query
                }
            }
        }
        resp = requests.post(url=url, json=params, headers=headers).json()["docListInfo"]["FilesInfo"]
    except:
        resp = ["测试{}全文检索".format(query)]
    return resp
 
@mcp.tool("DKM向量搜索接口")
def recall_from_hippo(query: str) -> list:
    """
    通过将query编码成向量，从Milvus等向量数据库中召回跟问题相关片断
    参数：
        query（str）: 用户问题，用于数据库搜索相关文本
    """
    try:
        url = "http://10.60.252.223:30179/aiagent/api/chat/ragsearch"
        headers = {
            "Cookie": "xxx"
        }
        params = {
            "query": query,
            "topK": 10,
            "similarity": 0.9,
            "searchType": "mix",
            "searchDataSource": "ECM",
            "searchWhere": "libraryPath:(9400)"
        }
        resp = requests.post(url=url, json=params, headers=headers).json()["Data"]["Data"]
    except:
        resp = ["测试{}向量搜索".format(query)]
    return resp
 
@mcp.tool("根据文档Id获取文档分片内容")
def recall_by_docId(docId: str) -> int:
    """根据文档Id获取文档分片内容"""
    try:
        url = "http://10.60.252.223:30179/aiagent/api/aidatasource/getdocumentblocklistaspermlist"
        headers = {
            "Cookie": "xxx"
        }
        params = {
            "docId": docId,
            "pageIndex": 1,
            "pageSize": 10
        }
        resp = requests.post(url=url, json=params, headers=headers).json()["Data"]["RawList"]
    except:
        resp = ["测试文档ID{}获取分片内容".format(docId)]
    return resp
 
 
if __name__ == "__main__":
    # 使用stdio传输方式启动服务器
    mcp.run(transport="streamable-http", host="0.0.0.0", port=8000)