from elasticsearch import Elasticsearch
from fastmcp import FastMCP
 
# 创建MCP服务器实例
mcp = FastMCP("Elasticsearch")

es = Elasticsearch(["http://172.18.140.51:8902"], http_auth=("shiva", "shiva"))
 
@mcp.tool()
def list_indices():
    """List all Elasticsearch indices"""
    print("tttttttttttt")
    # 获取所有索引名
    response = es.indices.get('*')
    # 从响应中提取索引名
    indices = list(response.keys())
    print("indicesssssssssss:{}".format(indices))
    return indices[:1]
 
# @mcp.tool()
# def subtract(a: int, b: int) -> int:
#     """从第一个数中减去第二个数"""
#     return a - b
 
# @mcp.tool()
# def multiply(a: int, b: int) -> int:
#     """将两个数相乘"""
#     return a * b
 
# @mcp.tool()
# def divide(a: float, b: float) -> float:
#     """将第一个数除以第二个数"""
#     if b == 0:
#         raise ValueError("除数不能为零")
#     return a / b
 
if __name__ == "__main__":
    # 使用stdio传输方式启动服务器
    mcp.run(transport="stdio")
    # 获取所有索引名
    # response = es.indices.get('*')
    # # 从响应中提取索引名
    # indices = list(response.keys())
    # print("indicesssssssssss:{}".format(indices))