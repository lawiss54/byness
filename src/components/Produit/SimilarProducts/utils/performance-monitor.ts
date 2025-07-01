
/**
 * Performance monitoring utilities
 * Helps track and optimize component performance in production
 */

/**
 * Performance metrics interface
 */
interface PerformanceMetrics {
  renderTime: number;
  imageLoadTime: number;
  interactionTime: number;
  memoryUsage?: number;
}

/**
 * Performance monitoring class
 * Tracks various performance metrics for optimization
 */
export class SimilarProductsPerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private startTime: number = 0;

  /**
   * Start performance measurement
   */
  startMeasurement(): void {
    this.startTime = performance.now();
  }

  /**
   * Record render time
   */
  recordRenderTime(): void {
    if (this.startTime) {
      this.metrics.renderTime = performance.now() - this.startTime;
    }
  }

  /**
   * Record image load time
   */
  recordImageLoadTime(): void {
    if (this.startTime) {
      this.metrics.imageLoadTime = performance.now() - this.startTime;
    }
  }

  /**
   * Record interaction time
   */
  recordInteractionTime(): void {
    this.metrics.interactionTime = performance.now();
  }

  /**
   * Get performance metrics
   */
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  /**
   * Send metrics to analytics service
   */
  sendMetrics(): void {
    // In a real application, you would send these metrics to your analytics service
    console.log('SimilarProducts Performance Metrics:', this.metrics);
    
    // Example: Analytics service integration
    // analyticsService.track('similar_products_performance', this.metrics);
  }
}