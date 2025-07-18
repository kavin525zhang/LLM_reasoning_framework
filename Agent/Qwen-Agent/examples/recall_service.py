from fastmcp import FastMCP
 
# 创建MCP服务器实例
mcp = FastMCP("DataSource")
 
@mcp.tool()
def search_financial_report(query: str) -> str:
    """当需要了解公司财务状况、评估投资风险、分析行业趋势、获取公司发展前景、进行投资决策、提高透明度和增强公司治理等‌‌时使用"""
    return "financial_report:{}".format(query)
 
@mcp.tool()
def search_news(query: str) -> str:
    """当需要了解宏观经济状况、货币政策、金融市场、行业动态和公司财务等方面时使用"""
    # return "news:{}".format(query)
    return "李强总理 2025年7月3日，在湖南浏阳召开中考填报志愿的相关工作"
 
@mcp.tool()
def search_web(query: str) -> str:
    """当询问非财经类，各种知识性问题时使用"""
    return "web:{}".format(query)

@mcp.tool()
def execute_ambiguous_query(query: str) -> dict:
    """当问题比较模糊时，采取混合搜索"""
    results = {}
    results['news'] = search_news(query) 
    results['web'] = search_web(query) 
    return results
 
if __name__ == "__main__":
    # 使用stdio传输方式启动服务器
    mcp.run(transport="stdio")