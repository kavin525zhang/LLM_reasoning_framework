# Contributing to Memvid

Thank you for your interest in contributing to Memvid! We welcome contributions from everyone.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/memvid.git
   cd memvid
   ```
3. **Create a virtual environment**:
   ```bash
   python -m venv .memvid
   source .memvid/bin/activate  # On Windows: .memvid\Scripts\activate
   ```
4. **Install development dependencies**:
   ```bash
   pip install -e ".[dev]"
   pip install PyPDF2  # For PDF support
   ```

## 🔧 Development Workflow

1. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and ensure:
   - Code follows existing style patterns
   - New features have tests
   - All tests pass: `pytest tests/`
   - Code is properly formatted

3. **Run tests**:
   ```bash
   pytest tests/
   pytest --cov=memvid tests/  # With coverage
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## 📝 Code Style

- Follow PEP 8 guidelines
- Use meaningful variable and function names
- Add docstrings to all functions and classes
- Keep functions focused and small
- No commented-out code

## 🧪 Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for high test coverage
- Test edge cases

## 📚 Documentation

- Update README.md if adding new features
- Add docstrings following Google style
- Include usage examples for new functionality
- Update CLAUDE.md if changing core architecture

## 🐛 Reporting Issues

When reporting issues, please include:
- Python version
- Operating system
- Complete error messages
- Steps to reproduce
- Expected vs actual behavior

## 💡 Feature Requests

We love new ideas! When proposing features:
- Explain the use case
- Describe the expected behavior
- Consider backward compatibility
- Discuss implementation approach

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Celebrate diversity of ideas and approaches

## 📞 Getting Help

- Open an issue for bugs or features
- Join discussions in existing issues
- Tag @olow304 for urgent matters

## ✅ Checklist Before Submitting PR

- [ ] Tests pass locally
- [ ] Code follows project style
- [ ] Commit messages are clear
- [ ] Documentation is updated
- [ ] PR description explains changes
- [ ] Related issue is linked (if any)

## 🎉 Recognition

Contributors will be:
- Added to the project's contributor list
- Mentioned in release notes
- Part of the amazing Memvid community!

---

**Thank you for making Memvid better!** 🙏