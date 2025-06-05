# calculator_stdio.py
from fastmcp import FastMCP
 
# 创建MCP服务器实例
mcp = FastMCP("Calculator")
 
@mcp.tool()
def add(a: int, b: int) -> int:
    """将两个数字相加"""
    return a + b
 
@mcp.tool()
def subtract(a: int, b: int) -> int:
    """从第一个数中减去第二个数"""
    return a - b
 
@mcp.tool()
def multiply(a: int, b: int) -> int:
    """将两个数相乘"""
    return a * b
 
@mcp.tool()
def divide(a: float, b: float) -> float:
    """将第一个数除以第二个数"""
    if b == 0:
        raise ValueError("除数不能为零")
    return a / b
 
if __name__ == "__main__":
    # 使用stdio传输方式启动服务器
    mcp.run(transport="stdio")