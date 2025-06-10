# Memvid Usage Guide

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Architecture](#architecture)
5. [File Outputs Explained](#file-outputs-explained)
6. [Core Components](#core-components)
7. [API Reference](#api-reference)
8. [Advanced Usage](#advanced-usage)
9. [Performance Optimization](#performance-optimization)
10. [Troubleshooting](#troubleshooting)

## Overview

Memvid is a Python library that enables efficient storage and retrieval of text data using QR code videos. It combines:
- **Text chunking** and semantic embeddings
- **QR code generation** for data encoding
- **Video creation** for compact storage
- **Vector search** for fast retrieval
- **Conversational AI** interface with context-aware memory

### Key Benefits
- Store millions of text chunks in a single video file
- Fast semantic search (< 2 seconds for 1M chunks)
- No database required - just MP4 + index files
- Portable and shareable knowledge bases
- Works with any LLM (OpenAI, Claude, local models)

## Installation

### Prerequisites
- Python 3.8 or higher
- FFmpeg (for video encoding)
- libzbar0 (for QR decoding)

### System Dependencies

**macOS:**
```bash
brew install ffmpeg zbar
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install ffmpeg libzbar0
```

**Windows:**
- Install FFmpeg from https://ffmpeg.org/download.html
- Install zbar from https://sourceforge.net/projects/zbar/

### Python Installation

**Option 1: From source (recommended for development)**
```bash
# Clone the repository
git clone https://github.com/your-repo/memvid.git
cd memvid

# Create virtual environment
python -m venv .memvid
source .memvid/bin/activate  # On Windows: .memvid\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install in development mode
pip install -e .
```

**Option 2: Direct installation**
```bash
pip install memvid
```

### Verify Installation
```python
import memvid
print(memvid.__version__)
```

## Quick Start

### 1. Creating a Memory Video

```python
from memvid import MemvidEncoder

# Create encoder
encoder = MemvidEncoder()

# Add individual chunks
chunks = [
    "Quantum computers use qubits instead of classical bits",
    "Machine learning models can process billions of parameters",
    "Cloud computing enables scalable infrastructure"
]
encoder.add_chunks(chunks)

# Or add text with automatic chunking
long_text = """Your long document text here..."""
encoder.add_text(long_text, chunk_size=200, overlap=50)

# Build video and index
encoder.build_video("output/knowledge.mp4", "output/knowledge_index.json")
```

### 2. Searching the Memory

```python
from memvid import MemvidRetriever

# Load retriever
retriever = MemvidRetriever("output/knowledge.mp4", "output/knowledge_index.json")

# Search for relevant chunks
results = retriever.search("quantum computing", top_k=5)
for chunk in results:
    print(chunk)
```

### 3. Interactive Chat

```python
from memvid import MemvidChat

# Initialize chat (set OPENAI_API_KEY environment variable)
chat = MemvidChat("output/knowledge.mp4", "output/knowledge_index.json")
chat.start_session()

# Have a conversation
response = chat.chat("What do you know about quantum computers?")
print(response)
```

## Architecture

### Data Flow Pipeline

```
1. Text Input → Chunking → Embeddings → QR Codes → Video Frames → MP4 File
                    ↓
                Vector Index → FAISS Index → JSON Metadata

2. Query → Embedding → Vector Search → Frame Numbers → QR Decode → Text
                             ↓
                     Retrieved Context → LLM → Response
```

### System Components

```
memvid/
├── encoder.py      # Text → QR Video conversion
├── retriever.py    # Video → Text retrieval
├── chat.py         # Conversational interface
├── index.py        # Vector indexing & search
├── utils.py        # QR & video utilities
└── config.py       # Configuration management
```

## File Outputs Explained

When you build a memory video, two files are created:

### 1. MP4 Video File (`memory.mp4`)

**What it is:** A video file where each frame is a QR code containing encoded text data.

**Structure:**
- Each frame = 1 QR code
- Each QR code = 1 text chunk + metadata
- Frame rate = 30 FPS (configurable)
- Resolution = 512x512 pixels (configurable)

**Contents of each QR code:**
```json
{
    "id": 0,
    "text": "The actual text chunk content...",
    "metadata": {
        "source": "optional source info",
        "timestamp": "2024-01-01T00:00:00"
    }
}
```

**Why video?**
- Efficient compression (H.264/H.265)
- Portable and shareable
- Streamable over networks
- Supported everywhere

### 2. Index Files (`memory_index.json` + `memory_index.faiss`)

**What they are:** Search index files for fast retrieval.

**memory_index.json structure:**
```json
{
    "metadata": [
        {
            "chunk_id": 0,
            "text": "Text preview (first 200 chars)...",
            "frame": 0,
            "char_count": 250,
            "word_count": 45
        }
    ],
    "chunk_to_frame": {
        "0": 0,
        "1": 1
    },
    "frame_to_chunks": {
        "0": [0],
        "1": [1]
    },
    "config": {
        "embedding": {
            "model": "all-MiniLM-L6-v2",
            "dimension": 384
        },
        "index": {
            "type": "Flat"
        }
    }
}
```

**memory_index.faiss:** Binary vector index for similarity search.

### File Size Comparison

For 10,000 text chunks (average 200 chars each):
- Raw text: ~2 MB
- MP4 video: ~15-20 MB (with compression)
- FAISS index: ~15 MB (384-dim vectors)
- JSON metadata: ~3 MB

## Core Components

### 1. MemvidEncoder

Handles text processing and video creation.

```python
from memvid import MemvidEncoder

encoder = MemvidEncoder(config={
    "qr": {
        "version": 10,          # QR code version (1-40)
        "error_correction": "H", # Error correction level (L/M/Q/H)
        "box_size": 10,         # Pixel size of QR boxes
        "border": 4             # Border size
    },
    "video": {
        "fps": 30,              # Frames per second
        "codec": "libx264",     # Video codec
        "crf": 23,              # Quality (lower = better)
        "preset": "medium"      # Encoding speed
    }
})

# Add data
encoder.add_chunks(["chunk1", "chunk2"])
encoder.add_text("long text", chunk_size=200, overlap=50)

# Get statistics
stats = encoder.get_stats()
print(f"Total chunks: {stats['total_chunks']}")
print(f"Total size: {stats['total_characters']} chars")

# Build video
build_stats = encoder.build_video(
    "output.mp4", 
    "output_index.json",
    show_progress=True
)
```

### 2. MemvidRetriever

Handles search and text extraction from videos.

```python
from memvid import MemvidRetriever

retriever = MemvidRetriever(
    "video.mp4", 
    "index.json",
    config={
        "retrieval": {
            "cache_size": 1000,      # Frame cache size
            "batch_size": 50,        # Parallel decode batch
            "max_workers": 4         # Thread pool size
        }
    }
)

# Basic search
chunks = retriever.search("quantum computing", top_k=5)

# Search with metadata
results = retriever.search_with_metadata("AI", top_k=3)
for result in results:
    print(f"Score: {result['score']:.3f}")
    print(f"Text: {result['text']}")
    print(f"Frame: {result['frame']}")

# Get specific chunk
chunk = retriever.get_chunk_by_id(42)

# Stats
stats = retriever.get_stats()
print(f"Cache hit rate: {stats['cache_hit_rate']:.2%}")
```

### 3. MemvidChat

Conversational interface with memory.

```python
from memvid import MemvidChat
import os

# Set API key
os.environ['OPENAI_API_KEY'] = 'your-key-here'

chat = MemvidChat(
    "video.mp4",
    "index.json",
    llm_model="gpt-3.5-turbo",  # or gpt-4, claude-3, etc.
    config={
        "chat": {
            "context_chunks": 5,      # Chunks per query
            "max_history": 10        # Conversation history
        },
        "llm": {
            "temperature": 0.7,
            "max_tokens": 500
        }
    }
)

# Start session
chat.start_session()

# Chat
response = chat.chat("What's in this knowledge base?")

# Direct search
results = chat.search_context("specific topic", top_k=10)

# Export conversation
chat.export_session("session.json")

# Get statistics
stats = chat.get_stats()
```

## Advanced Usage

### Custom Chunking Strategies

```python
from memvid import MemvidEncoder
import re

def custom_chunker(text, max_size=200):
    """Chunk by sentences, respecting max size"""
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current = ""
    
    for sentence in sentences:
        if len(current) + len(sentence) > max_size and current:
            chunks.append(current.strip())
            current = sentence
        else:
            current += " " + sentence
    
    if current:
        chunks.append(current.strip())
    
    return chunks

encoder = MemvidEncoder()
chunks = custom_chunker(long_text)
encoder.add_chunks(chunks)
```

### Metadata Enrichment

```python
encoder = MemvidEncoder()

# Add chunks with metadata
chunks_with_meta = [
    {
        "text": "Quantum computing breakthrough...",
        "metadata": {
            "source": "arxiv:2024.1234",
            "date": "2024-01-15",
            "category": "quantum",
            "author": "Smith et al."
        }
    }
]

for item in chunks_with_meta:
    encoder.add_chunk(item["text"], metadata=item["metadata"])
```

### Custom Embedding Models

```python
from sentence_transformers import SentenceTransformer

# Use a different embedding model
encoder = MemvidEncoder(config={
    "embedding": {
        "model": "all-mpnet-base-v2",  # Higher quality
        "dimension": 768,
        "batch_size": 32
    }
})
```

### Batch Processing Large Datasets

```python
import os
from pathlib import Path

def process_directory(dir_path, output_prefix):
    """Process all text files in directory"""
    encoder = MemvidEncoder()
    
    for file_path in Path(dir_path).glob("*.txt"):
        with open(file_path, 'r') as f:
            text = f.read()
            encoder.add_text(
                text, 
                chunk_size=300,
                overlap=50,
                metadata={"source": file_path.name}
            )
    
    # Build video
    encoder.build_video(
        f"{output_prefix}.mp4",
        f"{output_prefix}_index.json"
    )

# Process all documents
process_directory("documents/", "output/knowledge_base")
```

### Multi-Video Federation

```python
class MemvidFederation:
    """Search across multiple video memories"""
    
    def __init__(self):
        self.retrievers = {}
    
    def add_memory(self, name, video_file, index_file):
        self.retrievers[name] = MemvidRetriever(video_file, index_file)
    
    def search_all(self, query, top_k=5):
        all_results = []
        
        for name, retriever in self.retrievers.items():
            results = retriever.search_with_metadata(query, top_k)
            for r in results:
                r['source'] = name
                all_results.append(r)
        
        # Sort by score
        all_results.sort(key=lambda x: x['score'], reverse=True)
        return all_results[:top_k]

# Use federation
fed = MemvidFederation()
fed.add_memory("tech", "tech_memory.mp4", "tech_index.json")
fed.add_memory("science", "science_memory.mp4", "science_index.json")
results = fed.search_all("quantum mechanics")
```

## Performance Optimization

### 1. Encoding Performance

```python
# Parallel encoding for large datasets
encoder = MemvidEncoder(config={
    "encoding": {
        "max_workers": 8,        # Parallel QR generation
        "batch_size": 100        # Process in batches
    },
    "video": {
        "preset": "ultrafast",   # Faster encoding
        "crf": 28               # Lower quality = faster
    }
})
```

### 2. Retrieval Performance

```python
# Optimize for speed
retriever = MemvidRetriever(video_file, index_file, config={
    "retrieval": {
        "cache_size": 5000,      # Larger cache
        "batch_size": 100,       # Bigger batches
        "max_workers": 8,        # More threads
        "preload_frames": True   # Preload common frames
    }
})

# Warm up cache with common queries
common_queries = ["AI", "machine learning", "data"]
for query in common_queries:
    retriever.search(query, top_k=10)
```

### 3. Index Optimization

```python
# Use approximate search for large datasets
encoder = MemvidEncoder(config={
    "index": {
        "type": "IVF",          # Inverted file index
        "nlist": 100,           # Number of clusters
        "nprobe": 10           # Clusters to search
    }
})

# Or use HNSW for better quality
encoder = MemvidEncoder(config={
    "index": {
        "type": "HNSW",         # Hierarchical NSW
        "M": 32,                # Number of connections
        "ef_construction": 200  # Construction parameter
    }
})
```

### 4. Memory Management

```python
# For very large videos
retriever = MemvidRetriever(video_file, index_file, config={
    "retrieval": {
        "mmap_video": True,      # Memory-map video file
        "chunk_buffer": 1000,    # Buffer size
        "gc_interval": 100       # Garbage collection
    }
})
```

## Troubleshooting

### Common Issues

#### 1. "huggingface/tokenizers" Warning
```bash
# Set before running
export TOKENIZERS_PARALLELISM=false

# Or in Python
import os
os.environ['TOKENIZERS_PARALLELISM'] = 'false'
```

#### 2. QR Decode Failures
```python
# Increase QR code quality
encoder = MemvidEncoder(config={
    "qr": {
        "error_correction": "H",  # Highest correction
        "version": 15,           # Larger QR codes
        "box_size": 15          # Bigger pixels
    }
})
```

#### 3. Video Codec Issues
```python
# Try different codecs
encoder = MemvidEncoder(config={
    "video": {
        "codec": "libx265",     # Or "h264_nvenc" for NVIDIA
        "pixel_format": "yuv420p"
    }
})
```

#### 4. Memory Issues with Large Videos
```python
# Enable streaming mode
retriever = MemvidRetriever(video_file, index_file, config={
    "retrieval": {
        "streaming_mode": True,
        "buffer_size": 100      # Frames in memory
    }
})
```

#### 5. Slow Search Performance
```python
# Debug performance
stats = retriever.get_stats()
print(f"Average decode time: {stats['avg_decode_time']}ms")
print(f"Cache hit rate: {stats['cache_hit_rate']:.2%}")

# Enable profiling
retriever.enable_profiling()
results = retriever.search("test query")
print(retriever.get_profile_stats())
```

### Debugging Tips

```python
# Enable detailed logging
import logging
logging.basicConfig(level=logging.DEBUG)

# Check video integrity
from memvid.utils import verify_video
is_valid, stats = verify_video("output.mp4")
print(f"Valid: {is_valid}")
print(f"Readable frames: {stats['readable_frames']}/{stats['total_frames']}")

# Test QR encoding/decoding
from memvid.utils import create_qr_code, decode_qr
qr_img = create_qr_code("test data")
decoded = decode_qr(qr_img)
assert decoded == "test data"
```

## Best Practices

1. **Chunk Size**: 100-500 characters works best
2. **Overlap**: 20-30% overlap prevents context loss
3. **Video FPS**: 30 FPS is optimal (higher = larger files)
4. **Cache Size**: Set to 10% of total frames
5. **Batch Size**: 50-100 for parallel processing
6. **Error Correction**: Use "H" for archival, "L" for speed

## Example Projects

### 1. Personal Knowledge Base
```python
# Build from markdown files
from pathlib import Path

encoder = MemvidEncoder()
for md_file in Path("notes/").glob("**/*.md"):
    with open(md_file) as f:
        encoder.add_text(f.read(), metadata={"file": str(md_file)})

encoder.build_video("personal_kb.mp4", "personal_kb_index.json")
```

### 2. Documentation Search
```python
# Create searchable docs
encoder = MemvidEncoder()
encoder.add_text(api_docs, metadata={"type": "api"})
encoder.add_text(tutorials, metadata={"type": "tutorial"})
encoder.build_video("docs.mp4", "docs_index.json")

# Search with filtering
retriever = MemvidRetriever("docs.mp4", "docs_index.json")
api_results = [r for r in retriever.search_with_metadata("authentication") 
               if r.get("metadata", {}).get("type") == "api"]
```

### 3. Research Paper Archive
```python
# Archive papers with citations
papers = load_papers()  # Your paper loader
encoder = MemvidEncoder()

for paper in papers:
    encoder.add_text(
        paper["abstract"],
        metadata={
            "title": paper["title"],
            "authors": paper["authors"],
            "year": paper["year"],
            "doi": paper["doi"]
        }
    )

encoder.build_video("papers.mp4", "papers_index.json")
```

## Contributing

Contributions welcome! See CONTRIBUTING.md for guidelines.

## License

MIT License - see LICENSE file for details.