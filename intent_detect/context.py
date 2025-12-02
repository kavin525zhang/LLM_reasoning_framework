from typing import Dict
import time

from intent_detect.extraction import (
    IntentResult,
    IntentLevel
)

class ContextManager:
    """上下文管理器"""
    
    def __init__(self):
        self.conversation_history = []
        self.user_preferences = {}
        self.current_session = {
            'topic': None,
            'previous_intents': [],
            'clarification_in_progress': False,
            'clarification_target': None
        }
    
    def update_context(self, intent_result: IntentResult):
        """更新上下文"""
        self.conversation_history.append({
            'text': intent_result.text,
            'intent': intent_result,
            'subtype': intent_result.secondary_intent,
            'timestamp': time.time()
        })
        
        # 保持最近10轮对话
        if len(self.conversation_history) > 10:
            self.conversation_history.pop(0)
        
        # 更新会话主题
        if not self.current_session['clarification_in_progress']:
            if intent_result.primary_intent == IntentLevel.INFORMATION_QUERY:
                self.current_session['topic'] = intent_result.entities[0] if intent_result.entities else None
        
        # 处理澄清状态
        if intent_result.needs_clarification:
            self.current_session['clarification_in_progress'] = True
            self.current_session['clarification_target'] = intent_result
        elif self.current_session['clarification_in_progress']:
            # 检查澄清是否完成
            if self._is_clarification_response(intent_result):
                self.current_session['clarification_in_progress'] = False
                self.current_session['clarification_target'] = None
        
        # 更新意图历史
        self.current_session['previous_intents'].append(intent_result)
    
    def _is_clarification_response(self, current_intent: IntentResult) -> bool:
        """判断是否为澄清响应"""
        if not self.current_session['clarification_target']:
            return False
        
        target = self.current_session['clarification_target']
        
        # 检查是否回答了澄清问题
        if current_intent.primary_intent == target.primary_intent:
            return True
        
        # 检查是否提供了缺失的信息
        if target.needs_clarification:
            if target.primary_intent == IntentLevel.INFORMATION_QUERY:
                return len(current_intent.entities) > 0
            elif target.primary_intent == IntentLevel.OPERATION_INSTRUCTION:
                return len(current_intent.parameters) > 0
        
        return False
    
    def get_context_for_classification(self) -> Dict:
        """获取分类用上下文"""
        if not self.conversation_history:
            return {}
        
        last_interaction = self.conversation_history[-1]
        
        context = {
            'previous_intent': last_interaction['intent'],
            'topic': self.current_session['topic'],
            'clarification_in_progress': self.current_session['clarification_in_progress'],
            'conversation_depth': len(self.conversation_history)
        }
        
        return context