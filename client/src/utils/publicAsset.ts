
/**
 * GitHub Pages 하위 경로를 자동으로 적용하는 이미지 경로 함수
 */
export function publicAsset(path: string): string {
  const cleanPath = path.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
