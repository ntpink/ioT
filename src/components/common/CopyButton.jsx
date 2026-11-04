import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const CopyButton = ({ text, tooltip = 'Sao chép thời gian' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (!text) return;
    
    // Hỗ trợ Clipboard API hoặc Fallback
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Không thể copy:', err);
      }
      textArea.remove();
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? 'Đã sao chép!' : tooltip}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3px 5px',
        marginLeft: '6px',
        backgroundColor: copied ? '#ecfdf5' : '#f1f5f9',
        border: `1px solid ${copied ? '#a7f3d0' : '#cbd5e1'}`,
        borderRadius: '5px',
        color: copied ? '#10b981' : '#64748b',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        verticalAlign: 'middle',
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.backgroundColor = '#e2e8f0';
          e.currentTarget.style.color = '#3b82f6';
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.backgroundColor = '#f1f5f9';
          e.currentTarget.style.color = '#64748b';
        }
      }}
    >
      {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
    </button>
  );
};

export default CopyButton;
