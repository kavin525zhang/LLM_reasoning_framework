#!/bin/bash
# Compatible with WSL, Docker Desktop, MacOS and native Linux

set -e

echo "🚀 Memvid H.265 - Getting Started (WSL Compatible)"
echo "=================================================="

# Check environment
if grep -q Microsoft /proc/version 2>/dev/null; then
    echo "🐧 Detected: WSL Environment"
    WSL_MODE=true

    # Check Docker availability
    if command -v docker.exe >/dev/null 2>&1; then
        DOCKER_CMD="docker.exe"
        echo "🐳 Using: Docker Desktop (docker.exe)"
    elif command -v docker >/dev/null 2>&1; then
        DOCKER_CMD="docker"
        echo "🐳 Using: Docker via WSL integration"
    else
        echo "❌ Docker not found!"
        echo "   Please enable WSL integration in Docker Desktop settings"
        exit 1
    fi
else
    echo "🐧 Detected: Native Linux"
    WSL_MODE=false
    DOCKER_CMD="docker"
fi

# Make sure we're in the right directory
if [ ! -f "Makefile" ]; then
    echo "❌ Please run this from your memvid root directory"
    echo "   Current directory: $(pwd)"
    exit 1
fi

# Show current path info (helpful for WSL debugging)
echo "📍 Working directory: $(pwd)"
if [ "$WSL_MODE" = true ]; then
    if [[ "$(pwd)" == /mnt/* ]]; then
        echo "⚠️  You're in Windows filesystem (/mnt/c/...)"
        echo "   For better performance, consider moving to WSL filesystem (/home/user/...)"
    else
        echo "✅ You're in WSL filesystem (optimal for performance)"
    fi
fi

# Create a sample dataset
echo ""
echo "📝 Creating sample dataset..."
mkdir -p data/input data/output

cat > data/input/sample_chunks.json << 'EOF'
[
  "This is the first chunk of text that will be encoded into a QR code.",
  "Here's another chunk with some technical content about machine learning.",
  "A third chunk discussing the benefits of video-based storage systems.",
  "Fourth chunk: How H.265 compression can dramatically reduce file sizes.",
  "Final chunk with some special characters: áéíóú ñ €£¥ 中文 العربية"
]
EOF

echo "✅ Created sample dataset with 5 chunks"

# Run WSL setup check
echo ""
echo "🔍 Checking WSL + Docker setup..."
make setup-wsl

# Build the container
echo ""
echo "🏗️  Building Docker container (this may take a few minutes)..."
echo "   Note: First build downloads base images and may be slow"
make build

# Test the container
echo ""
echo "🧪 Testing the container..."
make test

# Encode the sample
echo ""
echo "🎬 Encoding sample chunks to H.265 video..."
make encode INPUT=sample_chunks.json OUTPUT=sample_video.mp4

# Check the results
echo ""
echo "📊 Results:"
if [ -f "data/output/sample_video.mp4" ]; then
    # Use stat command compatible with both Linux and WSL
    if command -v stat >/dev/null 2>&1; then
        FILE_SIZE=$(stat -c%s "data/output/sample_video.mp4" 2>/dev/null || stat -f%z "data/output/sample_video.mp4" 2>/dev/null || echo "unknown")
        if [ "$FILE_SIZE" != "unknown" ]; then
            FILE_SIZE_KB=$((FILE_SIZE / 1024))
            echo "   ✅ Video created: data/output/sample_video.mp4 (${FILE_SIZE_KB} KB)"
        else
            echo "   ✅ Video created: data/output/sample_video.mp4"
        fi
    else
        echo "   ✅ Video created: data/output/sample_video.mp4"
    fi
else
    echo "   ❌ Video not found in data/output/"
    echo "   Debug: Contents of data/output/:"
    ls -la data/output/ || echo "   Directory doesn't exist"
    exit 1
fi

if [ -f "data/output/sample_video.json" ]; then
    echo "   ✅ Index created: data/output/sample_video.json"
else
    echo "   ❌ Index not found"
fi

echo ""
echo "🎉 Success! Your H.265 encoding is working in WSL."
echo ""
echo "WSL Performance Notes:"
if [ "$WSL_MODE" = true ]; then
    echo "   📈 Performance tips for WSL:"
    echo "   • Use WSL 2 for better Docker performance"
    echo "   • Store large datasets in WSL filesystem (/home/user/...)"
    echo "   • For large encoding jobs, run: make encode-large INPUT=... OUTPUT=..."
    echo "   • Monitor WSL memory usage: make wsl-info"
fi

echo ""
echo "Next steps:"
echo "1. Put your own chunks.json in data/input/"
echo "2. Run: make encode INPUT=your_file.json OUTPUT=your_video.mp4"
echo "3. Find your compressed video in data/output/"
echo ""
echo "For large datasets (recommended):"
echo "   make encode-large INPUT=big_file.json OUTPUT=big_video.mp4"
echo ""
echo "WSL + Docker Desktop setup complete! 🎯"