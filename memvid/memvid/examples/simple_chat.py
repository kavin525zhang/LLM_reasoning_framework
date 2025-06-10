#!/usr/bin/env python3
"""
Simplified interactive chat example
"""

import sys
import os

from memvid.config import VIDEO_FILE_TYPE

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from memvid import chat_with_memory, quick_chat

def main():
    print("Memvid Simple Chat Examples")
    print("=" * 50)
    
    video_file = F"output/memory.{VIDEO_FILE_TYPE}"
    index_file = "output/memory_index.json"
    
    # Check if memory exists
    if not os.path.exists(video_file):
        print("\nError: Run 'python examples/build_memory.py' first!")
        return
    
    # Check for API key
    api_key = "your-api-key-here"
    if not api_key:
        print("\nNote: Set OPENAI_API_KEY environment variable for full LLM responses.")
        print("Without it, you'll only see raw context chunks.\n")
        # You can also hardcode for testing (not recommended for production):
        # api_key = "your-api-key-here"
    
    print("\n1. Quick one-off query:")
    print("-" * 30)
    response = quick_chat(video_file, index_file, "How many qubits did the quantum computer achieve?", api_key=api_key)
    print(f"Response: {response}")
    
    print("\n\n2. Interactive chat session:")
    print("-" * 30)
    print("Starting interactive mode...\n")
    
    # This single line replaces all the interactive loop code!
    chat_with_memory(video_file, index_file, api_key=api_key)

if __name__ == "__main__":
    main()