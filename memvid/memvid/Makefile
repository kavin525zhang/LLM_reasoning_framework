# Memvid H.265 Docker Helper - Cross-Platform Compatible
.PHONY: help build test clean setup

# Auto-detect Docker command (WSL/Windows compatibility)
DOCKER_CMD := $(shell if command -v docker.exe >/dev/null 2>&1; then echo "docker.exe"; else echo "docker"; fi)

# Get absolute path and convert for Docker mounting if needed
PWD := $(shell pwd)
# Convert /mnt/c paths to C: for Docker Desktop on WSL
DOCKER_PWD := $(shell pwd | sed 's|^/mnt/c|C:|' | sed 's|^/mnt/\([a-z]\)|\U\1:|')

# Default target
help:
	@echo "🎥 Memvid H.265 Docker Helper (Cross-Platform)"
	@echo ""
	@echo "Setup & Testing:"
	@echo "  make setup        - Check setup and create directories"
	@echo "  make build        - Build the Docker container"
	@echo "  make test         - Test container functionality"
	@echo "  make test-ffmpeg  - Test FFmpeg in container"
	@echo "  make test-workflow - Full end-to-end test"
	@echo "  make clean        - Clean up Docker containers"
	@echo ""
	@echo "Info:"
	@echo "  make info         - Show platform information"
	@echo ""
	@echo "Note: Use Python API for actual encoding"
	@echo "Platform Info:"
	@echo "  Docker: $(DOCKER_CMD)"
	@echo "  Local Path: $(PWD)"
	@echo "  Docker Path: $(DOCKER_PWD)"

# Cross-platform setup check
setup:
	@echo "🔍 Checking cross-platform setup..."
	@if command -v $(DOCKER_CMD) >/dev/null 2>&1; then \
		echo "✅ Docker available: $(DOCKER_CMD)"; \
	else \
		echo "❌ Docker not found. Install Docker Desktop"; \
		exit 1; \
	fi
	@if grep -q Microsoft /proc/version 2>/dev/null; then \
		echo "🐧 Platform: WSL"; \
	elif [[ "$$(uname)" == "Darwin" ]]; then \
		echo "🍎 Platform: macOS"; \
	else \
		echo "🐧 Platform: Linux"; \
	fi
	@echo "📁 Creating directories..."
	@mkdir -p data/input data/output data/temp
	@echo "✅ Setup complete!"

# Build the Docker container
build: setup
	@echo "🏗️  Building memvid-h265 container..."
	$(DOCKER_CMD) build -f docker/Dockerfile -t memvid-h265 docker/
	@echo "✅ Build complete!"

# Test the container
test: build
	@echo "🧪 Testing container..."
	$(DOCKER_CMD) run --rm \
		-v "$(DOCKER_PWD)/data:/data" \
		-v "$(DOCKER_PWD)/docker/scripts:/scripts" \
		memvid-h265 python3 --version
	@echo "✅ Container test passed!"

# Test FFmpeg functionality
test-ffmpeg: build
	@echo "🎬 Testing FFmpeg in container..."
	$(DOCKER_CMD) run --rm \
		-v "$(DOCKER_PWD)/data:/data" \
		-v "$(DOCKER_PWD)/docker/scripts:/scripts" \
		memvid-h265 ffmpeg -version
	@echo "✅ FFmpeg test passed!"

# Create sample data for testing
sample-data:
	@echo "📝 Creating sample dataset..."
	@mkdir -p data/input
	@echo '["Hello world from QR code!", "This is chunk 2 with more content.", "Final test chunk with special chars: áéíóú"]' > data/input/sample.json
	@echo "✅ Created data/input/sample.json"

# Full workflow test (minimal - just verify container works)
test-workflow: build sample-data
	@echo "🧪 Testing container workflow..."
	@echo "   Testing Python imports..."
	$(DOCKER_CMD) run --rm \
		-v "$(DOCKER_PWD)/data:/data" \
		-v "$(DOCKER_PWD)/docker/scripts:/scripts" \
		memvid-h265 python3 -c "import json; print('Python OK')"
	@echo "   Testing FFmpeg availability..."
	$(DOCKER_CMD) run --rm \
		-v "$(DOCKER_PWD)/data:/data" \
		-v "$(DOCKER_PWD)/docker/scripts:/scripts" \
		memvid-h265 ffmpeg -f lavfi -i testsrc=duration=1:size=320x240:rate=1 -t 1 /tmp/test.mp4
	@echo "✅ Container workflow test passed!"
	@echo ""
	@echo "🐍 Use Python API for encoding:"
	@echo "   from memvid import MemvidEncoder"
	@echo "   encoder = MemvidEncoder()"
	@echo "   encoder.add_text('Your text here')"
	@echo "   encoder.build_video('output.mkv', 'index.json', codec='h265')"

# Clean up Docker images and containers
clean:
	@echo "🧹 Cleaning up..."
	-$(DOCKER_CMD) rmi memvid-h265
	-$(DOCKER_CMD) system prune -f
	@echo "✅ Cleanup complete!"

# Show platform-specific info
info:
	@echo "🖥️  Platform Info:"
	@echo "   OS: $$(uname -a)"
	@if command -v nproc >/dev/null 2>&1; then \
		echo "   Cores: $$(nproc)"; \
	elif command -v sysctl >/dev/null 2>&1; then \
		echo "   Cores: $$(sysctl -n hw.ncpu)"; \
	fi
	@if command -v free >/dev/null 2>&1; then \
		echo "   Memory: $$(free -m | awk 'NR==2{printf "%.1f", $$2/1024}')GB"; \
	fi
	@echo "   Docker: $(DOCKER_CMD)"
	@echo "   Working Dir: $(PWD)"
	@echo "   Docker Mount: $(DOCKER_PWD)"
	@echo ""
	@if grep -q Microsoft /proc/version 2>/dev/null; then \
		echo "💡 WSL Tips:"; \
		echo "   • Use WSL 2 for better performance"; \
		echo "   • Store files in WSL filesystem for speed"; \
	elif [[ "$$(uname)" == "Darwin" ]]; then \
		echo "💡 macOS Tips:"; \
		echo "   • Ensure Docker Desktop has sufficient resources"; \
		echo "   • Enable file sharing for project directory"; \
	else \
		echo "💡 Linux Tips:"; \
		echo "   • Ensure user is in docker group"; \
		echo "   • Consider increasing Docker resources if needed"; \
	fi