from enum import Enum
from typing import Dict, Tuple, List
import re

from intent_detect.extraction import (
    AdvancedPreprocessor, 
    IntentLevel,
    InformationSubtype,
    OperationSubtype,
    MetaSubtype,
    IntentResult
)

class IntentClassifier:
    """多层意图分类器"""
    
    def __init__(self):
        self.preprocessor = AdvancedPreprocessor()
        
        # 特征权重配置
        self.feature_weights = {
            'keyword': 2.0,
            'pattern': 3.0,
            'syntax': 1.5,
            'context': 1.2,
            'length': 0.5
        }
        
        # 构建分类规则树
        self.rules = self._build_rule_tree()
        
    def _build_rule_tree(self) -> Dict:
        """构建分类规则树"""
        return {
            IntentLevel.INFORMATION_QUERY: {
                InformationSubtype.FACTUAL_QUERY: {
                    'patterns': [
                        r'^[^?]*[是|为|在|有]\??$',
                        r'.*(是什么|是谁|位于|成立于).*',
                        r'.*(日期|时间|地点|人物).*'
                    ],
                    'keywords': ['是', '有', '在', '为', '属于', '位于'],
                    'pos_patterns': [['n', 'v', 'n'], ['r', 'v']]
                },
                InformationSubtype.REASON_METHOD: {
                    'patterns': [
                        r'为什么.*',
                        r'.*原因.*',
                        r'如何.*',
                        r'怎么.*',
                        r'怎样.*'
                    ],
                    'keywords': ['为什么', '为何', '原因', '如何', '怎么', '怎样'],
                    'pos_patterns': [['r', 'v'], ['r', 'n', 'v']]
                },
                InformationSubtype.COMPARATIVE_ANALYSIS: {
                    'patterns': [
                        r'.*(对比|比较|区别|差异).*',
                        r'.*vs.*',
                        r'.*(优劣|优缺点|好坏).*',
                        r'.*(哪个更|哪种更).*'
                    ],
                    'keywords': ['对比', '比较', '区别', '差异', 'vs', '优劣', '哪个更'],
                    'pos_patterns': [['n', 'c', 'n'], ['v', 'n']]
                }
            },
            IntentLevel.OPERATION_INSTRUCTION: {
                OperationSubtype.FORMAT_OUTPUT: {
                    'patterns': [
                        r'.*(表格|列表|JSON|XML|格式化).*',
                        r'用.*格式.*',
                        r'.*(排版|整理|排列).*'
                    ],
                    'keywords': ['表格', '列表', '格式', 'JSON', 'XML', '排版'],
                    'pos_patterns': [['v', 'n'], ['p', 'n', 'v']]
                },
                OperationSubtype.CONTENT_SUMMARY: {
                    'patterns': [
                        r'.*(总结|概括|摘要|概述).*',
                        r'简要.*',
                        r'用.*话.*说',
                        r'.*(核心|要点|主旨).*'
                    ],
                    'keywords': ['总结', '概括', '摘要', '概述', '精简', '要点'],
                    'pos_patterns': [['v', 'n'], ['a', 'v']]
                },
                OperationSubtype.CALCULATION_ANALYSIS: {
                    'patterns': [
                        r'.*计算.*',
                        r'.*统计.*',
                        r'.*分析.*数据',
                        r'.*(平均值|总和|百分比).*',
                        r'.*(公式|算法|模型).*'
                    ],
                    'keywords': ['计算', '统计', '分析', '算法', '公式', '模型'],
                    'pos_patterns': [['v', 'n'], ['n', 'v']]
                }
            },
            IntentLevel.META_INSTRUCTION: {
                MetaSubtype.CLARIFICATION: {
                    'patterns': [
                        r'.*什么意思.*',
                        r'能.*解释.*',
                        r'请.*澄清.*',
                        r'.*(没懂|不明白|不清楚).*',
                        r'.*(是指|指的是).*'
                    ],
                    'keywords': ['解释', '澄清', '意思', '指什么', '不明白'],
                    'pos_patterns': [['v', 'n'], ['r', 'v']]
                },
                MetaSubtype.CAPABILITY: {
                    'patterns': [
                        r'.*能.*什么.*',
                        r'.*功能.*',
                        r'.*支持.*',
                        r'.*可以做.*'
                    ],
                    'keywords': ['能做什么', '功能', '支持', '能力', '可以'],
                    'pos_patterns': [['v', 'r'], ['n', 'v']]
                }
            }
        }
    
    def classify(self, text: str, context: Dict = None) -> IntentResult:
        """主分类函数"""
        # 预处理
        processed = self.preprocessor.preprocess(text)
        print("processed:{}".format(processed))
        
        # 三级分类
        primary, secondary, confidence = self._three_level_classify(processed, context)
        
        # 提取实体和参数
        entities = self._extract_entities(processed, secondary)
        parameters = self._extract_parameters(processed, secondary)
        
        # 检查是否需要澄清
        needs_clarification, clarification_questions = self._check_clarification_needed(
            processed, secondary, parameters
        )
        
        return IntentResult(
            primary_intent=primary,
            secondary_intent=secondary,
            confidence=confidence,
            text=text,
            entities=entities,
            parameters=parameters,
            context_sensitive=context is not None,
            needs_clarification=needs_clarification,
            clarification_questions=clarification_questions
        )
    
    def _three_level_classify(self, processed: Dict, context: Dict = None) -> Tuple[IntentLevel, Enum, float]:
        """三级分类算法"""
        scores = {}
        
        # 第一级：主意图分类
        for primary in IntentLevel:
            scores[primary] = self._score_primary_intent(primary, processed)
        
        # 应用上下文修正
        if context and 'previous_intent' in context:
            scores = self._apply_context_boost(scores, context['previous_intent'])
        
        # 确定主意图
        primary_intent = max(scores, key=scores.get)
        primary_score = scores[primary_intent]
        
        # 第二级：子意图分类
        subtype_scores = {}
        for subtype, rules in self.rules.get(primary_intent, {}).items():
            subtype_scores[subtype] = self._score_subtype_intent(rules, processed)
        
        # 确定子意图
        secondary_intent = max(subtype_scores, key=subtype_scores.get)
        secondary_score = subtype_scores[secondary_intent]
        
        # 计算总体置信度
        confidence = (primary_score * 0.6 + secondary_score * 0.4) / 100
        
        return primary_intent, secondary_intent, min(confidence, 1.0)
    
    def _score_primary_intent(self, intent: IntentLevel, processed: Dict) -> float:
        """计算主意图得分"""
        score = 0
        # 关键词匹配
        if intent == IntentLevel.INFORMATION_QUERY:
            if processed['question_type'] != 'general':
                score += 20
            if processed['syntax_features']['is_question']:
                score += 15
            if any(w in self.preprocessor.question_words for w in processed['words']):
                score += 10
                
        elif intent == IntentLevel.OPERATION_INSTRUCTION:
            if processed['syntax_features']['sentence_pattern'] == 'imperative':
                score += 15
            if any(tag.startswith('v') for tag in processed['pos_tags']):
                score += 10
            if any(w in self.preprocessor.operation_verbs for w in processed['words']):
                score += 15
                
        elif intent == IntentLevel.META_INSTRUCTION:
            if any(w in self.preprocessor.meta_keywords for w in processed['words']):
                score += 20
            if processed['text'].startswith(('关于', '如何', '能不能')):
                score += 10
        
        # 长度特征
        if len(processed['text']) < 10 and intent == IntentLevel.META_INSTRUCTION:
            score += 5
        
        return score
    
    def _score_subtype_intent(self, rules: Dict, processed: Dict) -> float:
        """计算子意图得分"""
        score = 0
        
        # 模式匹配
        text = processed['cleaned']
        for pattern in rules.get('patterns', []):
            if re.search(pattern, text):
                score += 20
        
        # 关键词匹配
        keywords = rules.get('keywords', [])
        matched_keywords = sum(1 for kw in keywords if kw in text)
        score += matched_keywords * 10
        
        # 词性模式匹配
        pos_tags = processed['pos_tags']
        for pos_pattern in rules.get('pos_patterns', []):
            if len(pos_tags) >= len(pos_pattern):
                for i in range(len(pos_tags) - len(pos_pattern) + 1):
                    if pos_tags[i:i+len(pos_pattern)] == pos_pattern:
                        score += 15
                        break
        
        return score
    
    def _apply_context_boost(self, scores: Dict, previous_intent: IntentResult) -> Dict:
        """应用上下文增强"""
        if previous_intent:
            # 增强相同或相关意图
            if previous_intent.primary_intent in scores:
                scores[previous_intent.primary_intent] *= 1.3
            
            # 如果上一轮需要澄清，增强澄清意图
            if previous_intent.needs_clarification:
                scores[IntentLevel.META_INSTRUCTION] *= 1.5
        
        return scores
    
    def _extract_entities(self, processed: Dict, subtype: Enum) -> List[str]:
        """提取实体"""
        entities = []
        
        if subtype in [InformationSubtype.FACTUAL_QUERY, InformationSubtype.COMPARATIVE_ANALYSIS]:
            # 提取名词短语作为实体
            words_with_pos = processed['words_with_pos']
            current_entity = []
            
            for word, pos in words_with_pos:
                if pos.startswith('n'):  # 名词
                    current_entity.append(word)
                elif current_entity:
                    entities.append(''.join(current_entity))
                    current_entity = []
            
            if current_entity:
                entities.append(''.join(current_entity))
        
        elif subtype in [OperationSubtype.CALCULATION_ANALYSIS, OperationSubtype.DATA_PROCESSING]:
            # 提取数字和公式
            text = processed['cleaned']
            numbers = re.findall(r'\d+(?:\.\d+)?', text)
            entities.extend(numbers)
        
        return list(set(entities))
    
    def _extract_parameters(self, processed: Dict, subtype: Enum) -> Dict:
        """提取参数"""
        params = {}
        
        if subtype == OperationSubtype.FORMAT_OUTPUT:
            text = processed['cleaned']
            if '表格' in text:
                params['format'] = 'table'
            elif 'JSON' in text.upper():
                params['format'] = 'json'
            elif 'XML' in text.upper():
                params['format'] = 'xml'
            elif '列表' in text:
                params['format'] = 'list'
        
        elif subtype == OperationSubtype.CONTENT_SUMMARY:
            params['length'] = 'medium'
            if '简要' in processed['cleaned'] or '简短' in processed['cleaned']:
                params['length'] = 'short'
            elif '详细' in processed['cleaned']:
                params['length'] = 'long'
        
        elif subtype == OperationSubtype.CALCULATION_ANALYSIS:
            # 提取计算类型
            text = processed['cleaned']
            if '平均值' in text:
                params['calculation_type'] = 'average'
            elif '总和' in text:
                params['calculation_type'] = 'sum'
            elif '百分比' in text:
                params['calculation_type'] = 'percentage'
        
        return params
    
    def _check_clarification_needed(self, processed: Dict, subtype: Enum, params: Dict) -> Tuple[bool, List[str]]:
        """检查是否需要澄清"""
        needs_clarification = False
        questions = []
        
        # 检查模糊查询
        if subtype in [InformationSubtype.FACTUAL_QUERY, InformationSubtype.COMPARATIVE_ANALYSIS]:
            entities = self._extract_entities(processed, subtype)
            if len(entities) == 0:
                needs_clarification = True
                questions.append("您想查询什么具体内容？")
            elif len(entities) > 3:
                needs_clarification = True
                questions.append(f"您主要想了解 {entities[0]} 的哪个方面？")
        
        # 检查操作参数
        elif subtype == OperationSubtype.FORMAT_OUTPUT and 'format' not in params:
            needs_clarification = True
            questions.append("您希望使用什么格式输出？表格、列表还是JSON？")
        
        elif subtype == OperationSubtype.CALCULATION_ANALYSIS and 'calculation_type' not in params:
            needs_clarification = True
            questions.append("您希望进行什么计算？平均值、总和还是其他统计？")
        
        # 检查元指令
        elif subtype == MetaSubtype.CLARIFICATION:
            needs_clarification = True
            questions.append("请告诉我您具体对哪个部分有疑问？")
        
        return needs_clarification, questions