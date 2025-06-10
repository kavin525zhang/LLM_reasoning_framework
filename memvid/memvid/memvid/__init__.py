"""
Memvid - QR Code Video-Based AI Memory Library
"""

__version__ = "0.1.0"

from .encoder import MemvidEncoder
from .retriever import MemvidRetriever
from .chat import MemvidChat
from .interactive import chat_with_memory, quick_chat
from .llm_client import LLMClient, create_llm_client

__all__ = ["MemvidEncoder", "MemvidRetriever", "MemvidChat", "chat_with_memory", "quick_chat", "LLMClient", "create_llm_client"]
