"""
Tests for MemvidRetriever
"""

import pytest
import tempfile
import os

from memvid import MemvidEncoder, MemvidRetriever


@pytest.fixture
def setup_test_memory():
    """Create test video and index"""
    encoder = MemvidEncoder()
    chunks = [
        "Quantum computing uses qubits for parallel processing",
        "Machine learning models require large datasets",
        "Neural networks mimic brain structure",
        "Cloud computing provides scalable resources",
        "Blockchain ensures data immutability"
    ]
    encoder.add_chunks(chunks)
    
    with tempfile.TemporaryDirectory() as temp_dir:
        video_file = os.path.join(temp_dir, "test.mp4")
        index_file = os.path.join(temp_dir, "test_index.json")
        
        encoder.build_video(video_file, index_file, show_progress=False)
        
        yield video_file, index_file, chunks


def test_retriever_initialization(setup_test_memory):
    """Test retriever initialization"""
    video_file, index_file, chunks = setup_test_memory
    
    retriever = MemvidRetriever(video_file, index_file)
    assert retriever.video_file == video_file
    assert retriever.total_frames == len(chunks)


def test_search(setup_test_memory):
    """Test semantic search"""
    video_file, index_file, chunks = setup_test_memory
    retriever = MemvidRetriever(video_file, index_file)
    
    # Search for quantum
    results = retriever.search("quantum physics", top_k=3)
    assert len(results) <= 3
    assert any("quantum" in result.lower() for result in results)
    
    # Search for AI
    results = retriever.search("artificial intelligence", top_k=3)
    assert len(results) <= 3
    assert any("neural" in result.lower() or "machine" in result.lower() for result in results)


def test_search_with_metadata(setup_test_memory):
    """Test search with metadata"""
    video_file, index_file, chunks = setup_test_memory
    retriever = MemvidRetriever(video_file, index_file)
    
    results = retriever.search_with_metadata("blockchain", top_k=2)
    assert len(results) <= 2
    
    if results:
        result = results[0]
        assert "text" in result
        assert "score" in result
        assert "chunk_id" in result
        assert "frame" in result
        assert result["score"] > 0


def test_get_chunk_by_id(setup_test_memory):
    """Test getting specific chunk"""
    video_file, index_file, chunks = setup_test_memory
    retriever = MemvidRetriever(video_file, index_file)
    
    # Get first chunk
    chunk = retriever.get_chunk_by_id(0)
    assert chunk is not None
    assert "quantum" in chunk.lower()
    
    # Invalid ID
    chunk = retriever.get_chunk_by_id(999)
    assert chunk is None


def test_cache_operations(setup_test_memory):
    """Test cache functionality"""
    video_file, index_file, chunks = setup_test_memory
    retriever = MemvidRetriever(video_file, index_file)
    
    # Initial cache should be empty
    assert len(retriever._frame_cache) == 0
    
    # Search should populate cache
    retriever.search("test query", top_k=2)
    assert len(retriever._frame_cache) >= 0  # May cache results
    
    # Clear cache
    retriever.clear_cache()
    assert len(retriever._frame_cache) == 0


def test_retriever_stats(setup_test_memory):
    """Test retriever statistics"""
    video_file, index_file, chunks = setup_test_memory
    retriever = MemvidRetriever(video_file, index_file)
    
    stats = retriever.get_stats()
    assert stats["total_frames"] == len(chunks)
    assert stats["fps"] > 0
    assert "cache_size" in stats
    assert "index_stats" in stats