import re
import jieba
import jieba.posseg as pseg
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from enum import Enum

class IntentLevel(Enum):
    """意图等级枚举"""
    INFORMATION_QUERY = "information_query"
    OPERATION_INSTRUCTION = "operation_instruction"
    META_INSTRUCTION = "meta_instruction"

class InformationSubtype(Enum):
    """信息查询子类"""
    FACTUAL_QUERY = "factual_query"        # 事实查询
    REASON_METHOD = "reason_method"        # 原因/方式查询
    COMPARATIVE_ANALYSIS = "comparative"   # 对比分析
    DEFINITION = "definition"              # 定义查询
    TEMPORAL_SPATIAL = "temporal_spatial"  # 时空查询
    QUANTITATIVE = "quantitative"          # 数量查询

class OperationSubtype(Enum):
    """操作指令子类"""
    FORMAT_OUTPUT = "format_output"        # 格式化输出
    CONTENT_SUMMARY = "content_summary"    # 内容总结
    CALCULATION_ANALYSIS = "calculation"   # 计算分析
    DATA_PROCESSING = "data_processing"    # 数据处理
    VISUALIZATION = "visualization"        # 可视化
    EXTRACTION = "extraction"              # 内容提取

class MetaSubtype(Enum):
    """元指令子类"""
    CLARIFICATION = "clarification"        # 问题澄清
    FEEDBACK = "feedback"                  # 反馈相关
    PREFERENCE = "preference"              # 偏好设置
    CAPABILITY = "capability"              # 能力查询
    ERROR_HANDLING = "error_handling"      # 错误处理
    SESSION_MANAGE = "session_manage"      # 会话管理

@dataclass
class IntentResult:
    """意图识别结果"""
    primary_intent: IntentLevel
    secondary_intent: Enum  # 子类
    confidence: float
    text: str
    entities: List[str]
    parameters: Dict
    context_sensitive: bool = False
    needs_clarification: bool = False
    clarification_questions: List[str] = None
    
    def __post_init__(self):
        if self.clarification_questions is None:
            self.clarification_questions = []

class AdvancedPreprocessor:
    """高级文本预处理器"""
    
    def __init__(self):
        jieba.initialize()
        # 加载自定义词典
        self._load_custom_dict()
        
        # 特殊词性标注
        self.question_words = {
            '什么', '谁', '哪里', '何时', '多少', '为什么', '如何', '怎么样',
            '是不是', '能否', '可否', '多久', '多远', '多大'
        }
        
        self.operation_verbs = {
            '计算', '统计', '汇总', '总结', '分析', '格式化', '转换', '提取',
            '生成', '创建', '绘制', '排序', '过滤', '聚合'
        }
        
        self.meta_keywords = {
            '帮助', '解释', '说明', '澄清', '确认', '反馈', '评价', '设置',
            '偏好', '能力', '功能', '错误', '问题', '重启', '退出'
        }
    
    def _load_custom_dict(self):
        """加载自定义词典"""
        custom_words = [
            '是什么 1000 n', '为什么 1000 r', '怎么样 1000 r',
            '对比 800 v', '区别 800 n', '优缺点 800 n',
            '计算 900 v', '分析 900 v', '总结 900 v'
        ]
        for word in custom_words:
            jieba.add_word(word)
    
    def preprocess(self, text: str) -> Dict:
        """完整预处理流程"""
        # 基础清洗
        cleaned = self._clean_text(text)
        
        # 分词和词性标注
        words_with_pos = self._segment_with_pos(cleaned)
        
        # 提取语法特征
        syntax_features = self._extract_syntax_features(cleaned, words_with_pos)
        
        # 构建词性序列
        pos_sequence = [pos for _, pos in words_with_pos]
        
        # 识别问句类型
        question_type = self._identify_question_type(cleaned)
        
        return {
            'text': text,
            'cleaned': cleaned,
            'words': [word for word, _ in words_with_pos],
            'pos_tags': pos_sequence,
            'words_with_pos': words_with_pos,
            'syntax_features': syntax_features,
            'question_type': question_type,
            'length': len(text),
            'has_question': '?' in text or any(w in text for w in ['吗', '么', '呢', '？'])
        }
    
    def _clean_text(self, text: str) -> str:
        """清洗文本"""
        # 去除多余空格
        text = re.sub(r'\s+', ' ', text.strip())
        # 标准化标点
        text = text.replace('？', '?').replace('，', ',').replace('；', ';')
        # 保留必要字符
        text = re.sub(r'[^\w\u4e00-\u9fa5\s\?\.\,\!\;]', '', text)
        return text.lower() if re.search(r'[a-zA-Z]', text) else text
    
    def _segment_with_pos(self, text: str) -> List[Tuple[str, str]]:
        """带词性标注的分词"""
        return [(word, flag) for word, flag in pseg.cut(text)]
    
    def _extract_syntax_features(self, text: str, words_with_pos: List[Tuple[str, str]]) -> Dict:
        """提取句法特征"""
        words = [w for w, _ in words_with_pos]
        pos_tags = [p for _, p in words_with_pos]
        
        features = {
            'is_question': any(tag in ['q', 'r'] for tag in pos_tags) or '?' in text,
            'has_modal_verb': any(tag == 'v' and word in ['能', '可以', '应该'] for word, tag in words_with_pos),
            'has_comparative': any(word in words for word in ['vs', '对比', '比较', '区别', '优劣']),
            'has_quantifier': any(tag in ['m', 'q'] for tag in pos_tags),
            'verb_count': sum(1 for tag in pos_tags if tag.startswith('v')),
            'noun_count': sum(1 for tag in pos_tags if tag.startswith('n')),
            'sentence_pattern': self._identify_sentence_pattern(text, words, pos_tags)
        }
        return features
    
    def _identify_question_type(self, text: str) -> str:
        """识别问句类型"""
        patterns = [
            (r'(什么|什么是|啥叫).*', 'definition'),
            (r'为什么.*', 'reason'),
            (r'如何|怎么|怎样.*', 'method'),
            (r'.*(对比|比较|区别|vs).*', 'comparative'),
            (r'.*(多少|几个|多大|多久).*', 'quantitative'),
            (r'.*(哪里|哪儿|何处).*', 'location'),
            (r'.*(何时|什么时候).*', 'temporal'),
            (r'.*(是不是|是否|对吗|对不对).*', 'verification')
        ]
        
        for pattern, q_type in patterns:
            if re.match(pattern, text):
                return q_type
        return 'general'
    
    def _identify_sentence_pattern(self, text: str, words: List[str], pos_tags: List[str]) -> str:
        """识别句式模式"""
        # 命令式
        if text.startswith(('请', '帮我', '麻烦', '需要')) or (pos_tags and pos_tags[0] == 'v'):
            return 'imperative'
        # 疑问式
        if any(w in self.question_words for w in words) or '?' in text:
            return 'interrogative'
        # 陈述式
        return 'declarative'