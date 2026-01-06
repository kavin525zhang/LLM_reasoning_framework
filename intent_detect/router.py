from typing import Dict, List

from intent_detect.classification import IntentClassifier
from intent_detect.context import ContextManager
from intent_detect.extraction import (
    IntentLevel, 
    IntentResult, 
    OperationSubtype,
    MetaSubtype,
    InformationSubtype
)

class IntentRouter:
    """意图路由器"""
    
    def __init__(self):
        self.classifier = IntentClassifier()
        self.context_manager = ContextManager()
        
        # 注册处理函数
        self.handlers = {
            IntentLevel.INFORMATION_QUERY: self._handle_information_query,
            IntentLevel.OPERATION_INSTRUCTION: self._handle_operation_instruction,
            IntentLevel.META_INSTRUCTION: self._handle_meta_instruction
        }
    
    def process(self, user_input: str) -> Dict:
        """处理用户输入"""
        # 获取上下文
        context = self.context_manager.get_context_for_classification()
        print("context:{}".format(context))
        
        # 意图识别
        intent_result = self.classifier.classify(user_input, context)
        
        # 更新上下文
        self.context_manager.update_context(intent_result)
        
        # 路由处理
        handler = self.handlers.get(intent_result.primary_intent)
        if handler:
            response = handler(intent_result)
        else:
            response = self._handle_unknown_intent(intent_result)
        
        # 添加澄清问题（如果需要）
        if intent_result.needs_clarification:
            response['clarification_needed'] = True
            response['clarification_questions'] = intent_result.clarification_questions
            response['suggestions'] = self._generate_suggestions(intent_result)
        
        # 添加上下文信息
        response['context'] = {
            'topic': self.context_manager.current_session['topic'],
            'in_clarification': self.context_manager.current_session['clarification_in_progress']
        }
        
        return response
    
    def _handle_information_query(self, intent: IntentResult) -> Dict:
        """处理信息查询"""
        handlers = {
            InformationSubtype.FACTUAL_QUERY: self._handle_factual_query,
            InformationSubtype.REASON_METHOD: self._handle_reason_method,
            InformationSubtype.COMPARATIVE_ANALYSIS: self._handle_comparative_analysis
        }
        
        handler = handlers.get(intent.secondary_intent, self._handle_factual_query)
        return handler(intent)
    
    def _handle_factual_query(self, intent: IntentResult) -> Dict:
        """处理事实查询"""
        return {
            'action': 'retrieve_facts',
            'query_type': 'factual',
            'entities': intent.entities,
            'sources': ['knowledge_graph', 'database', 'api'],
            'response_format': 'structured',
            'time_sensitivity': 'standard'
        }
    
    def _handle_reason_method(self, intent: IntentResult) -> Dict:
        """处理原因/方式查询"""
        return {
            'action': 'explain_process',
            'query_type': 'explanatory',
            'entities': intent.entities,
            'depth': 'detailed' if '详细' in intent.text else 'standard',
            'include_examples': True,
            'response_format': 'step_by_step'
        }
    
    def _handle_comparative_analysis(self, intent: IntentResult) -> Dict:
        """处理对比分析"""
        return {
            'action': 'compare_entities',
            'query_type': 'comparative',
            'entities': intent.entities,
            'aspects': ['features', 'advantages', 'disadvantages', 'use_cases'],
            'comparison_method': 'tabular',
            'include_recommendation': True
        }
    
    def _handle_operation_instruction(self, intent: IntentResult) -> Dict:
        """处理操作指令"""
        handlers = {
            OperationSubtype.FORMAT_OUTPUT: self._handle_format_output,
            OperationSubtype.CONTENT_SUMMARY: self._handle_content_summary,
            OperationSubtype.CALCULATION_ANALYSIS: self._handle_calculation_analysis
        }
        
        handler = handlers.get(intent.secondary_intent, self._handle_content_summary)
        return handler(intent)
    
    def _handle_format_output(self, intent: IntentResult) -> Dict:
        """处理格式化输出"""
        format_type = intent.parameters.get('format', 'table')
        
        return {
            'action': 'format_output',
            'format_type': format_type,
            'options': {
                'sorting': 'default',
                'filtering': None,
                'grouping': None
            },
            'visual_enhancements': format_type == 'table'
        }
    
    def _handle_content_summary(self, intent: IntentResult) -> Dict:
        """处理内容总结"""
        length = intent.parameters.get('length', 'medium')
        
        return {
            'action': 'summarize_content',
            'summary_type': 'abstractive',
            'length': length,
            'include_key_points': True,
            'include_takeaways': length in ['medium', 'long'],
            'response_format': 'bulleted' if length == 'short' else 'paragraph'
        }
    
    def _handle_calculation_analysis(self, intent: IntentResult) -> Dict:
        """处理计算分析"""
        calc_type = intent.parameters.get('calculation_type', 'general')
        
        return {
            'action': 'perform_calculation',
            'calculation_type': calc_type,
            'precision': 2,
            'include_formula': True,
            'include_units': True,
            'validation_required': calc_type in ['percentage', 'ratio']
        }
    
    def _handle_meta_instruction(self, intent: IntentResult) -> Dict:
        """处理元指令"""
        handlers = {
            MetaSubtype.CLARIFICATION: self._handle_clarification,
            MetaSubtype.CAPABILITY: self._handle_capability_query,
            MetaSubtype.FEEDBACK: self._handle_feedback
        }
        
        handler = handlers.get(intent.secondary_intent, self._handle_general_meta)
        return handler(intent)
    
    def _handle_clarification(self, intent: IntentResult) -> Dict:
        """处理问题澄清"""
        return {
            'action': 'request_clarification',
            'clarification_type': 'general',
            'context_preservation': True,
            'suggestion_count': 3,
            'fallback_option': 'rephrase_question'
        }
    
    def _handle_capability_query(self, intent: IntentResult) -> Dict:
        """处理能力查询"""
        return {
            'action': 'describe_capabilities',
            'scope': 'relevant' if self.context_manager.current_session['topic'] else 'full',
            'include_examples': True,
            'categorized': True,
            'detail_level': 'overview'
        }
    
    def _generate_suggestions(self, intent: IntentResult) -> List[str]:
        """生成建议"""
        suggestions = []
        
        if intent.secondary_intent == InformationSubtype.FACTUAL_QUERY:
            suggestions = [
                "请提供更具体的关键词",
                "是否需要限定时间范围？",
                "是否需要限定地区？"
            ]
        elif intent.secondary_intent == OperationSubtype.FORMAT_OUTPUT:
            suggestions = [
                "表格格式适合数据对比",
                "JSON格式适合程序处理",
                "列表格式适合简单展示"
            ]
        
        return suggestions