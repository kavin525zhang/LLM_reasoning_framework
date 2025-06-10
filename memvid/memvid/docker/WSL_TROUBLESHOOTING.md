# WSL + Docker Desktop Troubleshooting Guide

## Quick Setup Check

```bash
# Run this to check your setup
make setup-wsl
make wsl-info
```

## Common Issues & Solutions

### 1. "Docker not found" in WSL

**Problem**: `docker: command not found` or `make build` fails

**Solutions**:
1. **Enable WSL Integration in Docker Desktop**:
    - Open Docker Desktop on Windows
    - Go to Settings → Resources → WSL Integration
    - Enable "Enable integration with my default WSL distro"
    - Enable integration with your specific distro (Ubuntu, etc.)
    - Click "Apply & Restart"

2. **Restart WSL** (in Windows Command Prompt):
   ```cmd
   wsl --shutdown
   wsl
   ```

3. **Check Docker Desktop is running**:
    - Look for Docker whale icon in Windows system tray
    - Should show "Docker Desktop is running"

### 2. Performance Issues

**Problem**: Encoding is very slow in WSL

**Solutions**:

1. **Use WSL 2** (much faster than WSL 1):
   ```cmd
   # In Windows Command Prompt
   wsl --set-default-version 2
   wsl --set-version Ubuntu 2  # or your distro name
   ```

2. **Store files in WSL filesystem**:
   ```bash
   # Good: /home/user/projects/memvid
   # Bad:  /mnt/c/Users/user/projects/memvid
   
   # Move your project if needed:
   cp -r /mnt/c/path/to/memvid ~/memvid
   cd ~/memvid
   ```

3. **Configure WSL memory** (create `C:\Users\YourName\.wslconfig`):
   ```ini
   [wsl2]
   memory=8GB
   processors=4
   swap=2GB
   ```

### 3. Volume Mount Issues

**Problem**: Container can't see files in `data/` directory

**Solutions**:

1. **Check file permissions**:
   ```bash
   ls -la data/
   chmod 755 data/
   chmod 644 data/input/*
   ```

2. **Use absolute paths**:
   ```bash
   # The Makefile handles this, but if running docker directly:
   docker run -v "$(pwd)/data:/compute" memvid-h265 encode input.json output.mp4
   ```

3. **Verify mount is working**:
   ```bash
   docker run --rm -v "$(pwd)/data:/compute" memvid-h265 ls -la /compute
   ```

### 4. Memory Issues

**Problem**: "Out of memory" or very slow encoding

**Solutions**:

1. **Check available memory**:
   ```bash
   free -h
   make wsl-info
   ```

2. **Use smaller batch sizes** for large datasets:
   ```bash
   # Edit the encoding script or split your data
   split -l 1000 large_chunks.json chunk_
   ```

3. **Increase WSL memory allocation** (see #2 above)

### 5. Path Issues

**Problem**: Windows/Linux path confusion

**Solutions**:

1. **Always use forward slashes** in WSL:
   ```bash
   # Good
   /home/user/memvid/data/input/file.json
   
   # Bad  
   C:\Users\user\memvid\data\input\file.json
   ```

2. **Use WSL paths for Docker volumes**:
   ```bash
   # Good: Let the Makefile handle paths
   make encode INPUT=file.json OUTPUT=video.mp4
   
   # Or use $(pwd) which resolves correctly
   docker run -v "$(pwd)/data:/compute" memvid-h265 encode file.json video.mp4
   ```

## Performance Optimization

### For Large Datasets

1. **Use the optimized command**:
   ```bash
   make encode-large INPUT=big_file.json OUTPUT=big_video.mp4
   ```

2. **Monitor resources**:
   ```bash
   # In another terminal
   htop
   # or
   docker stats
   ```

3. **Use SSD storage** if possible for temp files

### WSL 2 vs WSL 1

| Feature | WSL 1 | WSL 2 |
|---------|-------|-------|
| Docker performance | Slow | Fast |
| File system | Windows FS | Linux FS |
| Memory usage | Shared | Allocated |
| **Recommendation** | Upgrade to WSL 2 | ✅ Use this |

## Testing Your Setup

Run this complete test:

```bash
# 1. Check environment
make setup-wsl

# 2. Check performance info
make wsl-info

# 3. Run the getting started example
./examples/getting_started.sh

# 4. Test with larger dataset
echo '["test chunk '$i'" for i in {1..100}]' | jq -c . > data/input/test_100.json
make encode INPUT=test_100.json OUTPUT=test_100.mp4
```

## Getting Help

If you're still having issues:

1. **Check Docker Desktop logs**:
    - Open Docker Desktop → Troubleshoot → View logs

2. **Check WSL logs**:
   ```bash
   dmesg | tail -20
   ```

3. **Verify versions**:
   ```bash
   wsl --version
   docker --version
   make setup-wsl
   ```

4. **Test basic Docker functionality**:
   ```bash
   docker run --rm hello-world
   docker run --rm -v "$(pwd):/test" ubuntu:22.04 ls -la /test
   ```

## Pro Tips

1. **Use Windows Terminal** for better WSL experience
2. **Install Docker Desktop with WSL 2 backend**
3. **Keep projects in WSL filesystem** (`/home/user/...`)
4. **Use VSCode with WSL extension** for seamless development
5. **Monitor Windows Task Manager** to see Docker Desktop resource usage