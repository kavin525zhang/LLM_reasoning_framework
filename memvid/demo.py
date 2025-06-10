from memvid import MemvidEncoder, MemvidChat

# Create video memory from text chunks
chunks = ["Important fact 1", "Important fact 2", "Historical event details"]
encoder = MemvidEncoder()
encoder.add_chunks(chunks)
encoder.build_video("./memvid/memory.mp4", "./memvid/memory_index.json")

# Chat with your memory
chat = MemvidChat("./memvid/memory.mp4", "./memvid/memory_index.json")
chat.start_session()
response = chat.chat("What do you know about historical events?")
print(response)