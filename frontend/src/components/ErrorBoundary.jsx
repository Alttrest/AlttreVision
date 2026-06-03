import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#ffdddd', color: '#ff0000', minHeight: '100vh', boxSizing: 'border-box' }}>
          <h2>Üzgünüz, bir hata oluştu. (Beyaz Ekran Sebebi)</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Hata Detaylarını Göster</summary>
            <br />
            <strong>Hata Mesajı:</strong> {this.state.error && this.state.error.toString()}
            <br /><br />
            <strong>Nerede Oluştu:</strong> {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
