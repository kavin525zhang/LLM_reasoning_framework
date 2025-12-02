import sys
import os
sys.path.append(os.getcwd())

from typing import Dict

from intent_detect.router import IntentRouter

class IntentRecognitionSystem:
    """完整的意图识别系统"""
    
    def __init__(self):
        self.router = IntentRouter()
        self.history = []
    
    def process_query(self, user_query: str) -> Dict:
        """处理用户查询"""
        # 处理输入
        result = self.router.process(user_query)
        
        # 记录历史
        self.history.append({
            'query': user_query,
            'result': result,
            'timestamp': time.time()
        })
        
        # 生成响应
        response = self._generate_response(result)
        
        return response
    
    def _generate_response(self, intent_data: Dict) -> Dict:
        """根据意图数据生成响应"""
        response = {
            'status': 'success',
            'intent': intent_data.get('action', 'unknown'),
            'message': self._get_default_message(intent_data),
            'data': intent_data
        }
        
        if intent_data.get('clarification_needed'):
            response['status'] = 'clarification_required'
            response['suggestions'] = intent_data.get('suggestions', [])
        
        return response
    
    def _get_default_message(self, intent_data: Dict) -> str:
        """获取默认消息"""
        action = intent_data.get('action', '')
        
        messages = {
            'retrieve_facts': '正在为您查询相关信息...',
            'explain_process': '正在为您分析原因和过程...',
            'compare_entities': '正在为您进行对比分析...',
            'format_output': '正在为您格式化输出...',
            'summarize_content': '正在为您总结内容...',
            'perform_calculation': '正在为您进行计算分析...',
            'request_clarification': '为了更好地帮助您，请提供更多细节...'
        }
        
        return messages.get(action, '正在处理您的请求...')

# 测试系统
def test_system():
    system = IntentRecognitionSystem()
    
    # test_cases = [
    #     "北京是中国的首都吗？",                    # 事实查询
    #     "为什么天空是蓝色的？",                     # 原因查询
    #     "Python和Java有什么区别？",                # 对比分析
    #     "请用表格列出最近的销售数据",                # 格式化输出
    #     "总结一下这篇文章的主要内容",                # 内容总结
    #     "计算这些数据的平均值和标准差",              # 计算分析
    #     "你指的是什么？",                          # 问题澄清
    #     "你能做什么？",                           # 能力查询,
    #     "星环科技2024年营业收入是多少？",
    #     "新能源汽车未来五年的发展前景",
    #     "请将数据用表格形式输出"
    # ]
    test_cases = [
        "讲了什么",
        "请总结一下这篇文档",
        "请总结这个目录",
        "概述一下这篇文章",
        "写一份总结",
        "视频里有什么",
        "音频里说了什么",
        "图片里讲了什么"
    ]
    
    print("意图识别系统测试\n" + "="*50)
    
    for query in test_cases:
        print(f"\n输入: {query}")
        result = system.process_query(query)
        
        # 显示主要结果
        print(f"主意图: {result['data'].get('action', '未知')}")
        print(f"状态: {result['status']}")
        
        if result['status'] == 'clarification_required':
            print("需要澄清的问题:")
            for q in result['data'].get('clarification_questions', []):
                print(f"  - {q}")
        
        print("-" * 50)

if __name__ == "__main__":
    import time
    test_system()