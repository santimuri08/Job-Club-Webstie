// Web Vitals Performance Monitoring with Rate Limiting
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

// Rate limiting: prevent sending more than 10 metrics per minute
const rateLimiter = {
  queue: [],
  maxPerMinute: 10,

  canSend() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Remove old entries
    this.queue = this.queue.filter((timestamp) => timestamp > oneMinuteAgo);

    // Check if we can send
    if (this.queue.length < this.maxPerMinute) {
      this.queue.push(now);
      return true;
    }

    return false;
  },
};

function sendToAnalytics(metric) {
  // Log to console in development (debug mode only)
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    // Development mode - skip analytics
    return;
  }

  // Rate limiting check
  if (!rateLimiter.canSend()) {
    console.warn("[Web Vitals] Rate limit exceeded, skipping metric:", metric.name);
    return;
  }

  // Send to analytics endpoint (implement your own)
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    url: window.location.href,
    timestamp: Date.now(),
  });

  // Example: Send to Google Analytics 4
  if (window.gtag) {
    window.gtag("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }

  // Example: Send to custom analytics endpoint with error handling
  if (navigator.sendBeacon) {
    try {
      navigator.sendBeacon("/api/analytics", body);
    } catch (error) {
      console.error("[Web Vitals] Failed to send metric:", error);
    }
  }
}

// Register all Web Vitals
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);
