type CacheItem = {
  data: any;
  expiry: number;
};

const cache: Record<string, CacheItem> = {};

// ✅ حفظ في الكاش
export function setCache(key: string, data: any, ttlSeconds: number) {
  cache[key] = {
    data,
    expiry: Date.now() + ttlSeconds * 1000,
  };
}

// ✅ جلب من الكاش
export function getCache(key: string) {
  const item = cache[key];
  if (!item) return null;

  // إذا انتهت صلاحية البيانات نحذفها
  if (Date.now() > item.expiry) {
    delete cache[key];
    return null;
  }

  return item.data;
}

// ✅ حذف من الكاش
export function delCache(key: string) {
  if (cache[key]) {
    delete cache[key];
  }
}